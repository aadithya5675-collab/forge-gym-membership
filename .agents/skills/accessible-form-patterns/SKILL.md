---
name: accessible-form-patterns
description: Standardized accessibility patterns for React form components, input validation, aria attributes, focus management, modal dialogs, and keyboard accessibility.
---

# Accessible Form Patterns Skill

This skill provides mandatory patterns for building WCAG AA compliant forms and modal dialogs.

## Form Control Rules

1. **Explicit Label Association**:
   - Every input MUST have a matching `<label htmlFor={id}>`.
   - Never rely exclusively on placeholders for labeling.

2. **Error & Helper Announcements**:
   - Inputs with errors must include `aria-invalid="true"`.
   - Connect error messages using `aria-describedby={`${id}-error`}`.
   - Render error messages inside `<p id={`${id}-error`} role="alert">`.

3. **Radio Groups**:
   - Wrap related radio inputs inside `<fieldset>` with `<legend>` or `<legend className="sr-only">`.

4. **Focus Management**:
   - On step transitions or failed form submission, programmatically shift focus to the step heading or first invalid input via `ref.current?.focus()`.

5. **Modal Dialogs**:
   - Set `role="dialog"` and `aria-modal="true"`.
   - Implement focus trap (Tab key cycling within focusable elements).
   - Close modal on `Escape` key press.
   - Lock `document.body.style.overflow = 'hidden'` while modal is active.
   - Restore focus to the trigger element upon modal close.
