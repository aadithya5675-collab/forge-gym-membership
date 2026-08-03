import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { NAV_ITEMS, PageView } from '../../types/navigation';
import { PolicyModalType } from '../../types/membership';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenPolicy: (type: PolicyModalType) => void;
}

export function Footer({ onNavigate, onOpenPolicy }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#070806] text-[#A1A69A] pt-12 pb-8 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C7FF3D]/40 bg-[#111310]">
                <Zap className="h-4.5 w-4.5 text-[#C7FF3D]" fill="#C7FF3D" />
              </div>
              <div>
                <span className="block font-display text-lg font-extrabold tracking-wider text-[#F3F5ED]">
                  FORGE
                </span>
                <span className="block text-[9px] font-semibold tracking-widest text-[#A1A69A] uppercase">
                  PERFORMANCE CLUB
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A1A69A] leading-relaxed max-w-sm">
              Coimbatore’s premier strength & athletic conditioning destination. Built for unyielding progress.
            </p>

            <div className="space-y-1.5 text-xs text-[#F3F5ED]/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#C7FF3D]" />
                <span>Avinashi Road, Race Course, Coimbatore</span>
              </div>
              <div className="text-[11px] text-[#A1A69A] pl-5.5">
                Open Daily: 05:00 – 23:00 IST
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <span className="block font-display text-sm font-bold uppercase tracking-wider text-[#F3F5ED]">
              Explore FORGE
            </span>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-[#C7FF3D] transition-colors focus:outline-none"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Standards */}
          <div className="space-y-3">
            <span className="block font-display text-sm font-bold uppercase tracking-wider text-[#F3F5ED]">
              Club Policies
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#C7FF3D] transition-colors focus:outline-none"
                >
                  Membership Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('health')}
                  className="hover:text-[#C7FF3D] transition-colors focus:outline-none"
                >
                  Health Declaration
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#C7FF3D] transition-colors focus:outline-none"
                >
                  Privacy Policy & Data Handling
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Performance Dispatch Newsletter */}
          <div className="space-y-3">
            <span className="block font-display text-sm font-bold uppercase tracking-wider text-[#F3F5ED]">
              Training Dispatch
            </span>
            <p className="text-xs text-[#A1A69A] leading-relaxed">
              Get monthly biomechanics programming updates and coach insights.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-10 w-full rounded-xl border border-white/10 bg-[#111310] px-3 pr-10 text-xs text-[#F3F5ED] placeholder-[#747A70] focus:border-[#C7FF3D] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded-lg bg-[#C7FF3D] text-[#070806] hover:bg-[#A8E65C] transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#A8E65C] font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Subscribed to FORGE Dispatch!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#747A70]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#A1A69A]" />
            <span>FORGE Performance Club © {new Date().getFullYear()}. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#C7FF3D] font-mono text-[11px]">COIMBATORE · INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
