import useScrollAnimation from '@/hooks/use-scroll-animation';

const skills = [
  {
    name: 'HTML',
    level: 85,
    description: '시맨틱 마크업, 웹 접근성 준수',
    color: '#E34F26',
    bgColor: 'bg-orange-50',
  },
  {
    name: 'CSS',
    level: 80,
    description: 'Flexbox/Grid, 반응형, 애니메이션',
    color: '#1572B6',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Figma',
    level: 70,
    description: '디자인 시안 해석, 에셋 추출',
    color: '#A259FF',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'JavaScript',
    level: 60,
    description: 'DOM 조작, ES6+, 비동기 처리',
    color: '#F7DF1E',
    bgColor: 'bg-yellow-50',
  },
  {
    name: 'React',
    level: 50,
    description: '컴포넌트 기반 개발, Hooks',
    color: '#61DAFB',
    bgColor: 'bg-cyan-50',
  },
];

/**
 * SkillBar 컴포넌트
 *
 * Props:
 * @param {string} name - 기술명 [Required]
 * @param {number} level - 숙련도 퍼센트 (0~100) [Required]
 * @param {string} description - 기술 설명 [Required]
 * @param {string} color - 프로그레스 바 색상 (hex) [Required]
 * @param {string} bgColor - 배경 색상 클래스 [Required]
 * @param {number} delay - 애니메이션 지연 시간(ms) [Required]
 * @param {boolean} isVisible - 화면 노출 여부 [Required]
 *
 * Example usage:
 * <SkillBar name="HTML" level={85} description="시맨틱 마크업" color="#E34F26" bgColor="bg-orange-50" delay={0} isVisible={true} />
 */
function SkillBar({ name, level, description, color, bgColor, delay, isVisible }) {
  return (
    <div
      className={`rounded-xl p-4 md:p-5 ${bgColor} transition-all duration-300 hover:shadow-md`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="font-semibold text-sm md:text-base">{name}</span>
        </div>
        <span
          className="text-sm font-bold"
          style={{ color }}
        >
          {isVisible ? level : 0}%
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: isVisible ? `${level}%` : '0%',
            backgroundColor: color,
            transition: `width 1.2s ease-out ${delay + 300}ms`,
          }}
        />
      </div>

      {/* 설명 */}
      <p
        className="mt-2 text-xs md:text-sm text-muted-foreground"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `opacity 0.5s ease-out ${delay + 600}ms`,
        }}
      >
        {description}
      </p>
    </div>
  );
}

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
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

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
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Skills</h2>
        <p className="text-muted-foreground text-base md:text-lg">
          꾸준히 성장하는 기술 스택
        </p>
      </div>

      {/* 스킬 바 목록 */}
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            description={skill.description}
            color={skill.color}
            bgColor={skill.bgColor}
            delay={index * 150}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}

export default SkillSection;
