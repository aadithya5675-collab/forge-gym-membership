import { describe, expect, it } from 'vitest';
import { PLANS } from '../data/membershipPlans';
import {
  calculateAnnualSavings,
  calculateBilledAmount,
  calculateMonthlyRate,
  formatCurrency,
} from './membershipPricing';

describe('membershipPricing', () => {
  const performancePlan = PLANS.find((p) => p.id === 'performance')!;

  it('calculates monthly rate correctly for annual vs monthly billing', () => {
    expect(calculateMonthlyRate(performancePlan, 'annual')).toBe(1999);
    expect(calculateMonthlyRate(performancePlan, 'monthly')).toBe(2499);
  });

  it('calculates total billed amount correctly', () => {
    expect(calculateBilledAmount(performancePlan, 'annual')).toBe(23988);
    expect(calculateBilledAmount(performancePlan, 'monthly')).toBe(2499);
  });

  it('calculates annual savings accurately', () => {
    expect(calculateAnnualSavings(performancePlan)).toBe(6000);
  });

  it('formats currency with INR formatting', () => {
    expect(formatCurrency(1999)).toBe('₹1,999');
    expect(formatCurrency(23988)).toBe('₹23,988');
  });
});
