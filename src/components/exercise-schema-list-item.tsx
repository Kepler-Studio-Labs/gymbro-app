import { TExercise } from "@/actions/workout-action";
import { Badge } from "./ui/badge";

export function ExerciseSchemaListItem({ exercise }: { exercise: TExercise }) {
  return (
    <div className="p-4 rounded-lg border space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg">{exercise.name}</h3>
          <div className="flex gap-2 mt-1">
            <Badge variant={"secondary"}>{exercise.muscleGroup}</Badge>
            <Badge variant={"outline"}>{exercise.equipment}</Badge>
          </div>
        </div>
        <Badge>{exercise.sets.length} series</Badge>
      </div>
      {exercise.description && (
        <p className="text-sm">{exercise.description}</p>
      )}
      {exercise.sets.map((set, index) => (
        <div
          key={set.id}
          className="flex items-center justify-between p-2 bg-accent text-accent-foreground"
        >
          <div className="flex items-center gap-2">
            <p className="font-medium">Serie {index + 1}</p>
            <span className="font-medium text-muted">
              {set.minReps}-{set.maxReps} reps
            </span>
          </div>
          <div className="flex items-center gap-2">
            {set.degressive && (
              <Badge>
                Charge degressive :{" "}
                {set.degressiveType === "Pourcentage" && (
                  <>{set.degressivePercentage} %</>
                )}
              </Badge>
            )}
            {set.dropSet && <Badge>DropSet : {set.dropSetStages}</Badge>}
          </div>
        </div>
      ))}
    </div>
  );
}
