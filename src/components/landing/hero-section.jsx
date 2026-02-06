import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const skillNutrients = [
  { name: 'HTML', color: '#FDBA74', delay: '1.8s' },
  { name: 'CSS', color: '#93C5FD', delay: '2.1s' },
  { name: 'JavaScript', color: '#FDE68A', delay: '2.4s' },
  { name: 'Figma', color: '#C4B5FD', delay: '2.7s' },
  { name: 'React', color: '#A5F3FC', delay: '3.0s' },
];

const storyLines = [
  { text: '한 그루의 나무처럼,', delay: 400 },
  { text: '기술이라는 양분을 흡수하며', delay: 1200 },
  { text: '쑥쑥 자라나는 개발자.', delay: 2000 },
];

/**
 * GrowingTree 컴포넌트
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <GrowingTree />
 */
function GrowingTree() {
  return (
    <div
      className="relative w-[280px] h-[320px] md:w-[340px] md:h-[400px]"
      style={{ animation: 'sway 6s ease-in-out infinite' }}
    >
      <svg
        viewBox="0 0 340 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 뿌리 */}
        <g style={{ animation: 'growTrunk 0.8s ease-out 0.2s both', transformOrigin: '170px 380px' }}>
          <path
            d="M155 380 Q140 370 125 385"
            stroke="#C4A882"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M185 380 Q200 372 215 388"
            stroke="#C4A882"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M170 385 Q170 375 160 395"
            stroke="#C4A882"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* 줄기 */}
        <rect
          x="158"
          y="200"
          width="24"
          rx="12"
          height="185"
          fill="url(#trunkGradient)"
          style={{ animation: 'growTrunk 1s ease-out 0.3s both', transformOrigin: '170px 385px' }}
        />

        {/* 왼쪽 가지 */}
        <path
          d="M162 260 Q130 240 110 210"
          stroke="#A78B6B"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{ animation: 'growBranch 0.6s ease-out 1.0s both', transformOrigin: '162px 260px' }}
        />

        {/* 오른쪽 가지 */}
        <path
          d="M178 240 Q210 218 235 195"
          stroke="#A78B6B"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          style={{ animation: 'growBranch 0.6s ease-out 1.2s both', transformOrigin: '178px 240px' }}
        />

        {/* 윗 가지 */}
        <path
          d="M165 220 Q145 190 130 165"
          stroke="#A78B6B"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          style={{ animation: 'growBranch 0.6s ease-out 1.3s both', transformOrigin: '165px 220px' }}
        />

        {/* 수관 (나뭇잎 덩어리들) */}
        <ellipse
          cx="170"
          cy="155"
          rx="75"
          ry="65"
          fill="url(#canopyGradient1)"
          style={{ animation: 'bloomLeaf 0.8s ease-out 1.4s both', transformOrigin: '170px 155px' }}
        />
        <ellipse
          cx="120"
          cy="185"
          rx="50"
          ry="45"
          fill="url(#canopyGradient2)"
          style={{ animation: 'bloomLeaf 0.8s ease-out 1.6s both', transformOrigin: '120px 185px' }}
        />
        <ellipse
          cx="225"
          cy="175"
          rx="48"
          ry="42"
          fill="url(#canopyGradient3)"
          style={{ animation: 'bloomLeaf 0.8s ease-out 1.7s both', transformOrigin: '225px 175px' }}
        />
        <ellipse
          cx="155"
          cy="115"
          rx="42"
          ry="38"
          fill="url(#canopyGradient2)"
          style={{ animation: 'bloomLeaf 0.8s ease-out 1.8s both', transformOrigin: '155px 115px' }}
        />
        <ellipse
          cx="200"
          cy="125"
          rx="40"
          ry="36"
          fill="url(#canopyGradient1)"
          style={{ animation: 'bloomLeaf 0.8s ease-out 1.9s both', transformOrigin: '200px 125px' }}
        />

        {/* 그라디언트 정의 */}
        <defs>
          <linearGradient id="trunkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A78B6B" />
            <stop offset="100%" stopColor="#8B7355" />
          </linearGradient>
          <radialGradient id="canopyGradient1">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </radialGradient>
          <radialGradient id="canopyGradient2">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#86EFAC" />
          </radialGradient>
          <radialGradient id="canopyGradient3">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#5BD8A8" />
          </radialGradient>
        </defs>
      </svg>

      {/* 기술 양분 태그들 */}
      <div
        className="absolute top-[12%] left-[4%]"
        style={{ animation: `bloomLeaf 0.6s ease-out ${skillNutrients[0].delay} both, floatSoft 3.5s ease-in-out 3.5s infinite` }}
      >
        <NutrientTag name={skillNutrients[0].name} color={skillNutrients[0].color} />
      </div>
      <div
        className="absolute top-[6%] right-[8%]"
        style={{ animation: `bloomLeaf 0.6s ease-out ${skillNutrients[1].delay} both, floatSoft 4s ease-in-out 3.8s infinite` }}
      >
        <NutrientTag name={skillNutrients[1].name} color={skillNutrients[1].color} />
      </div>
      <div
        className="absolute top-[28%] left-[-4%]"
        style={{ animation: `bloomLeaf 0.6s ease-out ${skillNutrients[2].delay} both, floatSoft 3.8s ease-in-out 4s infinite` }}
      >
        <NutrientTag name={skillNutrients[2].name} color={skillNutrients[2].color} />
      </div>
      <div
        className="absolute top-[18%] right-[-2%]"
        style={{ animation: `bloomLeaf 0.6s ease-out ${skillNutrients[3].delay} both, floatSoft 4.2s ease-in-out 3.6s infinite` }}
      >
        <NutrientTag name={skillNutrients[3].name} color={skillNutrients[3].color} />
      </div>
      <div
        className="absolute top-[2%] left-[36%]"
        style={{ animation: `bloomLeaf 0.6s ease-out ${skillNutrients[4].delay} both, floatSoft 3.6s ease-in-out 4.2s infinite` }}
      >
        <NutrientTag name={skillNutrients[4].name} color={skillNutrients[4].color} />
      </div>
    </div>
  );
}

