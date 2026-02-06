import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const skillNutrients = [
  { name: 'HTML', color: '#FDBA74', glowColor: 'rgba(253,186,116,0.5)' },
  { name: 'CSS', color: '#93C5FD', glowColor: 'rgba(147,197,253,0.5)' },
  { name: 'React', color: '#A5F3FC', glowColor: 'rgba(165,243,252,0.5)' },
  { name: 'JavaScript', color: '#FDE68A', glowColor: 'rgba(253,230,138,0.5)' },
  { name: 'Figma', color: '#C4B5FD', glowColor: 'rgba(196,181,253,0.5)' },
];

const storyLines = [
  { text: '한 그루의 나무처럼,', delay: 400 },
  { text: '기술이라는 양분을 흡수하며', delay: 1200 },
  { text: '쑥쑥 자라나는 개발자.', delay: 2000 },
];

/**
 * GrowingTree 컴포넌트 - 나무 SVG
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <GrowingTree />
 */
function GrowingTree() {
  return (
    <svg viewBox="0 0 500 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9B7B5B" />
          <stop offset="100%" stopColor="#7A6248" />
        </linearGradient>
        <radialGradient id="canopy1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#4ADE80" />
        </radialGradient>
        <radialGradient id="canopy2">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="100%" stopColor="#6EE7B7" />
        </radialGradient>
        <radialGradient id="canopy3">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#34D399" />
        </radialGradient>
        <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A76A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C4956A" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <ellipse cx="250" cy="520" rx="220" ry="18" fill="url(#soilGrad)" />

      <g style={{ animation: 'growTrunk 0.8s ease-out 0.2s both', transformOrigin: '250px 510px' }}>
        <path d="M235 510 Q200 530 150 550" stroke="#B8976B" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M265 510 Q300 535 350 555" stroke="#B8976B" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M245 515 Q220 545 180 570" stroke="#B8976B" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M260 515 Q285 545 325 565" stroke="#B8976B" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M250 518 Q250 548 240 580" stroke="#B8976B" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M175 540 Q160 548 140 545" stroke="#C4A882" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M330 548 Q345 555 360 550" stroke="#C4A882" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4" />
      </g>

      <path
        d="M240 510 Q238 400 242 300 Q244 280 250 270 Q256 280 258 300 Q262 400 260 510 Z"
        fill="url(#trunkGrad)"
        style={{ animation: 'growTrunk 1.2s ease-out 0.3s both', transformOrigin: '250px 510px' }}
      />

      <path d="M245 370 Q190 340 130 280" stroke="#9B7B5B" strokeWidth="12" fill="none" strokeLinecap="round"
        style={{ animation: 'growBranch 0.7s ease-out 1.0s both', transformOrigin: '245px 370px' }} />
      <path d="M185 335 Q160 310 145 280" stroke="#9B7B5B" strokeWidth="6" fill="none" strokeLinecap="round"
        style={{ animation: 'growBranch 0.5s ease-out 1.3s both', transformOrigin: '185px 335px' }} />
      <path d="M255 350 Q310 310 370 265" stroke="#9B7B5B" strokeWidth="11" fill="none" strokeLinecap="round"
        style={{ animation: 'growBranch 0.7s ease-out 1.1s both', transformOrigin: '255px 350px' }} />
      <path d="M315 305 Q340 285 360 250" stroke="#9B7B5B" strokeWidth="5" fill="none" strokeLinecap="round"
        style={{ animation: 'growBranch 0.5s ease-out 1.4s both', transformOrigin: '315px 305px' }} />
      <path d="M248 310 Q235 260 220 210" stroke="#9B7B5B" strokeWidth="8" fill="none" strokeLinecap="round"
        style={{ animation: 'growBranch 0.6s ease-out 1.2s both', transformOrigin: '248px 310px' }} />

      <ellipse cx="250" cy="200" rx="120" ry="100" fill="url(#canopy1)"
        style={{ animation: 'bloomLeaf 0.9s ease-out 1.5s both', transformOrigin: '250px 200px' }} />
      <ellipse cx="160" cy="260" rx="80" ry="65" fill="url(#canopy2)"
        style={{ animation: 'bloomLeaf 0.8s ease-out 1.7s both', transformOrigin: '160px 260px' }} />
      <ellipse cx="345" cy="245" rx="75" ry="62" fill="url(#canopy3)"
        style={{ animation: 'bloomLeaf 0.8s ease-out 1.8s both', transformOrigin: '345px 245px' }} />
      <ellipse cx="200" cy="145" rx="65" ry="55" fill="url(#canopy2)"
        style={{ animation: 'bloomLeaf 0.8s ease-out 1.9s both', transformOrigin: '200px 145px' }} />
      <ellipse cx="310" cy="155" rx="60" ry="52" fill="url(#canopy1)"
        style={{ animation: 'bloomLeaf 0.8s ease-out 2.0s both', transformOrigin: '310px 155px' }} />
      <ellipse cx="250" cy="110" rx="55" ry="48" fill="url(#canopy3)"
        style={{ animation: 'bloomLeaf 0.8s ease-out 2.1s both', transformOrigin: '250px 110px' }} />

      <circle cx="170" cy="545" r="4" fill="#FDBA74" opacity="0.6"
        style={{ animation: 'glowPulse 2s ease-in-out 2.5s infinite' }} />
      <circle cx="330" cy="550" r="4" fill="#93C5FD" opacity="0.6"
        style={{ animation: 'glowPulse 2s ease-in-out 2.8s infinite' }} />
      <circle cx="200" cy="560" r="3" fill="#FDE68A" opacity="0.5"
        style={{ animation: 'glowPulse 2.5s ease-in-out 3s infinite' }} />
      <circle cx="310" cy="558" r="3" fill="#C4B5FD" opacity="0.5"
        style={{ animation: 'glowPulse 2.5s ease-in-out 3.2s infinite' }} />
    </svg>
  );
}

/**
 * NutrientTag 컴포넌트
 *
 * Props:
 * @param {string} name - 기술명 [Required]
 * @param {string} color - 배경 색상 (hex) [Required]
 * @param {string} glowColor - 발광 색상 (rgba) [Required]
 * @param {number} delay - 등장 딜레이 인덱스 [Required]
 *
 * Example usage:
 * <NutrientTag name="HTML" color="#FDBA74" glowColor="rgba(253,186,116,0.5)" delay={0} />
 */
function NutrientTag({ name, color, glowColor, delay }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor: color,
          animation: `absorbUp 2.5s ease-in-out ${2.5 + delay * 0.4}s infinite`,
        }}
      />
      <span
        className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-gray-700 shadow-md"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 12px ${glowColor}`,
          animation: `bloomLeaf 0.6s ease-out ${1.8 + delay * 0.3}s both, nutrientPulse 3s ease-in-out ${3 + delay * 0.5}s infinite`,
        }}
      >
        {name}
      </span>
    </div>
  );
}

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
  const [visibleLines, setVisibleLines] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ px: 0, py: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const timers = storyLines.map((line, index) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });
    setMousePos({
      px: e.clientX - rect.left,
      py: e.clientY - rect.top,
    });
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-between overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1B2A4A 0%, #243B6A 30%, #2D5A88 60%, #4A8DB7 85%, #7EC8E3 100%)',
      }}
    >
      {/* 마우스 스포트라이트 */}
      <div
        className="absolute pointer-events-none -z-0"
        style={{
          left: mousePos.px,
          top: mousePos.py,
          width: 400,
          height: 400,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,200,0.25) 0%, rgba(255,255,180,0.1) 30%, transparent 70%)',
          transition: 'left 0.15s ease-out, top 0.15s ease-out',
        }}
      />

      {/* 마우스 따라다니는 배경 장식 */}
      <div
        className="absolute top-[8%] left-[6%] w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(134,239,172,0.2), transparent)',
          transform: `translate(${mouse.x * 30}px, ${mouse.y * 20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute top-[15%] right-[10%] w-28 h-28 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.15), transparent)',
          transform: `translate(${mouse.x * -25}px, ${mouse.y * 15}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute bottom-[30%] left-[12%] w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(253,230,138,0.15), transparent)',
          transform: `translate(${mouse.x * 20}px, ${mouse.y * -18}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* 스토리텔링 헤드라인 */}
      <div
        className="text-center flex flex-col gap-2 md:gap-3 pt-8 md:pt-12 px-4 z-10"
        style={{
          transform: `translate(${mouse.x * -4}px, ${mouse.y * -3}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        {storyLines.map((line, index) => (
          <h1
            key={index}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg"
            style={{
              opacity: visibleLines.includes(index) ? 1 : 0,
              transform: visibleLines.includes(index) ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            {line.text}
          </h1>
        ))}
      </div>

      {/* 나무 */}
      <div
        className="relative w-full max-w-sm md:max-w-md flex-1 flex flex-col items-center justify-end px-4 z-10"
        style={{
          transform: `translate(${mouse.x * 6}px, ${mouse.y * 4}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        <div className="w-full" style={{ animation: 'sway 7s ease-in-out infinite' }}>
          <GrowingTree />
        </div>
      </div>

      {/* 양분 태그들 */}
      <div className="w-full max-w-sm md:max-w-md px-4 -mt-4 md:-mt-6 mb-2 z-10">
        <div className="flex items-end justify-between px-1 md:px-3">
          {skillNutrients.map((nutrient, index) => (
            <NutrientTag
              key={nutrient.name}
              name={nutrient.name}
              color={nutrient.color}
              glowColor={nutrient.glowColor}
              delay={index}
            />
          ))}
        </div>
      </div>

      {/* 직무 */}
      <div className="text-center pb-16 md:pb-20 z-10" style={{ animation: 'fadeSlideUp 0.8s ease-out 3.2s both' }}>
        <p className="text-base md:text-lg text-blue-100/80">
          기초를 탄탄히, 가지를 넓게 뻗어나가겠습니다
        </p>
      </div>

      {/* 스크롤 다운 */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-blue-200/50 hover:text-blue-100 transition-colors cursor-pointer z-10"
        style={{ animation: 'fadeSlideUp 0.6s ease-out 3.6s both' }}
        aria-label="아래로 스크롤"
      >
        <span className="text-xs">scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}

export default HeroSection;
