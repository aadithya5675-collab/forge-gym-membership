import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'error' | 'info' | 'success';
  onClose?: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Toast({ message, type = 'error', onClose }: ToastProps) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease }}
        className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-xs font-medium shadow-lg ${
          type === 'error'
            ? 'border-[#FF6B63]/40 bg-[#FF6B63]/10 text-[#FF6B63]'
            : type === 'success'
            ? 'border-[#A8E65C]/40 bg-[#A8E65C]/10 text-[#A8E65C]'
            : 'border-[#C7FF3D]/40 bg-[#C7FF3D]/10 text-[#C7FF3D]'
        }`}
      >
        <div className="flex items-center gap-2">
          {type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{message}</span>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs underline hover:no-underline font-semibold"
          >
            Dismiss
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
