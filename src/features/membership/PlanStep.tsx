import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, SlidersHorizontal } from 'lucide-react';
import { ComparisonMatrixDialog } from '../../components/ui/ComparisonMatrixDialog';
import { PLANS } from '../../data/membershipPlans';
import { BillingCycle, MembershipPlan, PlanId } from '../../types/membership';
import { BillingSelector } from './BillingSelector';
import { MembershipSummary } from './MembershipSummary';
import { PlanCard } from './PlanCard';

interface PlanStepProps {
  billingCycle: BillingCycle;
  selectedPlan: MembershipPlan;
  onSelectBilling: (cycle: BillingCycle) => void;
  onSelectPlan: (id: PlanId) => void;
  onNext: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function PlanStep({
  billingCycle,
  selectedPlan,
  onSelectBilling,
  onSelectPlan,
  onNext,
}: PlanStepProps) {
  const [showMatrix, setShowMatrix] = useState(false);
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
          MEMBERSHIP SELECTION
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#F3F5ED] uppercase sm:text-4xl">
          Choose how you want to train
        </h2>
        <p className="text-xs text-[#A1A69A]">
          Select a membership that matches your training style. You can review everything before submitting.
        </p>
      </div>

      {/* Billing Selector */}
      <BillingSelector billingCycle={billingCycle} onChange={onSelectBilling} />

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            isSelected={selectedPlan.id === plan.id}
            onSelect={onSelectPlan}
          />
        ))}
      </div>

      {/* Compare All Tiers Trigger Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowMatrix(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#C7FF3D] hover:text-[#A8E65C] transition-colors py-1 focus:outline-none"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Compare All Tier Privileges</span>
        </button>
      </div>

      {/* Comparison Matrix Modal */}
      <ComparisonMatrixDialog
        isOpen={showMatrix}
        onClose={() => setShowMatrix(false)}
        onSelectPlan={onSelectPlan}
      />

      {/* Selected Plan Benefits Box */}
      <motion.div
        key={selectedPlan.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease }}
        className="rounded-xl border border-white/10 bg-[#181B16] p-4 space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#F3F5ED]">
            What’s included in <span className="text-[#C7FF3D]">{selectedPlan.name}</span>:
          </span>
          <span className="text-[11px] text-[#A1A69A]">All-inclusive privileges</span>
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-[#F3F5ED]/90">
          {selectedPlan.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="h-3.5 w-3.5 text-[#C7FF3D] shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Pricing Summary */}
      <MembershipSummary plan={selectedPlan} billingCycle={billingCycle} />

      {/* Desktop Next Button */}
      <div className="pt-2 hidden lg:block">
        <button
          type="button"
          onClick={onNext}
          className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-sm uppercase tracking-wider transition-all hover:bg-[#A8E65C] shadow-lg shadow-[#C7FF3D]/10 cursor-pointer"
        >
          <span>Continue to profile details</span>
          <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
