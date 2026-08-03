import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PolicyModalType } from '../../types/membership';

interface PolicyDialogProps {
  type: PolicyModalType;
  onClose: () => void;
}

const POLICY_TITLES: Record<NonNullable<PolicyModalType>, string> = {
  terms: 'Membership Terms & Conditions',
  health: 'Health Declaration & Fitness Clearance',
  privacy: 'Privacy Policy & Data Handling',
};

const ease = [0.22, 1, 0.36, 1] as const;

export function PolicyDialog({ type, onClose }: PolicyDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (type) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus close button on mount
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }

        // Focus trap
        if (e.key === 'Tab' && dialogRef.current) {
          const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      };
    }
  }, [type, onClose]);

  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        {/* Backdrop click target */}
        <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-dialog-title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease }}
          className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#111310] p-6 text-left shadow-2xl space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 id="policy-dialog-title" className="font-display text-xl font-bold text-[#F3F5ED] uppercase">
              {POLICY_TITLES[type]}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-lg p-1.5 text-[#A1A69A] hover:bg-white/10 hover:text-[#F3F5ED] focus:outline-none focus:ring-2 focus:ring-[#C7FF3D]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Dialog Content Body */}
          <div className="space-y-3 text-xs leading-relaxed text-[#A1A69A] max-h-72 overflow-y-auto pr-2">
            {type === 'terms' && (
              <>
                <p>
                  <strong>1. Operational Hours & Access:</strong> Membership grants access to FORGE Performance Club
                  facilities during designated club operational hours (05:00 to 23:00 daily).
                </p>
                <p>
                  <strong>2. Club Etiquette & Safety:</strong> Members agree to follow all safety guidelines, wear appropriate
                  athletic footwear, and re-rack all free weights and attachments after use.
                </p>
                <p>
                  <strong>3. Billing & Cancellation:</strong> Membership subscriptions auto-renew. Annual memberships are billed upfront for the full annual period. Renewal preferences may be managed anytime prior to the next billing date.
                </p>
              </>
            )}

            {type === 'health' && (
              <>
                <p>
                  <strong>1. Physical Fitness Confirmation:</strong> By submitting this application, you declare that you are in good physical health and have no undisclosed medical conditions preventing high-intensity strength training.
                </p>
                <p>
                  <strong>2. Safety Protocol:</strong> If you experience dizziness, nausea, chest tightness, or joint pain during training, you must stop immediately and inform club staff.
                </p>
              </>
            )}

            {type === 'privacy' && (
              <>
                <p>
                  <strong>1. Data Handling:</strong> FORGE Performance Club collects registration details solely to process membership applications and customize training assessments.
                </p>
                <p>
                  <strong>2. Third-Party Sharing:</strong> Your personal information, contact details, and fitness goals will never be sold, rented, or distributed to third parties.
                </p>
              </>
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-[#C7FF3D] py-2.5 text-xs font-bold uppercase tracking-wider text-[#070806] hover:bg-[#A8E65C] transition-colors"
            >
              Close & Understand
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
