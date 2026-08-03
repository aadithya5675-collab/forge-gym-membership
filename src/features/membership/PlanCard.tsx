import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { calculateBilledAmount, calculateMonthlyRate, formatCurrency } from '../../lib/membershipPricing';
import { BillingCycle, MembershipPlan, PlanId } from '../../types/membership';

interface PlanCardProps {
  plan: MembershipPlan;
  billingCycle: BillingCycle;
  isSelected: boolean;
  onSelect: (id: PlanId) => void;
}

export function PlanCard({ plan, billingCycle, isSelected, onSelect }: PlanCardProps) {
  const monthlyRate = calculateMonthlyRate(plan, billingCycle);
  const totalBilled = calculateBilledAmount(plan, billingCycle);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex flex-col h-full"
    >
      <label
        htmlFor={`plan-${plan.id}`}
        className={`relative flex flex-col justify-between h-full rounded-2xl border p-4 cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-[#C7FF3D] ${
          isSelected
            ? 'border-[#C7FF3D] bg-[#C7FF3D]/5 shadow-lg shadow-[#C7FF3D]/5 ring-1 ring-[#C7FF3D]'
            : 'border-white/10 bg-[#181B16] hover:border-white/20'
        }`}
      >
        <input
          type="radio"
          id={`plan-${plan.id}`}
          name="membershipPlan"
          value={plan.id}
          checked={isSelected}
          onChange={() => onSelect(plan.id)}
          className="sr-only"
        />

        {/* Recommended Badge */}
        {plan.isRecommended && (
          <div className="absolute -top-3 right-3 rounded-full bg-[#C7FF3D] px-2.5 py-0.5 text-[10px] font-extrabold text-[#070806] uppercase tracking-wider shadow">
            Recommended
          </div>
        )}

        <div>
          {/* Header & Radio Check Indicator */}
          <div className="flex items-center justify-between pb-2">
            <span className="font-display text-xl font-bold tracking-tight text-[#F3F5ED] uppercase">
              {plan.name}
            </span>
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                isSelected
                  ? 'border-[#C7FF3D] bg-[#C7FF3D] text-[#070806]'
                  : 'border-white/30 bg-transparent'
              }`}
            >
              {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs text-[#A1A69A] leading-relaxed min-h-[36px]">
            {plan.shortDesc}
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="mt-4 pt-3 border-t border-white/5 space-y-0.5">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-bold tracking-tight text-[#F3F5ED]">
              {formatCurrency(monthlyRate)}
            </span>
            <span className="text-xs text-[#A1A69A]">/mo</span>
          </div>

          {billingCycle === 'annual' ? (
            <div className="space-y-0.5">
              <span className="block text-[10px] text-[#A1A69A]">equivalent</span>
              <span className="block text-[11px] font-semibold text-[#C7FF3D]">
                {formatCurrency(totalBilled)} billed annually
              </span>
            </div>
          ) : (
            <span className="block text-[11px] text-[#A1A69A]">billed monthly</span>
          )}
        </div>
      </label>
    </motion.div>
  );
}
