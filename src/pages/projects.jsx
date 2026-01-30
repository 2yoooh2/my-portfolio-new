import { Loader2 } from 'lucide-react';

import ProjectCard from '@/components/ui/project-card';
import useProjects from '@/hooks/use-projects';

/**
 * Projects 페이지 컴포넌트
 *
 * 전체 프로젝트 목록을 표시하는 페이지
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <Projects />
 */
function Projects() {
  const { projects, loading, error } = useProjects();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Projects</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          제가 작업한 프로젝트들을 소개합니다
        </p>
      </div>

      {loading && (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-destructive">프로젝트를 불러오는데 실패했습니다.</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {projects.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-muted-foreground">등록된 프로젝트가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          )}
        </>
      )}
    </div>
  );
}

export default Projects;
