import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

/**
 * AboutSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <AboutSection />
 */
function AboutSection() {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16">
      <Card className="border-dashed">
        <CardContent className="flex min-h-[200px] md:min-h-[250px] flex-col items-center justify-center p-6">
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me Section</h2>
            <p className="text-base md:text-lg mb-6">
              여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            </p>
            <Button variant="outline" onClick={() => navigate('/about')}>
              더 알아보기
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default AboutSection;
