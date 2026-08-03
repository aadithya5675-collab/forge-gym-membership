import { motion } from 'motion/react';
import { BillingCycle } from '../../types/membership';

interface BillingSelectorProps {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function BillingSelector({ billingCycle, onChange }: BillingSelectorProps) {
  return (
    <fieldset className="w-full">
      <legend className="sr-only">Billing Frequency</legend>
      <div className="relative flex rounded-xl bg-[#111310] border border-white/10 p-1 select-none">
        {/* Monthly Option */}
        <label
          htmlFor="billing-monthly"
          className={`relative flex-1 flex items-center justify-center rounded-lg py-2.5 text-xs font-semibold cursor-pointer transition-colors z-10 ${
            billingCycle === 'monthly' ? 'text-[#F3F5ED]' : 'text-[#A1A69A] hover:text-[#F3F5ED]'
          }`}
        >
          <input
            type="radio"
            id="billing-monthly"
            name="billingCycle"
            value="monthly"
            checked={billingCycle === 'monthly'}
            onChange={() => onChange('monthly')}
            className="sr-only"
          />
          {billingCycle === 'monthly' && (
            <motion.div
              layoutId="billing-selector-indicator"
              className="absolute inset-0 rounded-lg bg-[#181B16] border border-white/15 shadow-sm -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span>Monthly Billing</span>
        </label>

        {/* Annual Option */}
        <label
          htmlFor="billing-annual"
          className={`relative flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold cursor-pointer transition-colors z-10 ${
            billingCycle === 'annual' ? 'text-[#F3F5ED]' : 'text-[#A1A69A] hover:text-[#F3F5ED]'
          }`}
        >
          <input
            type="radio"
            id="billing-annual"
            name="billingCycle"
            value="annual"
            checked={billingCycle === 'annual'}
            onChange={() => onChange('annual')}
            className="sr-only"
          />
          {billingCycle === 'annual' && (
            <motion.div
              layoutId="billing-selector-indicator"
              className="absolute inset-0 rounded-lg bg-[#181B16] border border-white/15 shadow-sm -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span>Annual · Save 20%</span>
          <span className="rounded-full bg-[#C7FF3D] px-2 py-0.5 text-[10px] font-bold text-[#070806] uppercase tracking-wide">
            SAVE 20%
          </span>
        </label>
      </div>

      {/* Polite live region announcement for screen readers */}
      <span className="sr-only" role="status" aria-live="polite">
        {billingCycle === 'annual'
          ? 'Annual billing selected with 20% discount'
          : 'Monthly billing selected'}
      </span>
    </fieldset>
  );
}
