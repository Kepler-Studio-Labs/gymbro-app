/*
  Warnings:

  - You are about to drop the column `schemaId` on the `ExerciseSchema` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseSchema" DROP CONSTRAINT "ExerciseSchema_schemaId_fkey";

-- AlterTable
ALTER TABLE "ExerciseSchema" DROP COLUMN "schemaId";
