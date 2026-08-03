import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Minus, X } from 'lucide-react';
import { PLANS } from '../../data/membershipPlans';

interface ComparisonMatrixDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planId: 'essential' | 'performance' | 'elite') => void;
}

interface FeatureRow {
  category: string;
  name: string;
  essential: boolean | string;
  performance: boolean | string;
  elite: boolean | string;
}

const COMPARISON_FEATURES: FeatureRow[] = [
  {
    category: 'Access & Facilities',
    name: 'Open-Gym Strength Access',
    essential: 'Operational Hours',
    performance: '05:00–23:00 Unlimited',
    elite: '05:00–23:00 Unlimited',
  },
  {
    category: 'Access & Facilities',
    name: 'Personal Locker & Changing Suite',
    essential: true,
    performance: true,
    elite: true,
  },
  {
    category: 'Access & Facilities',
    name: 'Fresh Towel Service',
    essential: false,
    performance: true,
    elite: true,
  },
  {
    category: 'Coaching & Programming',
    name: 'Group Strength & Conditioning Classes',
    essential: false,
    performance: true,
    elite: true,
  },
  {
    category: 'Coaching & Programming',
    name: 'Monthly InBody 3D Fitness Assessment',
    essential: 'Basic Orientation',
    performance: 'Monthly 3D Assessment',
    elite: 'Monthly 3D + Biomechanics',
  },
  {
    category: 'Coaching & Programming',
    name: '1-on-1 Personal Training Sessions',
    essential: false,
    performance: false,
    elite: '4 Sessions / Month',
  },
  {
    category: 'Recovery & Perks',
    name: 'Sauna & Ice Bath Recovery Zone',
    essential: false,
    performance: true,
    elite: true,
  },
  {
    category: 'Recovery & Perks',
    name: 'Priority Booking & Guest Passes',
    essential: false,
    performance: false,
    elite: '2 Passes / Month',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ComparisonMatrixDialog({ isOpen, onClose, onSelectPlan }: ComparisonMatrixDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="matrix-dialog-title"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease }}
          className="relative z-10 w-full max-w-4xl max-h-[88vh] flex flex-col rounded-2xl border border-white/10 bg-[#111310] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-5 bg-[#181B16]">
            <div>
              <span className="text-[10px] font-extrabold text-[#C7FF3D] uppercase tracking-widest block">
                FULL TIER SPECIFICATIONS
              </span>
              <h2 id="matrix-dialog-title" className="font-display text-2xl font-extrabold text-[#F3F5ED] uppercase">
                Membership Feature Comparison
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close feature comparison"
              className="rounded-lg p-2 text-[#A1A69A] hover:bg-white/10 hover:text-[#F3F5ED]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[580px]">
                <thead>
                  <tr className="border-b border-white/10 text-[#F3F5ED]">
                    <th className="py-3 px-3 w-2/5 uppercase tracking-wider text-[11px] text-[#A1A69A]">
                      Feature Privilege
                    </th>
                    {PLANS.map((plan) => (
                      <th key={plan.id} className="py-3 px-3 text-center w-1/5 font-display text-base font-bold uppercase">
                        <span className={plan.isRecommended ? 'text-[#C7FF3D]' : 'text-[#F3F5ED]'}>
                          {plan.name}
                        </span>
                        {plan.isRecommended && (
                          <span className="block text-[9px] text-[#C7FF3D] font-normal uppercase tracking-wide">
                            (Recommended)
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {COMPARISON_FEATURES.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-3 text-[#F3F5ED] font-medium">
                        {row.name}
                      </td>

                      {/* Essential */}
                      <td className="py-3 px-3 text-center text-[#A1A69A]">
                        {typeof row.essential === 'boolean' ? (
                          row.essential ? (
                            <Check className="h-4 w-4 text-[#C7FF3D] mx-auto" />
                          ) : (
                            <Minus className="h-4 w-4 text-white/20 mx-auto" />
                          )
                        ) : (
                          <span className="text-[11px]">{row.essential}</span>
                        )}
                      </td>

                      {/* Performance */}
                      <td className="py-3 px-3 text-center text-[#F3F5ED] font-semibold bg-[#C7FF3D]/5">
                        {typeof row.performance === 'boolean' ? (
                          row.performance ? (
                            <Check className="h-4 w-4 text-[#C7FF3D] mx-auto stroke-[3]" />
                          ) : (
                            <Minus className="h-4 w-4 text-white/20 mx-auto" />
                          )
                        ) : (
                          <span className="text-[11px] text-[#C7FF3D]">{row.performance}</span>
                        )}
                      </td>

                      {/* Elite */}
                      <td className="py-3 px-3 text-center text-[#F3F5ED]">
                        {typeof row.elite === 'boolean' ? (
                          row.elite ? (
                            <Check className="h-4 w-4 text-[#C7FF3D] mx-auto" />
                          ) : (
                            <Minus className="h-4 w-4 text-white/20 mx-auto" />
                          )
                        ) : (
                          <span className="text-[11px] font-semibold text-[#F3F5ED]">{row.elite}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Selection Buttons */}
          <div className="border-t border-white/10 p-4 bg-[#181B16] grid grid-cols-3 gap-3">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => {
                  onSelectPlan(plan.id);
                  onClose();
                }}
                className={`py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                  plan.isRecommended
                    ? 'bg-[#C7FF3D] text-[#070806] hover:bg-[#A8E65C]'
                    : 'border border-white/15 bg-white/5 text-[#F3F5ED] hover:bg-white/10'
                }`}
              >
                Select {plan.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
