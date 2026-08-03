import { useState } from 'react';
import { Check, Flame, HeartPulse, Sparkles, Trophy } from 'lucide-react';
import { PageView } from '../../types/navigation';

interface FacilitiesPageProps {
  onNavigate: (view: PageView) => void;
}

interface ZoneInfo {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  specs: string[];
}

const ZONES: ZoneInfo[] = [
  {
    id: 'strength',
    title: 'The Strength & Heavy Lifting Floor',
    subtitle: 'Calibrated Biomechanical Loading',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed specifically for powerlifters, bodybuilders, and strength athletes. Features zero-wobble power racks and precision plate loading.',
    specs: [
      '8 Eleiko Competition Power Racks with integrated wooden platforms',
      'Calibrated Eleiko IPFR steel discs & IWF weightlifting bumpers',
      'Dumbbell rack spanning 2.5kg to 70kg in 2.5kg increments',
      'Plate-loaded Hammer Strength ISO-Lateral chest, back & leg machines',
      'Specialty bars: Safety Squat Bar, Trap Bar, Swiss Bar, Buffalo Bar',
    ],
  },
  {
    id: 'recovery',
    title: 'Contrast Recovery & Wellness Suite',
    subtitle: 'Active Metabolic Repair',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
    description: 'Systematic contrast therapy designed to flush metabolic waste, decrease central nervous system fatigue, and accelerate muscle recovery.',
    specs: [
      'Dual 3°C filtered cold plunge tubs with continuous ozone purification',
      'Custom 90°C Finnish cedar wood dry sauna',
      'NormaTec 3 compression boot therapy lounge',
      'Full-body red light & infrared therapy pods',
    ],
  },
  {
    id: 'turf',
    title: 'Athletic Conditioning & Turf Arena',
    subtitle: 'Work Capacity & Speed',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    description: 'High-friction indoor turf dedicated to sled pushes, sprints, plyometrics, and high-capacity conditioning circuits.',
    specs: [
      '25-meter indoor sprint turf with yard markers',
      'Rogue Dog Sleds & Torque Fitness Tank sleds',
      'Concept2 RowErgs, SkiErgs, and BikeErgs',
      'Rogue Echo Bikes for anaerobic conditioning',
    ],
  },
  {
    id: 'lab',
    title: 'Biomechanics & InBody Diagnostic Lab',
    subtitle: 'Data-Driven Progress',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    description: 'Quantitative body composition tracking and movement assessments to eliminate guessing from your training program.',
    specs: [
      'InBody 570 3D segmental body composition analyzer',
      'FMS (Functional Movement Screen) assessment station',
      'Hydration & electrolyte monitoring',
      'Private nutrition & macro programming consultation rooms',
    ],
  },
];

export function FacilitiesPage({ onNavigate }: FacilitiesPageProps) {
  const [activeZoneId, setActiveZoneId] = useState<string>('strength');
  const activeZone = ZONES.find((z) => z.id === activeZoneId) || ZONES[0];

  return (
    <div className="space-y-12 pb-12 select-none">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
          COIMBATORE ARENAS
        </span>
        <h1 className="font-display text-4xl font-extrabold uppercase text-[#F3F5ED] sm:text-5xl">
          FORGE Facility Tour
        </h1>
        <p className="text-xs text-[#A1A69A]">
          Explore our dedicated training zones engineered for raw strength, metabolic capacity, and biological recovery.
        </p>
      </div>

      {/* Zone Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {ZONES.map((zone) => {
          const isActive = zone.id === activeZoneId;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActiveZoneId(zone.id)}
              className={`px-4 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? 'bg-[#C7FF3D] text-[#070806] shadow-md'
                  : 'border border-white/10 bg-[#111310] text-[#A1A69A] hover:text-[#F3F5ED] hover:border-white/20'
              }`}
            >
              {zone.title.split('&')[0]}
            </button>
          );
        })}
      </div>

      {/* Active Zone Detail Card */}
      <div className="rounded-3xl border border-white/10 bg-[#111310] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Zone Image */}
          <div className="h-72 lg:h-auto min-h-[320px] relative">
            <img
              src={activeZone.image}
              alt={activeZone.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111310]" />
          </div>

          {/* Zone Details */}
          <div className="p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold text-[#C7FF3D] uppercase tracking-widest">
                {activeZone.subtitle}
              </span>
              <h2 className="font-display text-3xl font-extrabold uppercase text-[#F3F5ED]">
                {activeZone.title}
              </h2>
              <p className="text-xs text-[#A1A69A] leading-relaxed">
                {activeZone.description}
              </p>

              {/* Equipment & Specs List */}
              <div className="space-y-2 pt-3">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#F3F5ED]">
                  Equipment & Features:
                </span>
                <ul className="space-y-2 text-xs text-[#F3F5ED]/90">
                  {activeZone.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#C7FF3D] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => onNavigate('membership')}
                className="w-full h-12 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-xs uppercase tracking-wider hover:bg-[#A8E65C] transition-colors cursor-pointer"
              >
                Access This Facility — Join FORGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
