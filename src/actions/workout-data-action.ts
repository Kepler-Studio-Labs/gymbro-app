"use server";

import { WorkoutExerciseInstance } from "@prisma/client";
import { ensureAuth } from "./auth-action";
import { prisma } from "@/lib/prisma";

interface WorkoutData {
  schemaId: string;
  exercises: {
    exerciseId: string;
    sets: {
      reps: number;
      weight: number;
    }[];
  }[];
}

export async function registerWorkoutData(workoutData: WorkoutData) {
  const session = await ensureAuth();

  const workout = await prisma.workout.create({
    data: {
      userId: session.user.id,
      schemaId: workoutData.schemaId,
    },
  });

  await prisma.workoutExerciseInstance.createMany({
    data: workoutData.exercises.flatMap((exercise) =>
      exercise.sets.map((set) => ({
        workoutId: workout.id,
        exerciseId: exercise.exerciseId,
        reps: set.reps,
        weight: set.weight,
        degresive: false,
        restSeconds: null,
        degresiveReps: null,
        degresiveWeight: null,
      }))
    ) as WorkoutExerciseInstance[],
  });

  return true;
}
