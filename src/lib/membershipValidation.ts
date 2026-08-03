import { FieldErrors, MemberFormData } from '../types/membership';

/**
 * Normalizes Indian phone input into a standard 10-digit string.
 */
export function normalizeIndianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

/**
 * Validates whether the given phone string matches a standard 10-digit Indian mobile number.
 */
export function isValidIndianPhone(phone: string): boolean {
  const normalized = normalizeIndianPhone(phone);
  return normalized.length === 10 && /^[6-9]\d{9}$/.test(normalized);
}

/**
 * Validates Step 1 selection.
 */
export function validateStep1(): FieldErrors {
  return {};
}

/**
 * Validates Step 2 Member Information.
 */
export function validateStep2(formData: MemberFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidIndianPhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/\d/.test(formData.password)) {
    errors.password = 'Password must contain at least one number';
  }

  return errors;
}

/**
 * Validates Step 3 Terms and Declarations.
 */
export function validateStep3(termsAccepted: boolean): FieldErrors {
  const errors: FieldErrors = {};

  if (!termsAccepted) {
    errors.termsAccepted = 'You must agree to the membership terms, health declaration, and privacy policy to continue.';
  }

  return errors;
}
