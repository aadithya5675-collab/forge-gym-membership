import { motion } from 'motion/react';
import { CheckCircle2, Download, Printer, RotateCcw, Zap } from 'lucide-react';
import { GOAL_OPTIONS } from '../../data/membershipPlans';
import { calculateBilledAmount, calculateMonthlyRate, formatCurrency } from '../../lib/membershipPricing';
import { BillingCycle, GoalId, MemberFormData, MembershipPlan } from '../../types/membership';

interface SuccessStateProps {
  plan: MembershipPlan;
  billingCycle: BillingCycle;
  selectedGoalId: GoalId;
  formData: MemberFormData;
  onReset: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function SuccessState({
  plan,
  billingCycle,
  selectedGoalId,
  formData,
  onReset,
}: SuccessStateProps) {
  const goalLabel = GOAL_OPTIONS.find((g) => g.id === selectedGoalId)?.label || selectedGoalId;
  const monthlyRate = calculateMonthlyRate(plan, billingCycle);
  const totalBilled = calculateBilledAmount(plan, billingCycle);

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease }}
      className="rounded-2xl border border-[#C7FF3D]/40 bg-[#111310] p-6 sm:p-8 space-y-6 text-center shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C7FF3D]" />

      {/* Success Icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/40">
        <CheckCircle2 className="h-9 w-9" />
      </div>

      {/* Copy */}
      <div className="space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#C7FF3D]">
          APPLICATION DEMO COMPLETE
        </span>
        <h2 className="font-display text-3xl font-extrabold uppercase text-[#F3F5ED] sm:text-4xl">
          Your FORGE application is ready.
        </h2>
        <p className="text-xs text-[#A1A69A]">
          We’ve captured your membership preferences and profile details.
        </p>
      </div>

      {/* Digital Pass Card Visual Ticket */}
      <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#181B16] to-[#070806] p-5 text-left space-y-4 shadow-xl relative overflow-hidden">
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C7FF3D]/40 bg-[#070806]">
              <Zap className="h-3.5 w-3.5 text-[#C7FF3D]" fill="#C7FF3D" />
            </div>
            <span className="font-display font-extrabold tracking-wider text-sm text-[#F3F5ED]">
              FORGE PASS PREVIEW
            </span>
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C7FF3D] bg-[#C7FF3D]/10 px-2 py-0.5 rounded border border-[#C7FF3D]/30">
            DEMO MODE
          </span>
        </div>

        {/* Ticket Details */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-[#A1A69A] block uppercase">Applicant</span>
            <span className="font-bold text-[#F3F5ED]">
              {formData.firstName} {formData.lastName}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#A1A69A] block uppercase">Tier</span>
            <span className="font-bold text-[#C7FF3D] uppercase">
              {plan.name} ({billingCycle})
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#A1A69A] block uppercase">Rate</span>
            <span className="font-semibold text-[#F3F5ED]">
              {formatCurrency(monthlyRate)}/mo ({formatCurrency(totalBilled)})
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#A1A69A] block uppercase">Primary Goal</span>
            <span className="font-semibold text-[#F3F5ED] capitalize">{goalLabel}</span>
          </div>
        </div>

        {/* Simulated Athletic Barcode Graphics */}
        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1 opacity-70">
              {/* SVG Barcode simulation lines */}
              <div className="h-6 w-1 bg-[#F3F5ED]" />
              <div className="h-6 w-0.5 bg-[#F3F5ED]" />
              <div className="h-6 w-2 bg-[#F3F5ED]" />
              <div className="h-6 w-0.5 bg-[#F3F5ED]" />
              <div className="h-6 w-1.5 bg-[#F3F5ED]" />
              <div className="h-6 w-0.5 bg-[#F3F5ED]" />
              <div className="h-6 w-2 bg-[#F3F5ED]" />
              <div className="h-6 w-1 bg-[#F3F5ED]" />
            </div>
            <span className="text-[9px] font-mono text-[#A1A69A] block">ID: FORGE-DEMO-2026</span>
          </div>

          <span className="text-[10px] text-[#A1A69A]">Coimbatore Strength Floor</span>
        </div>
      </div>

      {/* Prototype Mode Disclosure */}
      <div className="rounded-xl border border-white/10 bg-[#070806]/80 p-3 text-center">
        <p className="text-xs text-[#A1A69A]">
          <strong className="text-[#C7FF3D]">Prototype mode</strong> — no payment was taken and no membership was activated.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handlePrintPass}
          className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-xs uppercase tracking-wider hover:bg-[#A8E65C] transition-colors cursor-pointer shadow-lg"
        >
          <Printer className="h-4 w-4" />
          <span>Print / Save Pass</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-[#F3F5ED] font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Start Over</span>
        </button>
      </div>
    </motion.div>
  );
}
