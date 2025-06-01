import { TWorkout } from "@/actions/workout-action";
import { Badge } from "./ui/badge";

export function WorkoutSchemaListItem({ workout }: { workout: TWorkout }) {
  return (
    <div className="p-4 rounded-lg border space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg">{workout.name}</h3>
        </div>
        <Badge>{workout.exerciseSchemas.length} exercices</Badge>
      </div>

      {workout.exerciseSchemas.map((exerciseRelation) => {
        const exercise = exerciseRelation.exerciseSchema;
        return (
          <div key={exerciseRelation.id} className="mt-2">
            <h4 className="font-medium">{exercise.name}</h4>
            {exercise.description && (
              <p className="text-sm">{exercise.description}</p>
            )}
            {exercise.sets.map((set, index) => (
              <div
                key={set.id}
                className="flex items-center justify-between p-2 bg-accent text-accent-foreground mt-1"
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
      })}
    </div>
  );
}
