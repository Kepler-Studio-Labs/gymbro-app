"use client"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useState, useTransition } from "react"
import { WorkoutExercise } from "@prisma/client"
import { Loader2Icon, TrashIcon } from "lucide-react"
import { createWorkoutExercise } from "@/actions/workout-action"
import { Checkbox } from "./ui/checkbox"

export const WorkoutExerciseForm = ({schemaId, onAdd}: {schemaId: string, onAdd: (workoutExercise: WorkoutExercise) => void}) => {
    const [open, setOpen] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [exerciseName, setExerciseName] = useState("")
    const [sets, setSets] = useState(0)
    const [minReps, setMinReps] = useState(0)
    const [maxReps, setMaxReps] = useState<number | undefined>(undefined)
    const [restSeconds, setRestSeconds] = useState(0)
    const [degressive, setDegressive] = useState(false)

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }

    const handleAdd = async () => {
        startTransition(async () => {
            const exercise = await createWorkoutExercise({name: exerciseName, schemaId, sets, minReps, maxReps, restSeconds, degresive: degressive})
            onAdd(exercise)
            setOpen(false)
        })
    }
    
    return (
        <div>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <Button variant="default" size={'sm'}>Add Exercise</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Exercise</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <Label>Exercise Name</Label>
                        <Input placeholder="Exercise Name" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
                    </div>     
                    <div className="flex flex-col gap-2">
                        <Label>Sets</Label>
                        <Input placeholder="Sets" value={sets} onChange={(e) => setSets(Number(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Min Reps</Label>
                        <Input placeholder="Min Reps" value={minReps} onChange={(e) => setMinReps(Number(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Max Reps</Label>
                        <div className="flex items-center gap-2">
                            <Input placeholder="Max Reps" value={maxReps} onChange={(e) => setMaxReps(Number(e.target.value))} />
                            {maxReps ? <Button variant="destructive" onClick={() => setMaxReps(undefined)}><TrashIcon className="h-4 w-4" /></Button> : ""}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Rest Seconds</Label>
                        <Input placeholder="Rest Seconds" value={restSeconds} onChange={(e) => setRestSeconds(Number(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Degressive</Label>
                        <Checkbox checked={degressive} onCheckedChange={(checked) => setDegressive(checked as boolean)} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="default" onClick={() => handleAdd()} disabled={isLoading}>{isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}