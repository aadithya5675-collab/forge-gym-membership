import { describe, expect, it } from 'vitest';
import {
  isValidIndianPhone,
  normalizeIndianPhone,
  validateStep2,
  validateStep3,
} from './membershipValidation';

describe('membershipValidation', () => {
  it('normalizes Indian phone numbers correctly', () => {
    expect(normalizeIndianPhone('9876543210')).toBe('9876543210');
    expect(normalizeIndianPhone('+91 98765 43210')).toBe('9876543210');
    expect(normalizeIndianPhone('09876543210')).toBe('9876543210');
  });

  it('validates 10-digit Indian phone numbers', () => {
    expect(isValidIndianPhone('9876543210')).toBe(true);
    expect(isValidIndianPhone('8765432109')).toBe(true);
    expect(isValidIndianPhone('1234567890')).toBe(false); // Invalid prefix
    expect(isValidIndianPhone('98765')).toBe(false); // Too short
  });

  it('validates Step 2 profile fields', () => {
    const validData = {
      firstName: 'Aadithya',
      lastName: 'Vikram',
      email: 'aadithya@example.com',
      phone: '9876543210',
      password: 'Password123',
    };
    expect(validateStep2(validData)).toEqual({});

    const invalidData = {
      firstName: '',
      lastName: 'Vikram',
      email: 'invalid-email',
      phone: '123',
      password: 'short',
    };
    const errors = validateStep2(invalidData);
    expect(errors.firstName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.password).toBeDefined();
  });

  it('validates Step 3 terms acceptance', () => {
    expect(validateStep3(true)).toEqual({});
    expect(validateStep3(false).termsAccepted).toBeDefined();
  });
});
