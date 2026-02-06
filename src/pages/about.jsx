import { Code, BookOpen, Users, TrendingUp, Heart, Sparkles } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import useScrollAnimation from '@/hooks/use-scroll-animation';

const timeline = [
  {
    icon: Sparkles,
    title: '퍼블리싱과의 첫 만남',
    description:
      '디자인을 웹 브라우저에 그대로 구현하는 과정에 매료되었습니다. 포토샵의 정적인 시안이 HTML/CSS를 통해 반응형으로 살아 움직이는 것을 보며, 이것이 내가 하고 싶은 일이라고 확신하게 되었습니다.',
    accent: 'border-l-blue-400',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Code,
    title: '기술을 쌓아가는 과정',
    description:
      'HTML과 CSS의 기초부터 탄탄히 다지며, JavaScript와 React까지 학습 영역을 넓혀왔습니다. Figma로 디자인 시안을 해석하고 Pixel Perfect에 가깝게 구현하는 훈련을 꾸준히 해왔습니다.',
    accent: 'border-l-emerald-400',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: BookOpen,
    title: '꼼꼼함이라는 무기',
    description:
      '읽기 편한 코드와 디자인 가이드를 준수하는 꼼꼼함을 가장 중요하게 생각합니다. 네이밍 컨벤션, 들여쓰기, 주석 하나까지 — 다음 사람이 편하게 읽을 수 있는 코드가 좋은 코드라고 믿습니다.',
    accent: 'border-l-amber-400',
    iconBg: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Users,
    title: '소통하는 퍼블리셔',
    description:
      '에이전시 환경에서 가장 중요한 것은 소통이라고 생각합니다. 디자이너의 의도를 정확히 파악하고, 기획자와 기능 요구사항을 조율하며, 백엔드 개발자와 원활하게 데이터를 연동하는 — 그 과정에서 보람을 느낍니다.',
    accent: 'border-l-violet-400',
    iconBg: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Heart,
    title: '끈기와 집요함',
    description:
      '문제가 해결될 때까지 집요하게 파고드는 끈기를 가지고 있습니다. 브라우저 호환성 이슈, 미세한 레이아웃 차이, 예상치 못한 버그 — 포기하지 않고 원인을 찾아 해결하는 것이 저의 일하는 방식입니다.',
    accent: 'border-l-rose-400',
    iconBg: 'bg-rose-100 text-rose-600',
  },
  {
    icon: TrendingUp,
    title: '앞으로의 목표',
    description:
      '기초가 탄탄한 퍼블리셔로 시작하여, 점차 전문성을 넓혀가는 개발자가 되고 싶습니다. 접근성, 퍼포먼스 최적화, 크로스 브라우징까지 — 사용자 경험 전반을 책임지는 프론트엔드 전문가를 목표로 합니다.',
    accent: 'border-l-indigo-400',
    iconBg: 'bg-indigo-100 text-indigo-600',
  },
];

/**
 * TimelineItem 컴포넌트
 *
 * Props:
 * @param {Object} icon - lucide-react 아이콘 컴포넌트 [Required]
 * @param {string} title - 타임라인 제목 [Required]
 * @param {string} description - 타임라인 설명 [Required]
 * @param {string} accent - 왼쪽 보더 색상 클래스 [Required]
 * @param {string} iconBg - 아이콘 배경 클래스 [Required]
 * @param {number} delay - 애니메이션 지연 시간(ms) [Required]
 * @param {boolean} isVisible - 화면 노출 여부 [Required]
 *
 * Example usage:
 * <TimelineItem icon={Code} title="제목" description="설명" accent="border-l-blue-400" iconBg="bg-blue-100 text-blue-600" delay={0} isVisible={true} />
 */
function TimelineItem({ icon: Icon, title, description, accent, iconBg, delay, isVisible }) {
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      <Card className={`border-l-4 ${accent} transition-all duration-300 hover:shadow-md`}>
        <CardContent className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className={`shrink-0 rounded-xl p-2.5 ${iconBg}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * About 페이지 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <About />
 */
function About() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      {/* 헤더 */}
      <div
        ref={headerRef}
        className="text-center mb-12 md:mb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">About Me</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          코드로 디자인에 생명을 불어넣는 퍼블리셔,
          <br className="hidden md:block" />
          소통으로 더 나은 결과물을 만들어갑니다.
        </p>
      </div>

      {/* 타임라인 */}
      <div ref={timelineRef} className="flex flex-col gap-4 md:gap-6">
        {timeline.map((item, index) => (
          <TimelineItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
            accent={item.accent}
            iconBg={item.iconBg}
            delay={index * 150}
            isVisible={timelineVisible}
          />
        ))}
      </div>
    </div>
  );
}

export default About;
