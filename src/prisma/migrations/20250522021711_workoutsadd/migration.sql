-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "minReps" INTEGER NOT NULL,
    "maxReps" INTEGER,
    "restSeconds" INTEGER NOT NULL,
    "degresive" BOOLEAN NOT NULL,
    "schemaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WorkoutSchema" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WorkoutExerciseInstance" (
    "id" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "restSeconds" INTEGER,
    "degresive" BOOLEAN NOT NULL,
    "degresiveReps" INTEGER,
    "degresiveWeight" DOUBLE PRECISION,
    "exerciseId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "schemaId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExercise_id_key" ON "WorkoutExercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutSchema_id_key" ON "WorkoutSchema"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutExerciseInstance_id_key" ON "WorkoutExerciseInstance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_id_key" ON "Workout"("id");

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "WorkoutSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSchema" ADD CONSTRAINT "WorkoutSchema_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseInstance" ADD CONSTRAINT "WorkoutExerciseInstance_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseInstance" ADD CONSTRAINT "WorkoutExerciseInstance_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "WorkoutSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
