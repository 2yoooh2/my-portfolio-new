import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

/**
 * ProjectsSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16">
      <Card className="border-dashed">
        <CardContent className="flex min-h-[200px] md:min-h-[300px] flex-col items-center justify-center p-6">
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Projects Section</h2>
            <p className="text-base md:text-lg mb-6">
              여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
            </p>
            <Button variant="outline" onClick={() => navigate('/projects')}>
              더 보기
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default ProjectsSection;
