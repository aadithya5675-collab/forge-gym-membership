import React from 'react';
import { ArrowLeft, Check, Edit2, ShieldCheck } from 'lucide-react';
import { GOAL_OPTIONS } from '../../data/membershipPlans';
import {
  calculateAnnualSavings,
  calculateBilledAmount,
  calculateMonthlyRate,
  formatCurrency,
} from '../../lib/membershipPricing';
import {
  BillingCycle,
  FieldErrors,
  GoalId,
  MemberFormData,
  MembershipPlan,
  PolicyModalType,
} from '../../types/membership';

interface ReviewStepProps {
  plan: MembershipPlan;
  billingCycle: BillingCycle;
  selectedGoalId: GoalId;
  formData: MemberFormData;
  termsAccepted: boolean;
  errors: FieldErrors;
  isSubmitting: boolean;
  onToggleTerms: (accepted: boolean) => void;
  onOpenPolicy: (type: PolicyModalType) => void;
  onEditStep: (step: 1 | 2) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ReviewStep({
  plan,
  billingCycle,
  selectedGoalId,
  formData,
  termsAccepted,
  errors,
  isSubmitting,
  onToggleTerms,
  onOpenPolicy,
  onEditStep,
  onBack,
  onSubmit,
}: ReviewStepProps) {
  const goalLabel = GOAL_OPTIONS.find((g) => g.id === selectedGoalId)?.label || selectedGoalId;
  const monthlyRate = calculateMonthlyRate(plan, billingCycle);
  const totalBilled = calculateBilledAmount(plan, billingCycle);
  const annualSavings = calculateAnnualSavings(plan);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Step Header */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
          FINAL CONFIRMATION
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#F3F5ED] uppercase sm:text-4xl">
          Review your membership
        </h2>
        <p className="text-xs text-[#A1A69A]">
          Check your plan and personal details before submitting your application.
        </p>
      </div>

      {/* 1. Membership Section Summary */}
      <div className="rounded-xl border border-white/10 bg-[#111310] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-xs font-bold text-[#F3F5ED] uppercase tracking-wider">
            1. Membership Plan
          </span>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="flex items-center gap-1 text-xs font-semibold text-[#C7FF3D] hover:underline"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit Plan</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-[#A1A69A] block">Selected Tier</span>
            <span className="font-display text-base font-bold text-[#F3F5ED] uppercase">
              {plan.name}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Billing Cycle</span>
            <span className="font-semibold text-[#F3F5ED] capitalize">{billingCycle}</span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Monthly Equivalent</span>
            <span className="font-semibold text-[#C7FF3D]">{formatCurrency(monthlyRate)}/mo</span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Actual Billed Total</span>
            <span className="font-semibold text-[#F3F5ED]">
              {formatCurrency(totalBilled)} {billingCycle === 'annual' ? 'upfront/yr' : '/mo'}
            </span>
          </div>
        </div>

        {billingCycle === 'annual' && (
          <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[11px]">
            <span className="text-[#A1A69A]">Annual Savings:</span>
            <span className="font-semibold text-[#C7FF3D]">
              You save {formatCurrency(annualSavings)} per year
            </span>
          </div>
        )}
      </div>

      {/* 2. Profile Section Summary */}
      <div className="rounded-xl border border-white/10 bg-[#111310] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-xs font-bold text-[#F3F5ED] uppercase tracking-wider">
            2. Member Profile
          </span>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="flex items-center gap-1 text-xs font-semibold text-[#C7FF3D] hover:underline"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
          <div>
            <span className="text-[11px] text-[#A1A69A] block">Member Name</span>
            <span className="font-semibold text-[#F3F5ED]">
              {formData.firstName} {formData.lastName}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Primary Goal</span>
            <span className="font-semibold text-[#F3F5ED]">{goalLabel}</span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Email Address</span>
            <span className="font-semibold text-[#F3F5ED]">{formData.email}</span>
          </div>

          <div>
            <span className="text-[11px] text-[#A1A69A] block">Mobile Number</span>
            <span className="font-semibold text-[#F3F5ED]">
              +91 {formData.phone.replace(/\D/g, '')}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Legal Terms & Declarations */}
      <div className="space-y-3 pt-1">
        <div className="space-y-1.5">
          <label className="flex items-start gap-2.5 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => onToggleTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-[#111310] text-[#C7FF3D] focus:ring-[#C7FF3D] accent-[#C7FF3D]"
            />
            <span className="text-xs leading-relaxed text-[#A1A69A] group-hover:text-[#F3F5ED] transition-colors">
              I agree to the{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPolicy('terms');
                }}
                className="text-[#C7FF3D] underline underline-offset-2 hover:text-[#A8E65C]"
              >
                membership terms
              </button>
              ,{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPolicy('health');
                }}
                className="text-[#C7FF3D] underline underline-offset-2 hover:text-[#A8E65C]"
              >
                health declaration
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPolicy('privacy');
                }}
                className="text-[#C7FF3D] underline underline-offset-2 hover:text-[#A8E65C]"
              >
                privacy policy
              </button>
              .
            </span>
          </label>

          {errors.termsAccepted && (
            <p role="alert" className="text-xs font-medium text-[#FF6B63] pl-6">
              {errors.termsAccepted}
            </p>
          )}
        </div>

        <p className="text-[11px] text-[#747A70] leading-normal pl-6">
          Annual plans are billed upfront. Renewal can be managed anytime prior to the next billing period. No joining fee.
        </p>
      </div>

      {/* Navigation Controls (Desktop) */}
      <div className="pt-2 hidden lg:flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex h-13 px-6 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-[#F3F5ED] font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex-1 flex h-13 items-center justify-center gap-2 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-sm uppercase tracking-wider transition-all hover:bg-[#A8E65C] disabled:opacity-70 shadow-lg shadow-[#C7FF3D]/10 cursor-pointer"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin text-[#070806]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Submitting Application...</span>
            </div>
          ) : (
            <>
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Submit Membership Application</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
