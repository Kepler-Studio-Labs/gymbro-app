"use client"

import { getWorkoutExercises, getWorkoutSchemas, deleteWorkoutExercise, deleteWorkoutSchema } from "@/actions/workout-action"
import { useEffect, useState } from "react"
import { WorkoutExercise, WorkoutSchema } from "@prisma/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { WorkoutExerciseForm } from "./workout-exercise-form"
import { Badge } from "./ui/badge"
import { TrashIcon } from "lucide-react"
import { formatDuration } from "@/lib/utils"


export const WorkoutSchemasList = () => {
    const [workoutSchemas, setWorkoutSchemas] = useState<WorkoutSchema[]>([])
    const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([])

    useEffect(() => {
        const fetchWorkoutSchemas = async () => {
            const workoutSchemas = await getWorkoutSchemas()
            setWorkoutSchemas(workoutSchemas)
        }
        fetchWorkoutSchemas()

        const fetchWorkoutExercises = async () => {
            const workoutExercises = await getWorkoutExercises()
            setWorkoutExercises(workoutExercises)
        }
        fetchWorkoutExercises()
    }, [])

    const handleDeleteSchema = async (id: string) => {
        await deleteWorkoutSchema(id)
        setWorkoutSchemas((prev) => prev.filter((workoutSchema) => workoutSchema.id !== id))
    }

    return (
        <div className="grid grid-cols-1 min-lg:grid-cols-2 min-xl:grid-cols-3 gap-4">
            {workoutSchemas.map((workoutSchema) => (
                <Card key={workoutSchema.id}>
                    <CardHeader className="border-b">
                        <CardTitle>{workoutSchema.name}</CardTitle>
                        <CardDescription><Badge>{workoutExercises.filter((workoutExercise) => workoutExercise.schemaId === workoutSchema.id).length} exercises</Badge> <Badge>{formatDuration(workoutExercises.filter((workoutExercise) => workoutExercise.schemaId === workoutSchema.id).reduce((total, workoutExercise) => total + (workoutExercise.sets * (workoutExercise.restSeconds + 45)), 0) * 1.25) || "0 minutes"}</Badge></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {workoutExercises.filter((workoutExercise) => workoutExercise.schemaId === workoutSchema.id).map((workoutExercise) => (
                            <div key={workoutExercise.id} className="flex items-center gap-2 justify-between hover:bg-accent p-2 rounded-md">
                                <p>{workoutExercise.name} <Badge variant="outline">{workoutExercise.sets} x {workoutExercise.minReps} {workoutExercise.maxReps ? `-${workoutExercise.maxReps}` : ""}</Badge> <Badge variant="outline">{workoutExercise.restSeconds}s rest</Badge></p>
                                <Button size="icon" variant="destructive" onClick={() => deleteWorkoutExercise(workoutExercise.id)}>
                                    <TrashIcon />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t">
                        <WorkoutExerciseForm schemaId={workoutSchema.id} onAdd={(workoutExercise: WorkoutExercise) => {
                            setWorkoutExercises((prev) => [...prev, workoutExercise])
                        }} />
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteSchema(workoutSchema.id)}>
                            <TrashIcon /> Delete
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}