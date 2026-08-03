import React from 'react';
import { Check } from 'lucide-react';
import { STEP_METADATA } from '../../data/membershipPlans';
import { StepNumber } from '../../types/membership';

interface StepIndicatorProps {
  currentStep: StepNumber;
  onSelectStep?: (step: StepNumber) => void;
  className?: string;
}

export function StepIndicator({ currentStep, onSelectStep, className = '' }: StepIndicatorProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Step Header (< lg) */}
      <div className="lg:hidden space-y-3 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-widest text-[#A1A69A]">
            FORGE MEMBERSHIP
          </span>
          <span className="font-bold tracking-wider text-[#C7FF3D] uppercase bg-[#C7FF3D]/10 px-2.5 py-0.5 rounded-full border border-[#C7FF3D]/30">
            STEP {currentStep} OF 3
          </span>
        </div>

        {/* Mobile 3-Segment Progress Bar */}
        <div className="grid grid-cols-3 gap-1.5" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3}>
          {[1, 2, 3].map((stepNum) => (
            <div
              key={stepNum}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                stepNum <= currentStep ? 'bg-[#C7FF3D]' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Step Indicator (>= lg) */}
      <nav aria-label="Enrollment Steps" className="hidden lg:block">
        <ol className="flex items-center justify-between gap-3">
          {STEP_METADATA.map((step) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;
            const isClickable = isCompleted && onSelectStep;

            return (
              <li key={step.number} className="flex-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => isClickable && onSelectStep(step.number as StepNumber)}
                  disabled={!isClickable && !isActive}
                  aria-current={isActive ? 'step' : undefined}
                  className={`flex items-center gap-2.5 text-left transition-colors focus:outline-none ${
                    isClickable ? 'cursor-pointer group' : 'cursor-default'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#C7FF3D] text-[#070806] ring-4 ring-[#C7FF3D]/20 shadow-md'
                        : isCompleted
                        ? 'bg-white/20 text-[#F3F5ED] group-hover:bg-[#C7FF3D] group-hover:text-[#070806]'
                        : 'bg-white/10 text-[#747A70]'
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : step.number}
                  </div>

                  <div className="hidden xl:block">
                    <span
                      className={`block text-xs font-bold uppercase tracking-wider ${
                        isActive
                          ? 'text-[#F3F5ED]'
                          : isCompleted
                          ? 'text-[#A1A69A] group-hover:text-[#F3F5ED]'
                          : 'text-[#747A70]'
                      }`}
                    >
                      {step.number}. {step.number === 1 ? 'Plan' : step.number === 2 ? 'Profile' : 'Review'}
                    </span>
                  </div>
                </button>

                {step.number < 3 && (
                  <div
                    className={`h-0.5 flex-1 rounded transition-colors ${
                      step.number < currentStep ? 'bg-[#C7FF3D]' : 'bg-white/10'
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
