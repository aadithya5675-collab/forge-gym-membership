import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';
import { NAV_ITEMS, PageView } from '../../types/navigation';

interface NavbarProps {
  activeView: PageView;
  onNavigate: (view: PageView) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar({ activeView, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070806]/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C7FF3D]/40 bg-[#111310] group-hover:border-[#C7FF3D] transition-colors">
            <Zap className="h-4.5 w-4.5 text-[#C7FF3D]" fill="#C7FF3D" />
          </div>
          <div className="text-left">
            <span className="block font-display text-lg font-extrabold tracking-wider text-[#F3F5ED] leading-none">
              FORGE
            </span>
            <span className="block text-[9px] font-semibold tracking-widest text-[#A1A69A] uppercase leading-tight">
              PERFORMANCE CLUB
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg ${
                  isActive ? 'text-[#C7FF3D]' : 'text-[#A1A69A] hover:text-[#F3F5ED]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C7FF3D] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('membership')}
            className="flex h-9 items-center justify-center rounded-xl bg-[#C7FF3D] px-4 font-extrabold text-xs uppercase tracking-wider text-[#070806] hover:bg-[#A8E65C] transition-colors shadow-md cursor-pointer"
          >
            Join FORGE
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-[#111310] text-[#F3F5ED]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease }}
            className="md:hidden border-b border-white/10 bg-[#111310] px-4 py-4 space-y-2 overflow-hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left font-display text-base font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#C7FF3D]/10 text-[#C7FF3D] border border-[#C7FF3D]/30'
                      : 'text-[#A1A69A] hover:bg-white/5 hover:text-[#F3F5ED]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-[#C7FF3D]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
