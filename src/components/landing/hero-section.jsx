import { Card, CardContent } from '@/components/ui/card';

/**
 * HeroSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  return (
    <section className="py-12 md:py-24">
      <Card className="border-dashed">
        <CardContent className="flex min-h-[300px] md:min-h-[400px] items-center justify-center p-6">
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Hero Section</h2>
            <p className="text-base md:text-lg">
              여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default HeroSection;
