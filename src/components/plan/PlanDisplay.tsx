import { DaySchedule, Exercise } from "../../types";
import React from "react";
import { Card } from "../ui/Card";
import { Dumbbell, Info } from "lucide-react";

function ExerciseRow({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  return (
    <tr className="border-b border-(--color-border) last:border-0">
      <td className="py-3 pr-4">
        <div className="flex items-start gap-3">
          <span className="text-xs text-(--color-muted) w-5 pl-3">{index + 1}.</span>
          <div>
            <p className="font-medium ">{exercise.name}</p>
            {exercise.notes && (
              <p className="text-xs text-(--color-muted) mt-0.5 flex items-center gap-1">
                <Info className="w-3 h-3" />
                {exercise.notes}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="py-3 px-4 text-center whitespace-nowrap">
        <span className="text-[var(--color-accent) font-medium">
          {exercise.sets}
        </span>
        <span className="text-(--color-muted)"> x </span>
        <span>{exercise.reps}</span>
      </td>

      <td className="py-3 px-4 text-center">
        <span className="text-(--color-muted)">{exercise.rest}</span>
      </td>
      <td className="py-3 px-4 text-center">
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium 
            ${
              exercise.rpe >= 8
                ? `bg-red-500/10 text-red-400`
                : exercise.rpe >= 7
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-green-500/10 text-green-400"
            }`}
        >
          {exercise.rpe}
        </span>
      </td>
    </tr>
  );
}

function DayCard({ schedule }: { schedule: DaySchedule }) {
  return (
    <Card className="border overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg pl-5">{schedule.day}</h3>
          <p className="text-sm text-(--color-accent) pl-5">{schedule.focus}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-(--color-muted)">
          <Dumbbell className="w-4 h-4 " />
          {/* Added optional chaining and fallback for safety */}
          <span className="pr-5">{schedule.exercises?.length || 0} exercises</span>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-(--color-muted) text-xs uppercase tracking-wider">
              <th className="text-left py-2 pr-4 font-medium p-5">Excercise</th>
              <th className="py-2 px-4 font-medium">Sets x Reps</th>
              <th className="py-2 px-4 font-medium">Rest</th>
              <th className="py-2 px-4 font-medium">RPE</th>
            </tr>
          </thead>

          <tbody>
            {/* Added optional chaining to prevent mapping crashes */}
            {schedule.exercises?.map((exercise, index) => (
              <ExerciseRow key={index} exercise={exercise} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

interface PlanDisplayProps {
  weeklySchedule: DaySchedule[];
}

const PlanDisplay = ({ weeklySchedule }: PlanDisplayProps) => {
  return (
    <div className="space-y-6 mb-8  ">
      {/* Added optional chaining here as well */}
      {weeklySchedule?.map((schedule) => (
        <DayCard 
          key={schedule.day}
          schedule={schedule}
        />
      ))}
    </div>
  );
};

export default PlanDisplay;