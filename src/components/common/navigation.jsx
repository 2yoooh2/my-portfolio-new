import { NavLink } from 'react-router-dom';
import { Cat } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Navigation 컴포넌트
 *
 * Props:
 * 없음 (라우트 링크 내장)
 *
 * Example usage:
 * <Navigation />
 */
function Navigation() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Me' },
    { to: '/projects', label: 'Projects' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <NavLink to="/" className="flex items-center gap-2 group">
          <Cat className="w-6 h-6 text-sky-500 group-hover:text-sky-600 transition-colors" />
          <span className="font-bold text-xl tracking-tight">Hyezzi</span>
        </NavLink>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
