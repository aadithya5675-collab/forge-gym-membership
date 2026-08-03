import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { STEP_METADATA } from '../../data/membershipPlans';
import { StepNumber } from '../../types/membership';
import { ForgeLogo } from './ForgeLogo';
import { KineticMotionCanvas } from './KineticMotionCanvas';

interface HeroPanelProps {
  currentStep: StepNumber;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroPanel({ currentStep }: HeroPanelProps) {
  const currentMetadata = STEP_METADATA.find((s) => s.number === currentStep) || STEP_METADATA[0];

  return (
    <aside className="relative hidden lg:flex lg:w-[44%] xl:w-[46%] h-[calc(100dvh-2rem)] sticky top-4 flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 p-8 xl:p-10 select-none shadow-2xl bg-[#111310] bg-noise">
      {/* Kinetic Canvas Motion Graphics */}
      <KineticMotionCanvas />

      {/* Background Image with slight initial load scaling */}
      <motion.img
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=90"
        alt="FORGE Performance Club strength floor interior"
        width={1800}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        loading="eager"
      />

      {/* Dark bottom-to-top gradient overlay for high contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070806] via-[#070806]/70 to-transparent" />

      {/* Subtle lime ambient glow in bottom-left */}
      <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-[#C7FF3D]/10 blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <ForgeLogo size="md" />

        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#070806]/80 px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#C7FF3D] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-[#F3F5ED]">
            COIMBATORE · OPEN 05:00–23:00
          </span>
        </div>
      </div>

      {/* Bottom Hero Content */}
      <div className="relative z-10 mt-auto pt-12 space-y-6">
        {/* Dynamic Step Badge */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-[#C7FF3D]/30 bg-[#C7FF3D]/10 px-3.5 py-1 text-xs font-bold tracking-widest text-[#C7FF3D] uppercase"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{currentMetadata.eyebrow}</span>
        </motion.div>

        {/* Main Headline */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-extrabold leading-[1.02] text-[#F3F5ED] xl:text-5xl uppercase tracking-tight">
            Your strongest chapter <br />
            <span className="text-[#C7FF3D]">starts here.</span>
          </h1>

          {/* Dynamic Supporting Text */}
          <motion.p
            key={currentStep + '-text'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease }}
            className="max-w-lg text-sm text-[#A1A69A] xl:text-base leading-relaxed"
          >
            {currentMetadata.heroText}
          </motion.p>
        </div>

        {/* Membership Benefits */}
        <div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#070806]/70 p-2.5 backdrop-blur-md">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C7FF3D]/20 text-[#C7FF3D]">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <span className="text-xs font-medium text-[#F3F5ED]">Unlimited gym access</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#070806]/70 p-2.5 backdrop-blur-md">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C7FF3D]/20 text-[#C7FF3D]">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <span className="text-xs font-medium text-[#F3F5ED]">Personal fitness assessment</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#070806]/70 p-2.5 backdrop-blur-md">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C7FF3D]/20 text-[#C7FF3D]">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </div>
            <span className="text-xs font-medium text-[#F3F5ED]">Flexible membership plans</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
