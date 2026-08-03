import { Zap } from 'lucide-react';

interface ForgeLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export function ForgeLogo({ size = 'md', showSubtitle = true, className = '' }: ForgeLogoProps) {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const boxSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div
        className={`flex items-center justify-center rounded-full border border-[#C7FF3D]/40 bg-[#111310] ${boxSizes[size]} shadow-sm`}
      >
        <Zap className={`${iconSizes[size]} text-[#C7FF3D]`} fill="#C7FF3D" />
      </div>
      <div>
        <span className={`block font-display font-extrabold tracking-wider text-[#F3F5ED] ${titleSizes[size]}`}>
          FORGE
        </span>
        {showSubtitle && (
          <span className="block text-[10px] font-semibold tracking-widest text-[#A1A69A] uppercase">
            PERFORMANCE CLUB
          </span>
        )}
      </div>
    </div>
  );
}
