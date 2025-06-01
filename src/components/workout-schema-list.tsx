import { TWorkout } from "@/actions/workout-action";
import { WorkoutSchemaListItem } from "./workout-schema-list-item";

export function WorkoutSchemaList({ workouts }: { workouts: TWorkout[] }) {
  return (
    <>
      {workouts.length === 0 && (
        <div>
          <p className="text-xl text-muted-foreground">
            Aucun exercice pour le moment.
          </p>
        </div>
      )}
      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
        {workouts.map((workout) => (
          <WorkoutSchemaListItem key={workout.id} workout={workout} />
        ))}
      </div>
    </>
  );
}
