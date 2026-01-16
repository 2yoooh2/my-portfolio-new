import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Projects 페이지 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <Projects />
 */
function Projects() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-center">Projects</CardTitle>
        </CardHeader>
        <CardContent className="flex min-h-[400px] md:min-h-[500px] items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-base md:text-lg">
              Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Projects;
