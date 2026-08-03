import React, { useReducer, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { HeroPanel } from '../../components/brand/HeroPanel';
import { PolicyDialog } from '../../components/ui/PolicyDialog';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { Toast } from '../../components/ui/Toast';
import { PLANS } from '../../data/membershipPlans';
import { calculateMonthlyRate, formatCurrency } from '../../lib/membershipPricing';
import { validateStep2, validateStep3 } from '../../lib/membershipValidation';
import {
  BillingCycle,
  FieldErrors,
  GoalId,
  MemberFormData,
  MembershipAction,
  MembershipState,
  PlanId,
  PolicyModalType,
  StepNumber,
} from '../../types/membership';
import { PlanStep } from './PlanStep';
import { ProfileStep } from './ProfileStep';
import { ReviewStep } from './ReviewStep';
import { SuccessState } from './SuccessState';

const initialState: MembershipState = {
  currentStep: 1,
  direction: 'forward',
  billingCycle: 'annual',
  selectedPlanId: 'performance',
  selectedGoalId: 'build-muscle',
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  },
  touchedFields: {},
  errors: {},
  termsAccepted: false,
  isSubmitting: false,
  isSubmitted: false,
  activePolicyModal: null,
  submitError: null,
};

function membershipReducer(state: MembershipState, action: MembershipAction): MembershipState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload.step,
        direction: action.payload.direction || 'forward',
        submitError: null,
      };
    case 'SET_BILLING_CYCLE':
      return {
        ...state,
        billingCycle: action.payload,
      };
    case 'SET_PLAN':
      return {
        ...state,
        selectedPlanId: action.payload,
      };
    case 'SET_GOAL':
      return {
        ...state,
        selectedGoalId: action.payload,
      };
    case 'SET_FORM_FIELD': {
      const nextFormData = {
        ...state.formData,
        [action.payload.field]: action.payload.value,
      };
      // Clear error on change if field was touched
      const nextErrors = { ...state.errors };
      if (nextErrors[action.payload.field]) {
        delete nextErrors[action.payload.field];
      }
      return {
        ...state,
        formData: nextFormData,
        errors: nextErrors,
      };
    }
    case 'BLUR_FORM_FIELD': {
      const nextTouched = { ...state.touchedFields, [action.payload]: true };
      // Validate single field on blur if touched
      const currentStep2Errors = validateStep2(state.formData);
      const nextErrors = { ...state.errors };
      if (currentStep2Errors[action.payload]) {
        nextErrors[action.payload] = currentStep2Errors[action.payload];
      } else {
        delete nextErrors[action.payload];
      }
      return {
        ...state,
        touchedFields: nextTouched,
        errors: nextErrors,
      };
    }
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'TOGGLE_TERMS': {
      const value = action.payload !== undefined ? action.payload : !state.termsAccepted;
      const nextErrors = { ...state.errors };
      if (value && nextErrors.termsAccepted) {
        delete nextErrors.termsAccepted;
      }
      return {
        ...state,
        termsAccepted: value,
        errors: nextErrors,
      };
    }
    case 'START_SUBMIT':
      return {
        ...state,
        isSubmitting: true,
        submitError: null,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      };
    case 'SET_POLICY_MODAL':
      return {
        ...state,
        activePolicyModal: action.payload,
      };
    case 'RESET':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

const ease = [0.22, 1, 0.36, 1] as const;

