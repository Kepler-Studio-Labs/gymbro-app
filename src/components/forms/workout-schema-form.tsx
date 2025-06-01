"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SearchIcon, TargetIcon, Trash2Icon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import {
  createWorkoutSchema as createWorkoutSchemaAction,
  getWorkoutExercises,
  TExercise,
} from "@/actions/workout-action";
import { toast } from "sonner";
import { DialogClose } from "../ui/dialog";

const exerciseSchema = z.object({
  exerciseSchemaId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  sets: z.number(),
});

export const createWorkoutSchema = z.object({
  name: z.string().min(4, {
    message: "Le nom doit faire au moins 4 carateres.",
  }),
  exercises: z.array(exerciseSchema).min(1, {
    message: "La seance doit etre composee d'au moins 1 exercice.",
  }),
});

export function WorkoutSchemaForm({
  refreshCallback,
}: {
  refreshCallback?: () => void;
}) {
  const form = useForm<z.infer<typeof createWorkoutSchema>>({
    resolver: zodResolver(createWorkoutSchema),
  });

  function onSubmit(values: z.infer<typeof createWorkoutSchema>) {
    console.log(values);
    createWorkoutSchemaAction(values)
      .then((res) => {
        if (res === true) {
          toast.success("Schema de seance cree avec succes !");
          refreshCallback?.();
        } else {
          toast.error(
            "Une erreur est survenue lors de la creation du schema de seance. [Code B]"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Une erreur est survenue lors de la creation du schema de seance."
        );
      });
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  const watchExercices = form.watch("exercises");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la seance</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Exemple : Push, Pull, ..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="flex items-center gap-2 justify-between">
          <h2 className="text-xl font-semibold">Exercices</h2>
          <ExerciseAdder
            addCallback={(id, name, description, sets) =>
              append({
                exerciseSchemaId: id,
                name,
                description,
                sets,
              })
            }
            addedExercicesIds={fields.map((el) => el.exerciseSchemaId)}
          />
        </div>
        {fields.map((field, index) => (
          <div className="p-4 border rounded-lg shadow-sm" key={index}>
            <div className="font-medium flex items-center justify-between">
              <p className="flex items-center gap-2">
                {watchExercices?.[index]?.name}
                <Badge variant={"outline"}>
                  {watchExercices?.[index]?.sets} series
                </Badge>
              </p>
              <Button
                type="button"
                onClick={() => remove(index)}
                variant={"link"}
                className="cursor-pointer"
              >
                <Trash2Icon className="text-red-500 w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {watchExercices?.[index]?.description}
            </p>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2">
            <TargetIcon className="w-8 h-8 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">Aucun exercice</p>
          </div>
        )}
        {form.formState.errors.exercises && (
          <p>{form.formState.errors.exercises.message}</p>
        )}
        <div className="flex items-center justify-between">
          <DialogClose asChild>
            <Button variant={"outline"} type="button">
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit">Creer la seance</Button>
        </div>
      </form>
    </Form>
  );
}

function ExerciseAdder({
  addCallback,
  addedExercicesIds,
}: {
  addCallback: (
    exerciceSchemaId: string,
    name: string,
    description: string,
    sets: number
  ) => void;
  addedExercicesIds: string[];
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userExercices, setUserExercices] = useState<TExercise[]>([]);

  useEffect(() => {
    getWorkoutExercises()
      .then((exercices) => {
        setUserExercices(exercices);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Une erreur est survenue lors de la recuperation des exercices depuis la base de donnees."
        );
      });
  }, []);

  const filteredExercices = userExercices.filter((exercice) => {
    return (
      exercice.name
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) &&
      !addedExercicesIds.includes(exercice.id)
    );
  });

  return (
    <Popover open={searchOpen} onOpenChange={setSearchOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          <SearchIcon className="mr-2 h-4 w-4" />
          <span>Ajouter un exercice</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        side="bottom"
        sideOffset={5}
        style={{ width: "250px" }}
      >
        <Command>
          <CommandInput
            placeholder="Rechercher un exercice..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>Aucun exercice trouvé</CommandEmpty>
            <CommandGroup heading="Exercices disponibles">
              {filteredExercices.map((exercice: TExercise) => (
                <CommandItem
                  key={exercice.id}
                  value={exercice.id}
                  onSelect={() =>
                    addCallback(
                      exercice.id,
                      exercice.name,
                      exercice.description || "",
                      exercice.sets.length
                    )
                  }
                  className="space-y-1 block"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span>{exercice.name}</span>
                    </div>
                    <Badge>{exercice.sets.length} series</Badge>
                  </div>
                  {exercice.description && (
                    <span className="text-xs text-muted-foreground">
                      {exercice.description}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
