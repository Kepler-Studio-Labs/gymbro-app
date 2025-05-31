/*
  Warnings:

  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutExerciseInstance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_schemaId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_schemaId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseInstance" DROP CONSTRAINT "WorkoutExerciseInstance_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseInstance" DROP CONSTRAINT "WorkoutExerciseInstance_workoutId_fkey";

-- DropTable
DROP TABLE "Workout";

-- DropTable
DROP TABLE "WorkoutExercise";

-- DropTable
DROP TABLE "WorkoutExerciseInstance";

-- CreateTable
CREATE TABLE "SetSchema" (
    "id" TEXT NOT NULL,
    "notes" TEXT,
    "minReps" INTEGER NOT NULL,
    "maxReps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "restSeconds" INTEGER NOT NULL,
    "rpe" INTEGER NOT NULL,
    "tempo" TEXT NOT NULL,
    "degressive" BOOLEAN NOT NULL DEFAULT false,
    "degressiveType" TEXT NOT NULL DEFAULT 'percentage',
    "degressivePercentage" INTEGER NOT NULL DEFAULT 40,
    "dropSet" BOOLEAN NOT NULL DEFAULT false,
    "dropSetStages" INTEGER NOT NULL DEFAULT 2,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseSchemaId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExerciseSchema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "muscleGroup" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "schemaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ExerciseSchemaOnWorkoutSchema" (
    "id" TEXT NOT NULL,
    "exerciseSchemaId" TEXT NOT NULL,
    "workoutSchemaId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SetSchema_id_key" ON "SetSchema"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseSchema_id_key" ON "ExerciseSchema"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseSchemaOnWorkoutSchema_id_key" ON "ExerciseSchemaOnWorkoutSchema"("id");

-- AddForeignKey
ALTER TABLE "SetSchema" ADD CONSTRAINT "SetSchema_exerciseSchemaId_fkey" FOREIGN KEY ("exerciseSchemaId") REFERENCES "ExerciseSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSchema" ADD CONSTRAINT "ExerciseSchema_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "WorkoutSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSchema" ADD CONSTRAINT "ExerciseSchema_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSchemaOnWorkoutSchema" ADD CONSTRAINT "ExerciseSchemaOnWorkoutSchema_exerciseSchemaId_fkey" FOREIGN KEY ("exerciseSchemaId") REFERENCES "ExerciseSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseSchemaOnWorkoutSchema" ADD CONSTRAINT "ExerciseSchemaOnWorkoutSchema_workoutSchemaId_fkey" FOREIGN KEY ("workoutSchemaId") REFERENCES "WorkoutSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
