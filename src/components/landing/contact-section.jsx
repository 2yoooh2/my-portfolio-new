import { Card, CardContent } from '@/components/ui/card';

/**
 * ContactSection 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  return (
    <section className="py-12 md:py-16">
      <Card className="border-dashed">
        <CardContent className="flex min-h-[200px] md:min-h-[250px] items-center justify-center p-6">
          <div className="text-center text-muted-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Section</h2>
            <p className="text-base md:text-lg">
              여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default ContactSection;
