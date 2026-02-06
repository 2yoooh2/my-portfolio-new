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
    id: 'value',
    title: '핵심 가치관',
    content: '읽기 편한 코드와 디자인 가이드를 준수하는 꼼꼼함을 가장 중요하게 생각합니다.',
    color: '#DBEAFE',
    pinColor: '#3B82F6',
    rotate: 2,
    defaultPos: { x: 0, y: 0 },
  },
  {
    id: 'strength',
    title: '끈기 & 소통',
    content: '문제가 해결될 때까지 파고드는 끈기, 디자이너/기획자와 원활하게 소통하는 능력.',
    color: '#FCE7F3',
    pinColor: '#EC4899',
    rotate: -1.5,
    defaultPos: { x: 0, y: 0 },
  },
  {
    id: 'goal',
    title: '성장 목표',
    content: '기초가 탄탄한 퍼블리셔에서 사용자 경험 전반을 책임지는 프론트엔드 전문가로.',
    color: '#D1FAE5',
    pinColor: '#10B981',
    rotate: 2.5,
    defaultPos: { x: 0, y: 0 },
  },
];

/**
 * PostItNote 컴포넌트 - 드래그 가능한 포스트잇
 *
 * Props:
 * @param {string} id - 고유 ID [Required]
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
 * <PostItNote id="start" title="제목" content="내용" color="#FEF3C7" pinColor="#F59E0B" rotate={-3} position={{ x: 0, y: 0 }} onDragStart={() => {}} isDragging={false} delay={0} isVisible={true} />
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
 * AboutSection 컴포넌트 - 포스트잇 드래그 보드
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

      const cols = 2;
      const colW = (w - padX * 2) / cols;
      const rowH = (h - padY * 2) / 2;

      setPositions(
        postItNotes.map((_, i) => ({
          x: padX + (i % cols) * colW + (colW - cardW) / 2,
          y: padY + Math.floor(i / cols) * rowH + (rowH - cardH) / 2,
        }))
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
        className="text-center mb-6 md:mb-8"
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
        <p className="text-xs md:text-sm text-muted-foreground/60 mt-2">
          포스트잇을 드래그해서 자유롭게 옮겨보세요!
        </p>
      </div>

      {/* 포스트잇 보드 */}
      <div
        ref={boardRef}
        className="relative w-full min-h-[380px] md:min-h-[420px] rounded-2xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-amber-50/40 via-white to-blue-50/40 overflow-hidden"
      >
        {/* 코르크보드 텍스처 점 */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
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
