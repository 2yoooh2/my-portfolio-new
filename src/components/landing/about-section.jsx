import { useNavigate } from 'react-router-dom';
import { Code, BookOpen, Users, TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/use-scroll-animation';

const storyCards = [
  {
    icon: Code,
    title: '디자인이 브라우저에서 살아 움직이는 순간',
    description:
      '디자인을 웹 브라우저에 그대로 구현하는 과정이 흥미로워 퍼블리싱을 시작했습니다. 포토샵의 정적인 시안이 HTML/CSS를 통해 반응형으로 동작하는 것을 보며 확신하게 되었습니다.',
    accent: 'from-blue-200 to-blue-300',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    icon: BookOpen,
    title: '읽기 편한 코드, 가이드를 지키는 꼼꼼함',
    description:
      '읽기 편한 코드와 디자인 가이드를 준수하는 꼼꼼함을 가장 중요하게 생각합니다. 네이밍 컨벤션, 들여쓰기, 주석까지 — 다음 사람이 편하게 읽을 수 있는 코드가 좋은 코드라고 믿습니다.',
    accent: 'from-emerald-200 to-emerald-300',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Users,
    title: '해결될 때까지 파고드는 끈기, 함께 만드는 소통',
    description:
      '문제가 해결될 때까지 집요하게 파고드는 끈기를 가지고 있습니다. 디자이너, 기획자, 개발자와 원활하게 소통하며 더 나은 결과물을 만들어내는 것에 보람을 느낍니다.',
    accent: 'from-violet-200 to-violet-300',
    iconBg: 'bg-violet-100 text-violet-600',
  },
  {
    icon: TrendingUp,
    title: '탄탄한 기초 위에 쌓아가는 전문성',
    description:
      '기초가 탄탄한 퍼블리셔로 시작하여, 점차 전문성을 넓혀가는 개발자가 되고 싶습니다. HTML/CSS의 깊은 이해를 바탕으로 사용자 경험 전반을 책임지는 프론트엔드 전문가를 목표로 합니다.',
    accent: 'from-rose-200 to-rose-300',
    iconBg: 'bg-rose-100 text-rose-600',
  },
];

/**
 * StoryCard 컴포넌트
 *
 * Props:
 * @param {Object} icon - lucide-react 아이콘 컴포넌트 [Required]
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 카드 설명 [Required]
 * @param {string} accent - 그라디언트 클래스 [Required]
 * @param {string} iconBg - 아이콘 배경 클래스 [Required]
 * @param {number} delay - 애니메이션 지연 시간(ms) [Required]
 * @param {boolean} isVisible - 화면 노출 여부 [Required]
 *
 * Example usage:
 * <StoryCard icon={Code} title="제목" description="설명" accent="from-blue-200 to-blue-300" iconBg="bg-blue-100 text-blue-600" delay={0} isVisible={true} />
 */
function StoryCard({ icon: Icon, title, description, accent, iconBg, delay, isVisible }) {
  return (
    <Card
      className="overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      <div className={`h-1.5 bg-gradient-to-r ${accent}`} />
      <CardContent className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className={`shrink-0 rounded-xl p-2.5 ${iconBg}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base md:text-lg font-semibold leading-snug">
              {title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={ref} className="py-12 md:py-20">
      {/* 섹션 헤더 */}
      <div
        className="text-center mb-10 md:mb-12"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">About Me</h2>
        <p className="text-muted-foreground text-base md:text-lg">
          코드로 디자인에 생명을 불어넣는 퍼블리셔
        </p>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {storyCards.map((card, index) => (
          <StoryCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            accent={card.accent}
            iconBg={card.iconBg}
            delay={index * 200}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* 더 알아보기 버튼 */}
      <div
        className="mt-8 md:mt-10 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease-out 900ms, transform 0.6s ease-out 900ms',
        }}
      >
        <Button
          variant="outline"
          size="lg"
          className="transition-transform hover:scale-105"
          onClick={() => navigate('/about')}
        >
          더 알아보기
        </Button>
      </div>
    </section>
  );
}

export default AboutSection;
