import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ui/project-card';
import useProjects from '@/hooks/use-projects';

/**
 * ProjectsSection 컴포넌트
 *
 * 홈 페이지의 프로젝트 섹션 (최대 4개 표시)
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects(4);

  return (
    <section className="py-12 md:py-16">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Projects</h2>
        <p className="text-muted-foreground">제가 작업한 프로젝트들입니다</p>
      </div>

      {loading && (
        <div className="flex min-h-[200px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-destructive">프로젝트를 불러오는데 실패했습니다.</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.tech_stack}
                detailUrl={project.detail_url}
                thumbnailUrl={project.thumbnail_url}
              />
            ))}
          </div>

          {projects.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => navigate('/projects')}>
                더 보기
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default ProjectsSection;
