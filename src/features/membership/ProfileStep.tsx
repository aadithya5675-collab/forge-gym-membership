import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import { Field } from '../../components/ui/Field';
import { validateStep2 } from '../../lib/membershipValidation';
import { FieldErrors, GoalId, MemberFormData } from '../../types/membership';
import { GoalSelector } from './GoalSelector';

interface ProfileStepProps {
  formData: MemberFormData;
  selectedGoalId: GoalId;
  errors: FieldErrors;
  onChangeField: (field: keyof MemberFormData, value: string) => void;
  onBlurField: (field: keyof MemberFormData) => void;
  onSelectGoal: (id: GoalId) => void;
  onBack: () => void;
  onNext: () => void;
}

export function ProfileStep({
  formData,
  selectedGoalId,
  errors,
  onChangeField,
  onBlurField,
  onSelectGoal,
  onBack,
  onNext,
}: ProfileStepProps) {
  const [showPassword, setShowPassword] = useState(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const step2Errors = validateStep2(formData);

    if (Object.keys(step2Errors).length > 0) {
      if (step2Errors.firstName) firstNameRef.current?.focus();
      else if (step2Errors.lastName) lastNameRef.current?.focus();
      else if (step2Errors.email) emailRef.current?.focus();
      else if (step2Errors.phone) phoneRef.current?.focus();
      else if (step2Errors.password) passwordRef.current?.focus();
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Step Header */}
      <div className="space-y-1">
        <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
          ATHLETE PROFILE
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#F3F5ED] uppercase sm:text-4xl">
          Tell us what you’re training for
        </h2>
        <p className="text-xs text-[#A1A69A]">
          A few details help us prepare the right starting experience for you.
        </p>
      </div>

      {/* Goal Selector */}
      <GoalSelector selectedGoalId={selectedGoalId} onSelect={onSelectGoal} />

      {/* Member Details Input Fields */}
      <div className="space-y-4 pt-2">
        <div className="border-t border-white/10 pt-4 space-y-3">
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#A1A69A]">
            Personal Information
          </span>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field
              ref={firstNameRef}
              id="firstName"
              label="First name"
              type="text"
              value={formData.firstName}
              onChange={(e) => onChangeField('firstName', e.target.value)}
              onBlur={() => onBlurField('firstName')}
              placeholder="e.g. Aadithya"
              error={errors.firstName}
              required
              autoComplete="given-name"
              icon={<User className="h-4 w-4" />}
            />

            <Field
              ref={lastNameRef}
              id="lastName"
              label="Last name"
              type="text"
              value={formData.lastName}
              onChange={(e) => onChangeField('lastName', e.target.value)}
              onBlur={() => onBlurField('lastName')}
              placeholder="e.g. Vikram"
              error={errors.lastName}
              required
              autoComplete="family-name"
            />
          </div>
        </div>

        <Field
          ref={emailRef}
          id="email"
          label="Email address"
          type="email"
          value={formData.email}
          onChange={(e) => onChangeField('email', e.target.value)}
          onBlur={() => onBlurField('email')}
          placeholder="aadithya@example.com"
          error={errors.email}
          required
          autoComplete="email"
          icon={<Mail className="h-4 w-4" />}
        />

        <Field
          ref={phoneRef}
          id="phone"
          label="Mobile number"
          type="tel"
          value={formData.phone}
          onChange={(e) => onChangeField('phone', e.target.value)}
          onBlur={() => onBlurField('phone')}
          placeholder="98765 43210"
          prefixText="+91"
          error={errors.phone}
          required
          autoComplete="tel-national"
          icon={<Phone className="h-4 w-4" />}
        />

        <Field
          ref={passwordRef}
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => onChangeField('password', e.target.value)}
          onBlur={() => onBlurField('password')}
          placeholder="••••••••••••"
          error={errors.password}
          required
          autoComplete="new-password"
          helperText="Use at least 8 characters with one number."
          icon={<Lock className="h-4 w-4" />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#A1A69A] hover:text-[#F3F5ED] transition-colors focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
      </div>

      {/* Navigation Controls (Desktop) */}
      <div className="pt-2 hidden lg:flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex h-13 px-6 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-[#F3F5ED] font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          className="group flex-1 flex h-13 items-center justify-center gap-2 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-sm uppercase tracking-wider transition-all hover:bg-[#A8E65C] shadow-lg shadow-[#C7FF3D]/10 cursor-pointer"
        >
          <span>Continue to review</span>
          <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
