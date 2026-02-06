import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import useScrollAnimation from '@/hooks/use-scroll-animation';

const postItNotes = [
  {
    id: 'start',
    title: '시작 스토리',
    content: '디자인을 웹 브라우저에 그대로 구현하는 과정이 흥미로워 퍼블리싱을 시작했습니다.',
    color: '#FEF3C7',
    pinColor: '#F59E0B',
    rotate: -3,
    defaultPos: { x: 0, y: 0 },
  },
  {
    id: 'growth',
    title: '기술 성장',
    content: 'HTML과 CSS의 기초부터 탄탄히 다지며, JavaScript와 React까지 학습 영역을 넓혀왔습니다.',
    color: '#D1FAE5',
    pinColor: '#10B981',
    rotate: 2,
    defaultPos: { x: 0, y: 0 },
  },
  {
    id: 'detail',
    title: '꼼꼼함',
    content: '읽기 편한 코드와 디자인 가이드를 준수하는 꼼꼼함을 가장 중요하게 생각합니다.',
    color: '#DBEAFE',
    pinColor: '#3B82F6',
    rotate: -1.5,
    defaultPos: { x: 0, y: 0 },
  },
  {
    id: 'strength',
    title: '끈기 & 소통',
    content: '문제가 해결될 때까지 파고드는 끈기, 디자이너/기획자와 원활하게 소통하는 능력.',
    color: '#FCE7F3',
    pinColor: '#EC4899',
    rotate: 2.5,
    defaultPos: { x: 0, y: 0 },
  },
  {
    id: 'goal',
    title: '성장 목표',
    content: '기초가 탄탄한 퍼블리셔에서 사용자 경험 전반을 책임지는 프론트엔드 전문가로.',
    color: '#EDE9FE',
    pinColor: '#8B5CF6',
    rotate: -2,
    defaultPos: { x: 0, y: 0 },
  },
];

/**
 * CatAvatar 컴포넌트 - 귀여운 고양이 SVG 아바타
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <CatAvatar />
 */
function CatAvatar() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* 배경 원 */}
      <circle cx="100" cy="100" r="96" fill="#E0F2FE" />
      <circle cx="100" cy="100" r="96" fill="url(#avatarGrad)" />
      <defs>
        <radialGradient id="avatarGrad">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      {/* 몸통 */}
      <ellipse cx="100" cy="158" rx="42" ry="30" fill="#FFD8A8" />

      {/* 얼굴 */}
      <ellipse cx="100" cy="108" rx="52" ry="46" fill="#FFE0B2" />

      {/* 귀 왼쪽 */}
      <path d="M58 72 L42 32 L78 58 Z" fill="#FFE0B2" />
      <path d="M60 68 L48 38 L74 58 Z" fill="#FFCC80" />

      {/* 귀 오른쪽 */}
      <path d="M142 72 L158 32 L122 58 Z" fill="#FFE0B2" />
      <path d="M140 68 L152 38 L126 58 Z" fill="#FFCC80" />

      {/* 눈 왼쪽 */}
      <ellipse cx="80" cy="102" rx="10" ry="11" fill="white" />
      <ellipse cx="82" cy="103" rx="6" ry="7" fill="#4A3728" />
      <circle cx="84" cy="100" r="2.5" fill="white" />

      {/* 눈 오른쪽 */}
      <ellipse cx="120" cy="102" rx="10" ry="11" fill="white" />
      <ellipse cx="118" cy="103" rx="6" ry="7" fill="#4A3728" />
      <circle cx="120" cy="100" r="2.5" fill="white" />

      {/* 코 */}
      <ellipse cx="100" cy="116" rx="4" ry="3" fill="#FF8A80" />

      {/* 입 */}
      <path d="M93 120 Q100 127 107 120" stroke="#C4956A" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* 수염 왼쪽 */}
      <line x1="50" y1="108" x2="75" y2="112" stroke="#D4A574" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="48" y1="116" x2="74" y2="116" stroke="#D4A574" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="124" x2="75" y2="120" stroke="#D4A574" strokeWidth="1.2" strokeLinecap="round" />

      {/* 수염 오른쪽 */}
      <line x1="150" y1="108" x2="125" y2="112" stroke="#D4A574" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="152" y1="116" x2="126" y2="116" stroke="#D4A574" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="150" y1="124" x2="125" y2="120" stroke="#D4A574" strokeWidth="1.2" strokeLinecap="round" />

      {/* 볼터치 */}
      <ellipse cx="68" cy="118" rx="10" ry="6" fill="#FFAB91" opacity="0.35" />
      <ellipse cx="132" cy="118" rx="10" ry="6" fill="#FFAB91" opacity="0.35" />
    </svg>
  );
}

