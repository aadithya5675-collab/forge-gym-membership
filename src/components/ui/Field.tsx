import React, { forwardRef } from 'react';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  prefixText?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      id,
      label,
      type = 'text',
      value,
      onChange,
      onBlur,
      placeholder,
      error,
      helperText,
      required,
      autoComplete,
      icon,
      rightElement,
      prefixText,
      className = '',
      ...rest
    },
    ref
  ) => {
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <div className="space-y-1.5 text-left w-full">
        <label htmlFor={id} className="block text-xs font-medium text-[#F3F5ED]/90">
          {label} {required && <span className="text-[#C7FF3D]">*</span>}
        </label>

        <div className="relative flex items-center">
          {icon && <div className="absolute left-3.5 pointer-events-none text-[#A1A69A]">{icon}</div>}

          {prefixText && (
            <span className="absolute left-3.5 font-semibold text-xs text-[#A1A69A] select-none pointer-events-none">
              {prefixText}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`h-12 w-full rounded-xl border bg-[#111310] px-3.5 text-sm text-[#F3F5ED] placeholder-[#747A70] transition-all focus:outline-none ${
              icon ? 'pl-10' : prefixText ? 'pl-12' : ''
            } ${rightElement ? 'pr-10' : ''} ${
              error
                ? 'border-[#FF6B63] focus:border-[#FF6B63] focus:ring-1 focus:ring-[#FF6B63]'
                : 'border-white/10 focus:border-[#C7FF3D] focus:ring-1 focus:ring-[#C7FF3D]'
            } ${className}`}
            {...rest}
          />

          {rightElement && (
            <div className="absolute right-3.5 flex items-center">{rightElement}</div>
          )}
        </div>

        {helperText && !error && (
          <p id={helperId} className="text-[11px] text-[#A1A69A]">
            {helperText}
          </p>
        )}

        {error && (
          <p id={errorId} role="alert" className="text-xs font-medium text-[#FF6B63]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Field.displayName = 'Field';
