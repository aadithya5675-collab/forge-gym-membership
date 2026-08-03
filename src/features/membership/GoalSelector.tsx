import { GOAL_OPTIONS } from '../../data/membershipPlans';
import { GoalId } from '../../types/membership';

interface GoalSelectorProps {
  selectedGoalId: GoalId;
  onSelect: (id: GoalId) => void;
}

export function GoalSelector({ selectedGoalId, onSelect }: GoalSelectorProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="block text-xs font-medium tracking-wide text-[#F3F5ED]/90">
        What is your primary goal?
      </legend>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {GOAL_OPTIONS.map((goal) => {
          const isSelected = selectedGoalId === goal.id;
          return (
            <label
              key={goal.id}
              htmlFor={`goal-${goal.id}`}
              className={`flex h-11 items-center justify-center rounded-xl border px-3 text-xs font-medium cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#C7FF3D] ${
                isSelected
                  ? 'border-[#C7FF3D] bg-[#C7FF3D]/10 text-[#C7FF3D] font-semibold ring-1 ring-[#C7FF3D]'
                  : 'border-white/10 bg-[#111310] text-[#A1A69A] hover:border-white/20 hover:text-[#F3F5ED]'
              }`}
            >
              <input
                type="radio"
                id={`goal-${goal.id}`}
                name="fitnessGoal"
                value={goal.id}
                checked={isSelected}
                onChange={() => onSelect(goal.id)}
                className="sr-only"
              />
              <span>{goal.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
