import { ArrowUpRight } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * ProjectCard 컴포넌트
 *
 * Props:
 * @param {string} title - 프로젝트 제목 [Required]
 * @param {string} description - 프로젝트 설명 [Required]
 * @param {string[]} techStack - 기술 스택 배열 [Required]
 * @param {string} detailUrl - 프로젝트 링크 [Required]
 * @param {string} thumbnailUrl - 썸네일 이미지 URL [Optional]
 * @param {string} className - 추가 CSS 클래스 [Optional]
 *
 * Example usage:
 * <ProjectCard
 *   title="My Project"
 *   description="프로젝트 설명"
 *   techStack={['React', 'Tailwind']}
 *   detailUrl="https://example.com"
 *   thumbnailUrl="https://image.thum.io/get/https://example.com"
 * />
 */
function ProjectCard({
  title,
  description,
  techStack = [],
  detailUrl,
  thumbnailUrl,
  className
}) {
  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${title} 썸네일`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
        <a
          href={detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-label={`${title} 사이트 열기`}
        >
          <ArrowUpRight className="h-8 w-8 text-white" />
          <span className="text-sm font-medium text-white">바로가기</span>
        </a>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
