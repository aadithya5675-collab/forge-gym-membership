import { useState } from 'react';
import { Award, Check, Mail, Sparkles, Trophy } from 'lucide-react';
import { PageView } from '../../types/navigation';

interface TrainersPageProps {
  onNavigate: (view: PageView) => void;
}

interface Coach {
  id: string;
  name: string;
  title: string;
  certs: string[];
  image: string;
  bio: string;
  specialties: string[];
}

const COACHES: Coach[] = [
  {
    id: '1',
    name: 'Vikram Ramaswamy',
    title: 'Head of Strength & Biomechanics',
    certs: ['CSCS (NSCA)', 'EXOS Performance Specialist', 'USAW Level 2'],
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    bio: 'Over 10 years experience coaching competitive powerlifters and collegiate athletes in velocity-based training.',
    specialties: ['Powerlifting Biomechanics', 'Velocity-Based Training', 'Hypertrophy Periodization'],
  },
  {
    id: '2',
    name: 'Arjun Nambiar',
    title: 'Senior Performance Coach',
    certs: ['CSCS (NSCA)', 'FMS Certified', 'Precision Nutrition L2'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bio: 'Specializes in structural balance, joint longevity, and max-effort deadlift mechanics.',
    specialties: ['Max-Effort Deadlifts', 'Structural Mobility', 'Macro Nutrition'],
  },
  {
    id: '3',
    name: 'Priya Sundaram',
    title: 'Metabolic & Recovery Director',
    certs: ['B.Sc. Exercise Science', 'FRC Mobility Specialist', 'Contrast Therapy Certified'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Pioneered FORGE’s contrast therapy recovery protocols and high-intensity metabolic conditioning tracks.',
    specialties: ['Contrast Recovery', 'FRC Articular Mobility', 'Conditioning Engine'],
  },
];

export function TrainersPage({ onNavigate }: TrainersPageProps) {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  return (
    <div className="space-y-10 pb-12 select-none">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
          COACHING STAFF
        </span>
        <h1 className="font-display text-4xl font-extrabold uppercase text-[#F3F5ED] sm:text-5xl">
          FORGE Master Coaches
        </h1>
        <p className="text-xs text-[#A1A69A]">
          Our staff holds internationally recognized certifications and brings decades of combined strength experience to Coimbatore.
        </p>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COACHES.map((coach) => (
          <div
            key={coach.id}
            className="group rounded-2xl border border-white/10 bg-[#111310] overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
          >
            <div className="space-y-4">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-transparent" />
              </div>

              <div className="px-5 space-y-2">
                <span className="text-[10px] font-extrabold text-[#C7FF3D] uppercase tracking-wider block">
                  {coach.title}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#F3F5ED]">
                  {coach.name}
                </h3>
                <p className="text-xs text-[#A1A69A] leading-relaxed">
                  {coach.bio}
                </p>

                {/* Specialties */}
                <div className="pt-2 space-y-1.5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#F3F5ED]">
                    Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {coach.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-[#A1A69A]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigate('membership')}
                className="w-full h-11 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-xs uppercase tracking-wider hover:bg-[#A8E65C] transition-colors cursor-pointer"
              >
                Book 1-on-1 Assessment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
