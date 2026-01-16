import { Card, CardContent } from '@/components/ui/card';

/**
 * SkillSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <SkillSection />
 */
function SkillSection() {
  return (
    <section className="py-12 md:py-16">
      <Card className="border-dashed">
        <CardContent className="flex min-h-[200px] md:min-h-[300px] items-center justify-center p-6">
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Skill Tree Section</h2>
            <p className="text-base md:text-lg">
              여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default SkillSection;