/**
 * NutrientTag 컴포넌트
 *
 * Props:
 * @param {string} name - 기술명 [Required]
 * @param {string} color - 배경 색상 (hex) [Required]
 *
 * Example usage:
 * <NutrientTag name="HTML" color="#FDBA74" />
 */
function NutrientTag({ name, color }) {
  return (
    <span
      className="inline-block px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold text-gray-700 shadow-sm"
      style={{
        backgroundColor: color,
        animation: 'nutrientPulse 3s ease-in-out infinite',
      }}
    >
      {name}
    </span>
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

  useEffect(() => {
    storyLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, line.delay);
      return () => clearTimeout(timer);
    });
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden py-12 md:py-0">
      {/* 파스텔 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-violet-50/30 -z-10" />

      {/* 떠다니는 배경 장식 */}
      <div
        className="absolute top-[10%] left-[8%] w-20 h-20 rounded-full bg-emerald-100/50 blur-2xl"
        style={{ animation: 'floatSoft 5s ease-in-out infinite' }}
      />
      <div
        className="absolute top-[20%] right-[12%] w-16 h-16 rounded-full bg-violet-100/50 blur-2xl"
        style={{ animation: 'floatSoft 4.5s ease-in-out 1s infinite' }}
      />
      <div
        className="absolute bottom-[25%] left-[15%] w-14 h-14 rounded-full bg-amber-100/40 blur-2xl"
        style={{ animation: 'floatSoft 5.5s ease-in-out 0.5s infinite' }}
      />

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col items-center gap-8 md:gap-10 px-4">
        {/* 스토리텔링 헤드라인 */}
        <div className="text-center flex flex-col gap-2 md:gap-3">
          {storyLines.map((line, index) => (
            <h1
              key={index}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800"
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

        {/* 나무 일러스트 */}
        <GrowingTree />

        {/* 이름 및 직무 */}
        <div
          className="text-center"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 3.2s both' }}
        >
          <p className="text-lg md:text-xl text-muted-foreground mb-1">
            Web Publisher
          </p>
          <p className="text-sm md:text-base text-muted-foreground/70">
            기초를 탄탄히, 가지를 넓게 뻗어나가겠습니다
          </p>
        </div>
      </div>

      {/* 스크롤 다운 인디케이터 */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
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
