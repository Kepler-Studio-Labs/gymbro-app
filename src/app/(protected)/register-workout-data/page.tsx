"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { getWorkoutExercises, getWorkoutSchemas, registerWorkoutData } from "@/actions/workout-action";
import { useState, useEffect } from "react";
import { WorkoutExercise, WorkoutSchema } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";

export default function RegisterWorkoutDataPage() {
    const [isLoading, startTransition] = useTransition()

    const [workoutSchemas, setWorkoutSchemas] = useState<WorkoutSchema[]>([])
    const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([])

    const [selectedSchema, setSelectedSchema] = useState<string>("")

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

    return (
        <SidebarInset>
          <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Register Workout Data</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <form className="flex flex-1 flex-col gap-6 p-4" onSubmit={(e) => {
                e.preventDefault()
                startTransition(async () => {
                    await registerWorkoutData(selectedSchema)
                })
            }}>
              <div className="flex flex-col gap-2">
                <Label>Workout Schema</Label>
                <Select value={selectedSchema} onValueChange={(value) => setSelectedSchema(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workout schema" />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutSchemas.map((workoutSchema) => (
                        <SelectItem key={workoutSchema.id} value={workoutSchema.id}>
                            {workoutSchema.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Workout Exercises</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workoutExercises.filter((workoutExercise) => workoutExercise.schemaId === selectedSchema).map((workoutExercise) => (
                    <Card key={workoutExercise.id}>
                      <CardHeader>
                        <CardTitle>{workoutExercise.name} <Badge variant="outline">{workoutExercise.sets} x {workoutExercise.minReps} {workoutExercise.maxReps ? `-${workoutExercise.maxReps}` : ""}</Badge> <Badge variant="outline">{workoutExercise.restSeconds}s rest</Badge></CardTitle>
                        <CardDescription className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                        {Array.from({ length: workoutExercise.sets }, (_, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <Label>Set {i + 1}</Label>
                                <div className="flex items-center gap-2">
                                    <Input type="number" placeholder="Reps" required />
                                    <Input type="number" placeholder="Weight" required />
                                </div>  
                            </div>
                        ))}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
              <Button type="submit" disabled={isLoading}>{isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}Register</Button>
            </form>
        </SidebarInset>
    );
}