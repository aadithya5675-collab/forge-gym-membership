import { BillingCycle, MembershipPlan } from '../types/membership';

/**
 * Returns the effective monthly price for a given plan and billing cycle.
 */
export function calculateMonthlyRate(plan: MembershipPlan, cycle: BillingCycle): number {
  return cycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
}

/**
 * Returns the actual total amount charged per billing period (annual total or single month).
 */
export function calculateBilledAmount(plan: MembershipPlan, cycle: BillingCycle): number {
  return cycle === 'annual' ? plan.annualTotal : plan.monthlyPrice;
}

/**
 * Calculates annual savings when choosing annual billing over 12 months of monthly billing.
 */
export function calculateAnnualSavings(plan: MembershipPlan): number {
  return plan.annualSavings;
}

/**
 * Formats a numeric value into INR currency string (e.g. ₹1,999).
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
