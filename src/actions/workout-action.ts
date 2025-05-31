"use server";

import { prisma } from "@/lib/prisma";
import { ensureAuth } from "./auth-action";
import {
  ExerciseSchema,
  SetSchema,
  WorkoutSchema,
  ExerciseSchemaOnWorkoutSchema,
} from "@prisma/client";

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

export interface CreateSetData {
  notes?: string;
  minReps: number;
  maxReps: number;
  weight: number;
  restSeconds: number;
  rpe: number;
  tempo: string;
  degressive: boolean;
  degressiveType: string;
  degressivePercentage: number;
  dropSet: boolean;
  dropSetStages: number;
  exerciseSchemaId: string;
}

export interface CreateExerciseData {
  name: string;
  description?: string;
  muscleGroup: string;
  equipment: string;
  sets: CreateSetData[];
}

export async function createWorkoutExercise({
  name,
  description,
  muscleGroup,
  equipment,
  sets,
}: CreateExerciseData): Promise<TExercise> {
  const session = await ensureAuth();

  const exerciseSchema = await prisma.exerciseSchema.create({
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
          degressive: set.degressive,
          degressiveType: set.degressiveType,
          degressivePercentage: set.degressivePercentage,
          dropSet: set.dropSet,
          dropSetStages: set.dropSetStages,
          exerciseSchemaId: set.exerciseSchemaId,
        })),
      },
    },
    include: {
      sets: true,
      workoutSchemasRelations: true,
    },
  });

  return exerciseSchema;
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

export async function getWorkoutSchemas() {
  const session = await ensureAuth();

  const workoutSchemas = await prisma.workoutSchema.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return workoutSchemas;
}

export async function createWorkoutSchema(name: string) {
  const session = await ensureAuth();

  const workoutSchema = await prisma.workoutSchema.create({
    data: {
      name,
      userId: session.user.id,
    },
  });

  return workoutSchema;
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