/**
 * ProfileCard 컴포넌트 - 프로필 카드
 *
 * Props:
 * @param {boolean} isVisible - 화면 노출 여부 [Required]
 *
 * Example usage:
 * <ProfileCard isVisible={true} />
 */
function ProfileCard({ isVisible }) {
  return (
    <div
      className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl bg-white/80 border border-gray-100 shadow-sm"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out 100ms, transform 0.6s ease-out 100ms',
      }}
    >
      {/* 고양이 아바타 */}
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-sky-100 shadow-md">
        <CatAvatar />
      </div>

      {/* 이름 */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-800">유혜지</h3>

      {/* 한 줄 소개 */}
      <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed">
        디자인과 코드 사이,<br />
        다리를 놓는 퍼블리셔
      </p>

      {/* 키워드 태그 */}
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {['Web Publisher', 'UI Developer', 'Pixel Perfect'].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs font-medium rounded-full bg-sky-50 text-sky-600 border border-sky-100"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * PostItNote 컴포넌트 - 드래그 가능한 포스트잇
 *
 * Props:
 * @param {string} title - 포스트잇 제목 [Required]
 * @param {string} content - 포스트잇 내용 [Required]
 * @param {string} color - 배경색 (hex) [Required]
 * @param {string} pinColor - 핀 색상 (hex) [Required]
 * @param {number} rotate - 초기 회전 각도 [Required]
 * @param {Object} position - { x, y } 현재 위치 [Required]
 * @param {function} onDragStart - 드래그 시작 핸들러 [Required]
 * @param {boolean} isDragging - 드래그 중 여부 [Required]
 * @param {number} delay - 등장 애니메이션 딜레이(ms) [Required]
 * @param {boolean} isVisible - 화면 노출 여부 [Required]
 *
 * Example usage:
 * <PostItNote title="제목" content="내용" color="#FEF3C7" pinColor="#F59E0B" rotate={-3} position={{ x: 0, y: 0 }} onDragStart={() => {}} isDragging={false} delay={0} isVisible={true} />
 */
function PostItNote({
  title,
  content,
  color,
  pinColor,
  rotate,
  position,
  onDragStart,
  isDragging,
  delay,
  isVisible,
}) {
  return (
    <div
      className="absolute cursor-grab active:cursor-grabbing select-none touch-none"
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${rotate}deg)`,
        zIndex: isDragging ? 50 : 10,
        opacity: isVisible ? 1 : 0,
        transition: isDragging ? 'none' : `opacity 0.5s ease-out ${delay}ms, box-shadow 0.2s`,
        filter: isDragging ? 'drop-shadow(0 12px 20px rgba(0,0,0,0.15))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))',
      }}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    >
      <div
        className="w-44 md:w-52 p-4 md:p-5 rounded-sm relative"
        style={{ backgroundColor: color }}
      >
        {/* 핀 */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-sm border-2 border-white"
          style={{ backgroundColor: pinColor }}
        />
        {/* 접힌 모서리 효과 */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6"
          style={{
            background: `linear-gradient(135deg, ${color} 50%, rgba(0,0,0,0.06) 50%)`,
          }}
        />
        <h3 className="text-sm md:text-base font-bold mb-2 mt-1" style={{ color: pinColor }}>
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

/**
 * AboutSection 컴포넌트 - 프로필 + 포스트잇 드래그 보드
 *
 * Props:
 * 없음
 *
 * Example usage:
 * <AboutSection />
 */
function AboutSection() {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const boardRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [dragging, setDragging] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  /** 보드 크기에 맞춰 초기 위치 계산 */
  useEffect(() => {
    const calcPositions = () => {
      const board = boardRef.current;
      if (!board) return;
      const w = board.offsetWidth;
      const h = board.offsetHeight;
      const cardW = w >= 768 ? 208 : 176;
      const cardH = 140;
      const padX = 12;
      const padY = 20;

      const cols = w >= 500 ? 3 : 2;
      const topRowCols = cols;
      const bottomRowCols = cols === 3 ? 2 : cols;
      const colW = (w - padX * 2) / topRowCols;
      const rowH = (h - padY * 2) / 2;

      setPositions(
        postItNotes.map((_, i) => {
          const isTopRow = i < topRowCols;
          if (isTopRow) {
            return {
              x: padX + i * colW + (colW - cardW) / 2,
              y: padY + (rowH - cardH) / 2,
            };
          }
          const bottomIndex = i - topRowCols;
          const bottomColW = (w - padX * 2) / bottomRowCols;
          const bottomOffset = (w - padX * 2 - bottomRowCols * bottomColW) / 2;
          return {
            x: padX + bottomOffset + bottomIndex * bottomColW + (bottomColW - cardW) / 2,
            y: padY + rowH + (rowH - cardH) / 2,
          };
        })
      );
    };

    calcPositions();
    window.addEventListener('resize', calcPositions);
    return () => window.removeEventListener('resize', calcPositions);
  }, []);

  const handleDragStart = useCallback((index, e) => {
    e.preventDefault();
    const board = boardRef.current;
    if (!board) return;

    const rect = board.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragOffset.current = {
      x: clientX - rect.left - positions[index].x,
      y: clientY - rect.top - positions[index].y,
    };
    setDragging(index);
  }, [positions]);

  const handleDragMove = useCallback((e) => {
    if (dragging === null) return;
    const board = boardRef.current;
    if (!board) return;

    const rect = board.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const newX = clientX - rect.left - dragOffset.current.x;
    const newY = clientY - rect.top - dragOffset.current.y;

    setPositions(prev => {
      const next = [...prev];
      next[dragging] = {
        x: Math.max(-20, Math.min(newX, rect.width - 100)),
        y: Math.max(-20, Math.min(newY, rect.height - 60)),
      };
      return next;
    });
  }, [dragging]);

  const handleDragEnd = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging !== null) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [dragging, handleDragMove, handleDragEnd]);

  return (
    <section ref={ref} className="py-12 md:py-20">
      {/* 섹션 헤더 */}
      <div
        className="text-center mb-8 md:mb-10"
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

      {/* 프로필 + 우드보드 양 옆 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
        {/* 왼쪽: 프로필 카드 */}
        <div className="flex flex-col gap-4">
          <ProfileCard isVisible={isVisible} />

          {/* 더 알아보기 버튼 */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease-out 900ms, transform 0.6s ease-out 900ms',
            }}
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full transition-transform hover:scale-105"
              onClick={() => navigate('/about')}
            >
              더 알아보기
            </Button>
          </div>
        </div>

        {/* 오른쪽: 포스트잇 우드보드 */}
        <div className="flex flex-col gap-2">
          <p className="text-xs md:text-sm text-muted-foreground/60 text-center lg:text-left">
            포스트잇을 드래그해서 자유롭게 옮겨보세요!
          </p>
          <div
            ref={boardRef}
            className="relative w-full min-h-[420px] md:min-h-[440px] rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #D4A574 0%, #C4956A 25%, #B8865E 50%, #C4956A 75%, #D4A574 100%)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
              border: '3px solid #A0764E',
            }}
          >
            {/* 나무결 텍스처 */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  95deg,
                  transparent,
                  transparent 8px,
                  rgba(139,90,43,0.3) 8px,
                  rgba(139,90,43,0.3) 9px
                ), repeating-linear-gradient(
                  87deg,
                  transparent,
                  transparent 15px,
                  rgba(160,118,78,0.2) 15px,
                  rgba(160,118,78,0.2) 16px
                )`,
              }}
            />
            {/* 나무 결 노드(매듭) 장식 */}
            <div
              className="absolute top-[15%] left-[8%] w-10 h-6 rounded-full opacity-[0.08]"
              style={{ background: 'radial-gradient(ellipse, #8B5A2B, transparent)' }}
            />
            <div
              className="absolute bottom-[20%] right-[12%] w-8 h-5 rounded-full opacity-[0.06]"
              style={{ background: 'radial-gradient(ellipse, #8B5A2B, transparent)' }}
            />

            {positions.length > 0 && postItNotes.map((note, index) => (
              <PostItNote
                key={note.id}
                title={note.title}
                content={note.content}
                color={note.color}
                pinColor={note.pinColor}
                rotate={note.rotate}
                position={positions[index]}
                onDragStart={(e) => handleDragStart(index, e)}
                isDragging={dragging === index}
                delay={index * 200}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
