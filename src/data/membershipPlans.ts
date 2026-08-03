import { GoalOption, MembershipPlan } from '../types/membership';

export const PLANS: MembershipPlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    monthlyPrice: 1499,
    annualPrice: 1199,
    annualTotal: 14388,
    annualSavings: 3600,
    shortDesc: 'Open-gym & locker access for focused daily training',
    benefits: [
      'Open-gym access during operational hours',
      'Personal locker and premium showers',
      'FORGE workout-tracking access',
      'Initial equipment orientation',
    ],
  },
  {
    id: 'performance',
    name: 'Performance',
    monthlyPrice: 2499,
    annualPrice: 1999,
    annualTotal: 23988,
    annualSavings: 6000,
    shortDesc: 'Unlimited access, group strength & recovery zone',
    isRecommended: true,
    benefits: [
      'Unlimited access from 05:00–23:00',
      'Group strength and conditioning classes',
      'Monthly fitness assessment',
      'Locker and towel service',
      'Recovery-zone access',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 4499,
    annualPrice: 3599,
    annualTotal: 43188,
    annualSavings: 10800,
    shortDesc: 'Complete coaching, 1-on-1 PT sessions & nutrition',
    benefits: [
      'Everything in Performance',
      'Four personal-training sessions per month',
      'Priority class and recovery booking',
      'Personalized nutrition and biomechanics plan',
      'Two monthly guest passes',
    ],
  },
];

export const GOAL_OPTIONS: GoalOption[] = [
  { id: 'build-muscle', label: 'Build muscle' },
  { id: 'lose-fat', label: 'Lose fat' },
  { id: 'improve-strength', label: 'Improve strength' },
  { id: 'general-fitness', label: 'General fitness' },
];

export const STEP_METADATA = [
  {
    number: 1 as const,
    eyebrow: 'STEP 01 / MEMBERSHIP',
    title: 'Choose how you want to train',
    subtitle: 'Select a membership that matches your training style. You can review everything before submitting.',
    heroText: 'Select a membership plan tailored to your strength & athletic goals.',
  },
  {
    number: 2 as const,
    eyebrow: 'STEP 02 / PROFILE',
    title: 'Tell us what you’re training for',
    subtitle: 'A few details help us prepare the right starting experience for you.',
    heroText: 'Help our coaching team structure your initial assessment.',
  },
  {
    number: 3 as const,
    eyebrow: 'STEP 03 / REVIEW',
    title: 'Review your membership',
    subtitle: 'Check your plan and personal details before submitting your application.',
    heroText: 'Confirm your application parameters before joining FORGE.',
  },
];
