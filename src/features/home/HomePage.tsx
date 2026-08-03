import { motion } from 'motion/react';
import { ArrowRight, Check, Dumbbell, Flame, HeartPulse, Shield, Sparkles, Trophy, Users, Zap } from 'lucide-react';
import { PageView } from '../../types/navigation';
import { KineticMotionCanvas } from '../../components/brand/KineticMotionCanvas';

interface HomePageProps {
  onNavigate: (view: PageView) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-16 pb-12 select-none">
      {/* 1. HERO BANNER */}
      <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[#111310] p-6 sm:p-10 lg:p-14 bg-noise shadow-2xl">
        <KineticMotionCanvas />

        {/* Hero Background Image */}
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=90"
          alt="FORGE Performance Club gym floor"
          className="absolute inset-0 h-full w-full object-cover opacity-50 pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070806] via-[#070806]/60 to-transparent pointer-events-none" />

        {/* Hero Top Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C7FF3D]/40 bg-[#070806]/80 px-3.5 py-1 text-xs font-bold text-[#C7FF3D] uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>COIMBATORE PERFORMANCE CLUB</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-[#070806]/80 px-3.5 py-1.5 backdrop-blur-md text-xs text-[#F3F5ED]">
            <span className="h-2 w-2 rounded-full bg-[#C7FF3D] animate-pulse" />
            <span>OPEN 05:00 – 23:00 IST</span>
          </div>
        </div>

        {/* Hero Main Copy */}
        <div className="relative z-10 my-auto py-12 max-w-3xl space-y-6">
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.98] text-[#F3F5ED] sm:text-6xl lg:text-7xl tracking-tight">
            Unforgiving strength. <br />
            <span className="text-[#C7FF3D]">Intelligent performance.</span>
          </h1>

          <p className="text-sm text-[#A1A69A] sm:text-base lg:text-lg max-w-xl leading-relaxed">
            Coimbatore’s premier strength training destination. Elite biomechanics equipment, cold plunge recovery, and expert coaching for athletes who refuse to settle.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('membership')}
              className="group flex h-13 px-8 items-center justify-center gap-2 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-sm uppercase tracking-wider hover:bg-[#A8E65C] transition-all shadow-lg shadow-[#C7FF3D]/10 cursor-pointer"
            >
              <span>Build Your Membership</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('facilities')}
              className="flex h-13 px-6 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-[#F3F5ED] font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span>Explore Facilities</span>
            </button>
          </div>
        </div>

        {/* Hero Quick Stats Row */}
        <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-white/10 pt-6">
          <div>
            <span className="font-display text-3xl font-extrabold text-[#C7FF3D]">12,000</span>
            <span className="block text-[11px] text-[#A1A69A] uppercase">SQ FT Strength Floor</span>
          </div>

          <div>
            <span className="font-display text-3xl font-extrabold text-[#F3F5ED]">100+</span>
            <span className="block text-[11px] text-[#A1A69A] uppercase">Hammer Strength Units</span>
          </div>

          <div>
            <span className="font-display text-3xl font-extrabold text-[#C7FF3D]">3°C</span>
            <span className="block text-[11px] text-[#A1A69A] uppercase">Ice Bath & Sauna Suite</span>
          </div>

          <div>
            <span className="font-display text-3xl font-extrabold text-[#F3F5ED]">15+</span>
            <span className="block text-[11px] text-[#A1A69A] uppercase">CSCS Certified Coaches</span>
          </div>
        </div>
      </section>

      {/* 2. THE FOUR PILLARS */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
            WHY FORGE
          </span>
          <h2 className="font-display text-3xl font-extrabold uppercase text-[#F3F5ED] sm:text-4xl">
            Built on Uncompromising Standards
          </h2>
          <p className="text-xs text-[#A1A69A]">
            We designed FORGE to eliminate the distractions of generic commercial gyms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#111310] p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C7FF3D]/10 text-[#C7FF3D]">
              <Dumbbell className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#F3F5ED] uppercase">Biomechanical Equipment</h3>
            <p className="text-xs text-[#A1A69A] leading-relaxed">
              Curated plate-loaded machines from Eleiko and Hammer Strength calibrated for precise muscle loading.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111310] p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C7FF3D]/10 text-[#C7FF3D]">
              <HeartPulse className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#F3F5ED] uppercase">Contrast Recovery Suite</h3>
            <p className="text-xs text-[#A1A69A] leading-relaxed">
              3°C cold plunge tanks, Finnish cedar sauna, and red-light recovery pods to accelerate muscle repair.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111310] p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C7FF3D]/10 text-[#C7FF3D]">
              <Trophy className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#F3F5ED] uppercase">Intelligent Coaching</h3>
            <p className="text-xs text-[#A1A69A] leading-relaxed">
              Periodized group programming and 1-on-1 personal training tailored to your specific biomechanics.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111310] p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C7FF3D]/10 text-[#C7FF3D]">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#F3F5ED] uppercase">Driven Community</h3>
            <p className="text-xs text-[#A1A69A] leading-relaxed">
              Train alongside athletes, lifters, and professionals who take their fitness seriously.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FACILITY SHOWCASE PREVIEW */}
      <section className="rounded-3xl border border-white/10 bg-[#111310] p-6 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
              COIMBATORE FACILITY
            </span>
            <h2 className="font-display text-3xl font-extrabold uppercase text-[#F3F5ED]">
              World-Class Training Arenas
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('facilities')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#C7FF3D] hover:underline"
          >
            <span>View All Arenas</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="group rounded-2xl border border-white/10 bg-[#181B16] overflow-hidden">
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                alt="Strength Floor"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-[#070806]/80 px-2.5 py-0.5 text-[10px] font-bold text-[#C7FF3D] uppercase">
                Zone 01
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-display text-xl font-bold text-[#F3F5ED] uppercase">The Strength Floor</h3>
              <p className="text-xs text-[#A1A69A]">
                8 competition power racks, calibrated Eleiko plates, and dumbbells up to 70kg.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group rounded-2xl border border-white/10 bg-[#181B16] overflow-hidden">
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
                alt="Recovery Suite"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-[#070806]/80 px-2.5 py-0.5 text-[10px] font-bold text-[#C7FF3D] uppercase">
                Zone 02
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-display text-xl font-bold text-[#F3F5ED] uppercase">Recovery & Cold Plunge</h3>
              <p className="text-xs text-[#A1A69A]">
                3°C cold plunge tubs, Finnish cedar sauna, and NormaTec compression therapy.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group rounded-2xl border border-white/10 bg-[#181B16] overflow-hidden">
            <div className="h-48 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                alt="Turf Arena"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-[#070806]/80 px-2.5 py-0.5 text-[10px] font-bold text-[#C7FF3D] uppercase">
                Zone 03
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-display text-xl font-bold text-[#F3F5ED] uppercase">Conditioning Turf</h3>
              <p className="text-xs text-[#A1A69A]">
                25m sprint turf, heavy sleds, Concept2 rowers/skiergs, and plyometric boxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION TO BUILD MEMBERSHIP */}
      <section className="rounded-3xl border border-[#C7FF3D]/30 bg-gradient-to-br from-[#181B16] via-[#111310] to-[#070806] p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/40">
          <Zap className="h-7 w-7" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C7FF3D]">
            JOIN FORGE PERFORMANCE CLUB
          </span>
          <h2 className="font-display text-4xl font-extrabold uppercase text-[#F3F5ED] sm:text-5xl">
            Start Your Membership
          </h2>
          <p className="text-xs text-[#A1A69A]">
            Select your preferred tier, customize your goals, and set up your athletic profile in under 2 minutes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('membership')}
          className="group inline-flex h-14 px-8 items-center justify-center gap-2 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-sm uppercase tracking-wider hover:bg-[#A8E65C] transition-all shadow-lg shadow-[#C7FF3D]/20 cursor-pointer"
        >
          <span>Launch 3-Step Enrollment</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </section>
    </div>
  );
}
