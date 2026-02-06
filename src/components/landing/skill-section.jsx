import useScrollAnimation from '@/hooks/use-scroll-animation';

const CIRCLE_SIZE = 120;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const skills = [
  {
    name: 'HTML',
    level: 85,
    description: '시맨틱 마크업, 웹 접근성 준수',
    color: '#E34F26',
    bgRing: '#FED7AA',
  },
  {
    name: 'CSS',
    level: 80,
    description: 'Flexbox/Grid, 반응형, 애니메이션',
    color: '#1572B6',
    bgRing: '#BFDBFE',
  },
  {
    name: 'Figma',
    level: 70,
    description: '디자인 시안 해석, 에셋 추출',
    color: '#A259FF',
    bgRing: '#DDD6FE',
  },
  {
    name: 'JavaScript',
    level: 60,
    description: 'DOM 조작, ES6+, 비동기 처리',
    color: '#F7DF1E',
    bgRing: '#FEF3C7',
  },
  {
    name: 'React',
    level: 50,
    description: '컴포넌트 기반 개발, Hooks',
    color: '#61DAFB',
    bgRing: '#CFFAFE',
  },
];

/**
 * SkillCircle 컴포넌트 - 원형 프로그레스 차트
 *
 * Props:
 * @param {string} name - 기술명 [Required]
 * @param {number} level - 숙련도 퍼센트 (0~100) [Required]
 * @param {string} description - 기술 설명 [Required]
 * @param {string} color - 메인 색상 (hex) [Required]
 * @param {string} bgRing - 배경 링 색상 (hex) [Required]
 * @param {number} delay - 애니메이션 지연 시간(ms) [Required]
 * @param {boolean} isVisible - 화면 노출 여부 [Required]
 *
 * Example usage:
 * <SkillCircle name="HTML" level={85} description="시맨틱 마크업" color="#E34F26" bgRing="#FED7AA" delay={0} isVisible={true} />
 */
function SkillCircle({ name, level, description, color, bgRing, delay, isVisible }) {
  const offset = CIRCUMFERENCE - (level / 100) * CIRCUMFERENCE;

  return (
    <div
      className="flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {/* 원형 차트 */}
      <div className="relative" style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}>
        <svg
          width={CIRCLE_SIZE}
          height={CIRCLE_SIZE}
          className="-rotate-90"
        >
          {/* 배경 링 */}
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={bgRing}
            strokeWidth={STROKE_WIDTH}
          />
          {/* 프로그레스 링 */}
          <circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={isVisible ? offset : CIRCUMFERENCE}
            style={{
              transition: `stroke-dashoffset 1.4s ease-out ${delay + 300}ms`,
            }}
          />
        </svg>
        {/* 중앙 퍼센트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl md:text-2xl font-bold" style={{ color }}>
            {isVisible ? level : 0}
          </span>
          <span className="text-[10px] text-muted-foreground">%</span>
        </div>
      </div>

      {/* 기술명 */}
      <span className="text-sm md:text-base font-semibold">{name}</span>

      {/* 설명 */}
      <p
        className="text-[11px] md:text-xs text-center text-muted-foreground max-w-[120px] leading-relaxed"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity 0.5s ease-out ${delay + 800}ms`,
        }}
      >
        {description}
      </p>
    </div>
  );
}

/**
 * SkillSection 컴포넌트 - 원형 차트 스킬 표시
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <SkillSection />
 */
function SkillSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-12 md:py-20">
      {/* 섹션 헤더 */}
      <div
        className="text-center mb-10 md:mb-14"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Skills</h2>
        <p className="text-muted-foreground text-base md:text-lg">
          꾸준히 성장하는 기술 스택
        </p>
      </div>

      {/* 원형 차트 그리드 */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {skills.map((skill, index) => (
          <SkillCircle
            key={skill.name}
            name={skill.name}
            level={skill.level}
            description={skill.description}
            color={skill.color}
            bgRing={skill.bgRing}
            delay={index * 200}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}

export default SkillSection;