export function MembershipFlow() {
  const [state, dispatch] = useReducer(membershipReducer, initialState);
  const formRegionRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const selectedPlan = PLANS.find((p) => p.id === state.selectedPlanId) || PLANS[1];
  const monthlyRate = calculateMonthlyRate(selectedPlan, state.billingCycle);

  // Scroll & focus helper
  const scrollToFormTop = () => {
    if (formRegionRef.current) {
      formRegionRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      stepHeadingRef.current?.focus();
    }, 100);
  };

  // Step Navigation Handlers
  const handleGoToStep = (step: StepNumber, direction: 'forward' | 'backward' = 'forward') => {
    dispatch({ type: 'SET_STEP', payload: { step, direction } });
    scrollToFormTop();
  };

  const handleNextFromStep1 = () => {
    handleGoToStep(2, 'forward');
  };

  const handleNextFromStep2 = () => {
    const step2Errors = validateStep2(state.formData);
    if (Object.keys(step2Errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: step2Errors });
      return;
    }
    handleGoToStep(3, 'forward');
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const step3Errors = validateStep3(state.termsAccepted);

    if (Object.keys(step3Errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: step3Errors });
      return;
    }

    dispatch({ type: 'START_SUBMIT' });

    // Mock API application submission (delay ~1.1s)
    setTimeout(() => {
      dispatch({ type: 'SUBMIT_SUCCESS' });
      scrollToFormTop();
    }, 1100);
  };

  // Motion variants for direction-aware transitions
  const variants = {
    initial: (dir: 'forward' | 'backward') => ({
      opacity: 0,
      x: dir === 'forward' ? 24 : -24,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: 'forward' | 'backward') => ({
      opacity: 0,
      x: dir === 'forward' ? -24 : 24,
    }),
  };

  return (
    <div className="flex h-full w-full flex-col lg:flex-row lg:gap-6">
      {/* 1. Left Sticky Hero Panel (Desktop >= lg) */}
      <HeroPanel currentStep={state.currentStep} />

      {/* 2. Right Registration Panel */}
      <main
        ref={formRegionRef}
        className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-6 sm:px-8 lg:px-10 xl:px-14 pb-28 lg:pb-8"
      >
        <div className="w-full max-w-xl space-y-6">
          {/* Step Indicator Header */}
          <StepIndicator
            currentStep={state.currentStep}
            onSelectStep={(step) => handleGoToStep(step, step < state.currentStep ? 'backward' : 'forward')}
          />

          {/* Submission Toast Error */}
          {state.submitError && (
            <Toast
              message={state.submitError}
              type="error"
              onClose={() => dispatch({ type: 'SUBMIT_ERROR', payload: '' })}
            />
          )}

          {/* Dynamic Step View Transition */}
          <AnimatePresence mode="wait" custom={state.direction}>
            {state.isSubmitted ? (
              <SuccessState
                key="success"
                plan={selectedPlan}
                billingCycle={state.billingCycle}
                selectedGoalId={state.selectedGoalId}
                formData={state.formData}
                onReset={() => dispatch({ type: 'RESET' })}
              />
            ) : state.currentStep === 1 ? (
              <motion.div
                key="step1"
                custom={state.direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease }}
              >
                <PlanStep
                  billingCycle={state.billingCycle}
                  selectedPlan={selectedPlan}
                  onSelectBilling={(cycle) => dispatch({ type: 'SET_BILLING_CYCLE', payload: cycle })}
                  onSelectPlan={(id) => dispatch({ type: 'SET_PLAN', payload: id })}
                  onNext={handleNextFromStep1}
                />
              </motion.div>
            ) : state.currentStep === 2 ? (
              <motion.div
                key="step2"
                custom={state.direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease }}
              >
                <ProfileStep
                  formData={state.formData}
                  selectedGoalId={state.selectedGoalId}
                  errors={state.errors}
                  onChangeField={(field, value) =>
                    dispatch({ type: 'SET_FORM_FIELD', payload: { field, value } })
                  }
                  onBlurField={(field) => dispatch({ type: 'BLUR_FORM_FIELD', payload: field })}
                  onSelectGoal={(id) => dispatch({ type: 'SET_GOAL', payload: id })}
                  onBack={() => handleGoToStep(1, 'backward')}
                  onNext={handleNextFromStep2}
                />
              </motion.div>
            ) : (
              <motion.div
                key="step3"
                custom={state.direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease }}
              >
                <ReviewStep
                  plan={selectedPlan}
                  billingCycle={state.billingCycle}
                  selectedGoalId={state.selectedGoalId}
                  formData={state.formData}
                  termsAccepted={state.termsAccepted}
                  errors={state.errors}
                  isSubmitting={state.isSubmitting}
                  onToggleTerms={(accepted) => dispatch({ type: 'TOGGLE_TERMS', payload: accepted })}
                  onOpenPolicy={(type) => dispatch({ type: 'SET_POLICY_MODAL', payload: type })}
                  onEditStep={(step) => handleGoToStep(step, 'backward')}
                  onBack={() => handleGoToStep(2, 'backward')}
                  onSubmit={handleSubmitApplication}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 3. Mobile Sticky Bottom Action Bar (< lg) */}
      {!state.isSubmitted && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111310]/95 backdrop-blur-md border-t border-white/10 p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A69A] block">
              {selectedPlan.name} · {state.billingCycle}
            </span>
            <span className="font-display text-lg font-extrabold text-[#C7FF3D]">
              {formatCurrency(monthlyRate)}
              <span className="text-xs font-normal text-[#A1A69A]">/mo</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {state.currentStep > 1 && (
              <button
                type="button"
                onClick={() => handleGoToStep((state.currentStep - 1) as StepNumber, 'backward')}
                className="flex h-11 px-3.5 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#F3F5ED] text-xs font-bold uppercase"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}

            {state.currentStep === 1 && (
              <button
                type="button"
                onClick={handleNextFromStep1}
                className="flex h-11 px-5 items-center justify-center gap-1.5 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-xs uppercase tracking-wider shadow-lg"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            {state.currentStep === 2 && (
              <button
                type="button"
                onClick={handleNextFromStep2}
                className="flex h-11 px-5 items-center justify-center gap-1.5 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-xs uppercase tracking-wider shadow-lg"
              >
                <span>Review</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            {state.currentStep === 3 && (
              <button
                type="button"
                onClick={handleSubmitApplication}
                disabled={state.isSubmitting}
                className="flex h-11 px-5 items-center justify-center gap-1.5 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-xs uppercase tracking-wider shadow-lg disabled:opacity-70"
              >
                {state.isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Policy Dialog Modal */}
      <PolicyDialog
        type={state.activePolicyModal}
        onClose={() => dispatch({ type: 'SET_POLICY_MODAL', payload: null })}
      />
    </div>
  );
}
