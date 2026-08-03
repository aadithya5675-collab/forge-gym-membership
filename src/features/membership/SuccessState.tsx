import { motion } from 'motion/react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease }}
      className="rounded-2xl border border-[#C7FF3D]/40 bg-[#111310] p-6 sm:p-8 space-y-6 text-center shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#C7FF3D]" />

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

      {/* Captured Application Details */}
      <div className="rounded-xl border border-white/10 bg-[#181B16] p-4 text-left space-y-3">
        <div className="flex justify-between items-center pb-2.5 border-b border-white/10 text-xs text-[#A1A69A]">
          <span>Application Summary</span>
          <span className="text-[#C7FF3D] font-bold uppercase tracking-wider">Demo Ready</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-[#A1A69A] block">Applicant Name</span>
            <span className="font-semibold text-[#F3F5ED]">
              {formData.firstName} {formData.lastName}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Selected Plan</span>
            <span className="font-semibold text-[#C7FF3D]">
              {plan.name} ({billingCycle})
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Rate Breakdown</span>
            <span className="font-semibold text-[#F3F5ED]">
              {formatCurrency(monthlyRate)}/mo ({formatCurrency(totalBilled)})
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Primary Goal</span>
            <span className="font-semibold text-[#F3F5ED]">{goalLabel}</span>
          </div>
        </div>
      </div>

      {/* Prototype Mode Disclosure */}
      <div className="rounded-xl border border-white/10 bg-[#070806]/80 p-3 text-center">
        <p className="text-xs text-[#A1A69A]">
          <strong className="text-[#C7FF3D]">Prototype mode</strong> — no payment was taken and no membership was activated.
        </p>
      </div>

      {/* Start Over Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-[#F3F5ED] font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Start Over</span>
        </button>
      </div>
    </motion.div>
  );
}
