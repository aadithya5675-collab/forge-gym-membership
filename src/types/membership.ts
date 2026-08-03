export type BillingCycle = 'monthly' | 'annual';

export type PlanId = 'essential' | 'performance' | 'elite';

export type GoalId = 'build-muscle' | 'lose-fat' | 'improve-strength' | 'general-fitness';

export type StepNumber = 1 | 2 | 3;

export interface MembershipPlan {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  annualPrice: number; // Monthly equivalent when billed annually
  annualTotal: number; // Actual total charged upfront annually
  annualSavings: number; // Annual savings compared to 12 months of monthly plan
  shortDesc: string;
  isRecommended?: boolean;
  benefits: string[];
}

export interface GoalOption {
  id: GoalId;
  label: string;
}

export interface MemberFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export type FieldErrors = Partial<Record<keyof MemberFormData | 'termsAccepted', string>>;

export type PolicyModalType = 'terms' | 'health' | 'privacy' | null;

export interface MembershipState {
  currentStep: StepNumber;
  direction: 'forward' | 'backward';
  billingCycle: BillingCycle;
  selectedPlanId: PlanId;
  selectedGoalId: GoalId;
  formData: MemberFormData;
  touchedFields: Record<string, boolean>;
  errors: FieldErrors;
  termsAccepted: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  activePolicyModal: PolicyModalType;
  submitError?: string | null;
}

export type MembershipAction =
  | { type: 'SET_STEP'; payload: { step: StepNumber; direction?: 'forward' | 'backward' } }
  | { type: 'SET_BILLING_CYCLE'; payload: BillingCycle }
  | { type: 'SET_PLAN'; payload: PlanId }
  | { type: 'SET_GOAL'; payload: GoalId }
  | { type: 'SET_FORM_FIELD'; payload: { field: keyof MemberFormData; value: string } }
  | { type: 'BLUR_FORM_FIELD'; payload: keyof MemberFormData }
  | { type: 'SET_ERRORS'; payload: FieldErrors }
  | { type: 'TOGGLE_TERMS'; payload?: boolean }
  | { type: 'START_SUBMIT' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: string }
  | { type: 'SET_POLICY_MODAL'; payload: PolicyModalType }
  | { type: 'RESET' };
