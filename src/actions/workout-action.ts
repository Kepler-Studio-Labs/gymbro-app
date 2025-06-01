"use server";

import { prisma } from "@/lib/prisma";
import { ensureAuth } from "./auth-action";
import {
  ExerciseSchema,
  SetSchema,
  ExerciseSchemaOnWorkoutSchema,
  WorkoutSchema,
} from "@prisma/client";

import { createExerciseFormSchema } from "../components/forms/exercise-schema-form";
import { createWorkoutSchema as zCreateWorkoutSchema } from "../components/forms/workout-schema-form";
import { z } from "zod";

// Workout exercises

export type TExercise = ExerciseSchema & {
  sets: SetSchema[];
  workoutSchemasRelations: ExerciseSchemaOnWorkoutSchema[];
};

export async function getWorkoutExercises(): Promise<TExercise[]> {
  const session = await ensureAuth();

  const workoutExercises = await prisma.exerciseSchema.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      sets: true,
      workoutSchemasRelations: true,
    },
  });

  return workoutExercises;
}

export async function createWorkoutExercise(
  data: z.infer<typeof createExerciseFormSchema>
): Promise<boolean> {
  const session = await ensureAuth();

  const { name, description, muscleGroup, equipment, sets } = data;

  await prisma.exerciseSchema.create({
    data: {
      name,
      description,
      muscleGroup,
      equipment,
      userId: session.user.id,
      sets: {
        create: sets.map((set) => ({
          notes: set.notes,
          minReps: set.minReps,
          maxReps: set.maxReps,
          weight: set.weight,
          restSeconds: set.restSeconds,
          rpe: set.rpe,
          tempo: set.tempo,
          degressive: set.isDegressive,
          degressiveType: set.degressiveType,
          degressivePercentage: set.degressivePercentage,
          dropSet: set.isDropSet,
          dropSetStages: set.dropSetStages,
        })),
      },
    },
    include: {
      sets: true,
      workoutSchemasRelations: true,
    },
  });

  return true;
}

export async function deleteWorkoutExercise(id: string) {
  const session = await ensureAuth();

  const workoutExercise = await prisma.exerciseSchema.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  return workoutExercise;
}

// Workout schemas

export type TWorkout = WorkoutSchema & {
  exerciseSchemas: (ExerciseSchemaOnWorkoutSchema & {
    exerciseSchema: ExerciseSchema & {
      sets: SetSchema[];
    };
  })[];
};

export async function getWorkoutSchemas(): Promise<TWorkout[]> {
  const session = await ensureAuth();

  const workoutSchemas = await prisma.workoutSchema.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      exerciseSchemas: {
        include: {
          exerciseSchema: {
            include: {
              sets: true,
            },
          },
        },
      },
    },
  });

  // Transform the data to match the TWorkout type
  return workoutSchemas as TWorkout[];
}

export async function createWorkoutSchema(
  data: z.infer<typeof zCreateWorkoutSchema>
) {
  const session = await ensureAuth();

  await prisma.workoutSchema.create({
    data: {
      name: data.name,
      userId: session.user.id,
      exerciseSchemas: {
        create: data.exercises.map((exercice) => {
          return {
            exerciseSchemaId: exercice.exerciseSchemaId,
          };
        }),
      },
    },
  });

  return true;
}

export async function deleteWorkoutSchema(id: string) {
  const session = await ensureAuth();

  const workoutSchema = await prisma.workoutSchema.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  return workoutSchema;
}
