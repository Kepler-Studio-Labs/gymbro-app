"use server"

import {prisma} from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Session } from "next-auth"

async function ensureAuth() {
    const session = await auth()

    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    return session as Session & {
        user: {
            id: string
            name: string
            email: string
            image: string
        }
    }
}

// Workout exercises

export async function getWorkoutExercises() {
    const session = await ensureAuth()

    const workoutExercises = await prisma.workoutExercise.findMany({
        where: {
            userId: session.user.id
        }
    })

    return workoutExercises
}

export async function createWorkoutExercise({name, schemaId, sets, minReps, maxReps, restSeconds, degresive}: {name: string, schemaId: string, sets: number, minReps: number, maxReps?: number | null, restSeconds: number, degresive: boolean}) {
    const session = await ensureAuth()

    const workoutExercise = await prisma.workoutExercise.create({
        data: {
            name,
            userId: session.user.id,
            sets,
            minReps,
            maxReps,
            restSeconds,
            degresive,
            schemaId,
        }
    })

    return workoutExercise
}

export async function deleteWorkoutExercise(id: string) {
    const session = await ensureAuth()

    const workoutExercise = await prisma.workoutExercise.delete({
        where: {
            id,
            userId: session.user.id
        }
    })

    return workoutExercise
}

// Workout schemas

export async function getWorkoutSchemas() {
    const session = await ensureAuth()

    const workoutSchemas = await prisma.workoutSchema.findMany({
        where: {
            userId: session.user.id
        }
    })

    return workoutSchemas
}

export async function createWorkoutSchema(name: string) {
    const session = await ensureAuth()

    const workoutSchema = await prisma.workoutSchema.create({
        data: {
            name,
            userId: session.user.id
        }
    })

    return workoutSchema
}

export async function deleteWorkoutSchema(id: string) {
    const session = await ensureAuth()

    const workoutSchema = await prisma.workoutSchema.delete({
        where: {
            id,
            userId: session.user.id
        }
    })

    return workoutSchema
}