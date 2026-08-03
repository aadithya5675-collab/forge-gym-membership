import {
  calculateAnnualSavings,
  calculateBilledAmount,
  calculateMonthlyRate,
  formatCurrency,
} from '../../lib/membershipPricing';
import { BillingCycle, MembershipPlan } from '../../types/membership';

interface MembershipSummaryProps {
  plan: MembershipPlan;
  billingCycle: BillingCycle;
}

export function MembershipSummary({ plan, billingCycle }: MembershipSummaryProps) {
  const monthlyRate = calculateMonthlyRate(plan, billingCycle);
  const totalBilled = calculateBilledAmount(plan, billingCycle);
  const annualSavings = calculateAnnualSavings(plan);

  return (
    <div className="rounded-xl border border-white/10 bg-[#111310] p-4 space-y-2.5 select-none">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-[#A1A69A] uppercase tracking-wider block">
            SELECTED MEMBERSHIP SUMMARY
          </span>
          <span className="font-display text-lg font-bold text-[#F3F5ED] uppercase">
            {plan.name} Plan · <span className="capitalize">{billingCycle}</span>
          </span>
        </div>

        <div className="text-right">
          <div className="font-display text-2xl font-bold text-[#C7FF3D]">
            {formatCurrency(monthlyRate)}
          </div>
          <span className="text-xs text-[#A1A69A]">/month equivalent</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs">
        <span className="text-[#A1A69A]">Actual total charged:</span>
        <span className="font-semibold text-[#F3F5ED]">
          {formatCurrency(totalBilled)} {billingCycle === 'annual' ? 'upfront per year' : 'per month'}
        </span>
      </div>

      {billingCycle === 'annual' && (
        <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs">
          <span className="text-[#A1A69A]">Annual discount applied:</span>
          <span className="font-semibold text-[#C7FF3D]">
            You save {formatCurrency(annualSavings)} per year
          </span>
        </div>
      )}
    </div>
  );
}
