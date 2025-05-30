"use client"

import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState, useTransition } from "react"
import { createWorkoutSchema } from "@/actions/workout-action"

export const WorkoutSchemaForm = ({onAdd}: {onAdd: () => void}) => {
    const [workoutSchemaName, setWorkoutSchemaName] = useState("")
    const [open, setOpen] = useState(false)
    const [isLoading, startTransition] = useTransition()

    const handleAdd = async () => {
        startTransition(async () => {
            await createWorkoutSchema(workoutSchemaName)
            setOpen(false)
            onAdd()
        })
    }

    const handleOpenChange = (open: boolean) => {
        if (isLoading) return
        setOpen(open)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant={'outline'}>
                    <PlusIcon /> Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Workout Schema</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <Label>Workout Name</Label>
                    <Input placeholder="Workout Name" value={workoutSchemaName} onChange={(e) => setWorkoutSchemaName(e.target.value)} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button variant={'default'} onClick={() => handleAdd()} disabled={isLoading}>{isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}Add</Button>
                </DialogFooter>
            </DialogContent>                
        </Dialog>
    )
}