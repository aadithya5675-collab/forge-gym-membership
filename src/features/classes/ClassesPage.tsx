import { useState } from 'react';
import { Clock, Flame, Users, Zap } from 'lucide-react';
import { PageView } from '../../types/navigation';

interface ClassesPageProps {
  onNavigate: (view: PageView) => void;
}

interface GroupClass {
  id: string;
  name: string;
  category: 'strength' | 'conditioning' | 'mobility';
  day: string;
  time: string;
  duration: string;
  coach: string;
  intensity: 'High' | 'Maximum' | 'Moderate';
  description: string;
}

const CLASSES: GroupClass[] = [
  {
    id: '1',
    name: 'FORGE Engine: High-Intensity Conditioning',
    category: 'conditioning',
    day: 'Monday',
    time: '06:00 AM & 06:00 PM',
    duration: '50 Mins',
    coach: 'Vikram R.',
    intensity: 'Maximum',
    description: 'Anaerobic interval training combining Concept2 rowers, Echo Bikes, and kettlebell work capacity circuits.',
  },
  {
    id: '2',
    name: 'Barbell Club: Heavy Squat & Bench Mechanics',
    category: 'strength',
    day: 'Tuesday',
    time: '07:00 AM & 06:30 PM',
    duration: '60 Mins',
    coach: 'Arjun N.',
    intensity: 'High',
    description: 'Periodized strength training focused on powerlifting technique, bar speed, and heavy compound overload.',
  },
  {
    id: '3',
    name: 'Joint Mobility & Contrast Recovery',
    category: 'mobility',
    day: 'Wednesday',
    time: '08:00 AM & 05:30 PM',
    duration: '45 Mins',
    coach: 'Priya M.',
    intensity: 'Moderate',
    description: 'Guided CARs (Controlled Articular Rotations), tissue release, followed by sauna & ice bath contrast protocols.',
  },
  {
    id: '4',
    name: 'Hypertrophy Density & Muscle Building',
    category: 'strength',
    day: 'Thursday',
    time: '06:00 AM & 06:00 PM',
    duration: '55 Mins',
    coach: 'Vikram R.',
    intensity: 'High',
    description: 'High-density time-under-tension bodybuilding protocols utilizing Hammer Strength plate-loaded machinery.',
  },
  {
    id: '5',
    name: 'Metabolic Sled & Turf Warfare',
    category: 'conditioning',
    day: 'Friday',
    time: '07:00 AM & 06:30 PM',
    duration: '50 Mins',
    coach: 'Karthik S.',
    intensity: 'Maximum',
    description: 'Heavy sled pushes, sprint intervals, and sandbag carries on the 25m turf track.',
  },
  {
    id: '6',
    name: 'Weekend Strength & Deadlift Clinic',
    category: 'strength',
    day: 'Saturday',
    time: '09:00 AM',
    duration: '75 Mins',
    coach: 'Arjun N.',
    intensity: 'High',
    description: 'Comprehensive deadlift biomechanics, stance analysis, and max-effort strain control.',
  },
];

export function ClassesPage({ onNavigate }: ClassesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredClasses =
    selectedCategory === 'all'
      ? CLASSES
      : CLASSES.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-10 pb-12 select-none">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-extrabold tracking-widest text-[#C7FF3D] uppercase">
          COACH-LED PROGRAMMING
        </span>
        <h1 className="font-display text-4xl font-extrabold uppercase text-[#F3F5ED] sm:text-5xl">
          FORGE Group Classes
        </h1>
        <p className="text-xs text-[#A1A69A]">
          Structured group sessions engineered for strength development, engine capacity, and bulletproof mobility.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex justify-center items-center gap-2">
        {['all', 'strength', 'conditioning', 'mobility'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              selectedCategory === cat
                ? 'bg-[#C7FF3D] text-[#070806]'
                : 'border border-white/10 bg-[#111310] text-[#A1A69A] hover:text-[#F3F5ED]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClasses.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-[#111310] p-6 space-y-4 flex flex-col justify-between hover:border-white/20 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C7FF3D] bg-[#C7FF3D]/10 px-2.5 py-0.5 rounded border border-[#C7FF3D]/30">
                  {item.day} · {item.time}
                </span>

                <div className="flex items-center gap-1 text-xs text-[#A1A69A]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.duration}</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold uppercase text-[#F3F5ED]">
                {item.name}
              </h3>

              <p className="text-xs text-[#A1A69A] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-[#A1A69A] block text-[10px]">Head Coach</span>
                <span className="font-semibold text-[#F3F5ED]">{item.coach}</span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('membership')}
                className="px-4 py-2 rounded-xl bg-[#C7FF3D] text-[#070806] font-extrabold text-xs uppercase tracking-wider hover:bg-[#A8E65C] transition-colors"
              >
                Book Class
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
