"use client";

import {
  degressiveTypes,
  gymEquipments,
  lowerMuscleGroups,
  muscleGroups,
  upperMuscleGroups,
} from "@/lib/gym-data";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TypeOf } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { TargetIcon, TimerIcon, Trash2Icon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { createWorkoutExercise } from "@/actions/workout-action";
import { toast } from "sonner";

const setSchema = z.object({
  minReps: z
    .number()
    .min(0, {
      message: "Le nombre minimum de repetitions doit etre au minimum 0.",
    })
    .int({
      message: "Le nombre minimum de repetitions doit etre un nombre entier.",
    }),
  maxReps: z
    .number()
    .min(0, {
      message: "Le nombre maximum de repetitions doit etre au minimum 0.",
    })
    .int({
      message: "Le nombre maximum de repetitions doit etre un nombre entier.",
    }),
  weight: z.number().min(0, {
    message: "Le poids minimum doit etre 0.",
  }),
  restSeconds: z
    .number()
    .min(0, {
      message: "Le temps de repos minimum est de 0 secondes.",
    })
    .int({
      message: "Le temps de repos doit etre un nombre entier.",
    }),
  rpe: z
    .number()
    .min(1, {
      message: "Le RPE minimum est de 1.",
    })
    .max(10, {
      message: "Le RPE maximum est de 10.",
    }),
  tempo: z.string().regex(/[0-9]+-[0-9]+-[0-9]+-[0-9]+/gm, {
    message:
      "Le format du tempo doit etre le suivant 0-0-0-0 : excentrique-pause-concentrique-pause.",
  }),
  isDegressive: z.boolean(),
  degressiveType: z.enum(degressiveTypes),
  degressivePercentage: z
    .number()
    .int({
      message: "Le pourcentage de degression doit etre un nombr entier.",
    })
    .min(5, {
      message: "Le pourcentage de degression doit etre au minimum 5%.",
    })
    .max(95, {
      message: "Le pourcentage de degression doit etre au maximum 95%.",
    }),
  isDropSet: z.boolean(),
  dropSetStages: z.number().int({
    message: "Le stage du drop set doit etre un nombre entier.",
  }),
  notes: z.string().optional(),
});

const formSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Le nom de l'exercice doit faire au moins 4 caracteres.",
    })
    .max(32, {
      message: "Le nom de l'exercice ne doit pas depasser 32 caracteres.",
    }),
  muscleGroup: z.enum(muscleGroups),
  equipment: z.enum(gymEquipments),
  description: z.string().optional(),
  sets: z.array(setSchema).min(1, {
    message: "Au moins une série est requise.",
  }),
});

export const createExerciseFormSchema = formSchema;

export function ExerciseSchemaForm({
  refreshCallback,
}: {
  refreshCallback?: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createWorkoutExercise(values)
      .then((res) => {
        if (res === true) {
          toast.success("Exercice cree avec succes !");
          refreshCallback?.();
        } else {
          toast.error(
            "Une erreur est survenue lors de la creation de l'exercice. [Code B]"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Une erreur est survenue lors de la creation de l'exercice."
        );
      });
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sets",
  });

  const watchSets = form.watch("sets");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Exemple : Squats, Bench, ..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Le nom de l&apos;exercice.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="muscleGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Groupe musculaire</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un groupe musculaire" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Haut du corps</SelectLabel>
                      {upperMuscleGroups.map((upperMuscleGroup) => (
                        <SelectItem
                          key={upperMuscleGroup}
                          value={upperMuscleGroup}
                        >
                          {upperMuscleGroup}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Bas du corps</SelectLabel>
                      {lowerMuscleGroups.map((lowerMuscleGroup) => (
                        <SelectItem
                          key={lowerMuscleGroup}
                          value={lowerMuscleGroup}
                        >
                          {lowerMuscleGroup}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Le group musculaire visé par cet exercice.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Choisir l'equipement utilise"
                      className="w-full"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gymEquipments.map((equipment) => (
                    <SelectItem key={equipment} value={equipment}>
                      {equipment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Le type d&apos;equipement utilise pour l&apos;exercice.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Instructions, details, ..." {...field} />
              </FormControl>
              <FormDescription>Description de l&apos;exercice.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <Separator />
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Configuration des series</h3>
            <Button
              type="button"
              variant={"outline"}
              onClick={() =>
                append({
                  minReps: 8,
                  maxReps: 12,
                  weight: 0,
                  restSeconds: 60,
                  rpe: 7,
                  tempo: "2-1-2-1",
                  isDegressive: false,
                  degressiveType: "Pourcentage",
                  degressivePercentage: 40,
                  isDropSet: false,
                  dropSetStages: 1,
                  notes: "",
                })
              }
            >
              Ajouter une serie
            </Button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-l-4 border-l-accent rounded-lg p-4 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Serie {index + 1}</h4>
                  <div>
                    <Button
                      className="cursor-pointer"
                      variant={"link"}
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Trash2Icon className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={`sets.${index}.minReps`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reps minimum</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(v) => {
                              field.onChange(Number(v.target.value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sets.${index}.maxReps`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reps maximum</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(v) => {
                              field.onChange(Number(v.target.value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*<FormField
                    control={form.control}
                    name={`sets.${index}.weight`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Poids (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(v) => {
                              field.onChange(Number(v.target.value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />*/}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={`sets.${index}.restSeconds`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <TimerIcon className="w-4 h-4" /> Temps de repos (sec)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(v) => {
                              field.onChange(Number(v.target.value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sets.${index}.rpe`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RPE (1-10)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(v) => {
                              field.onChange(Number(v.target.value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name={`sets.${index}.tempo`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tempo (excentrique-pause-concentrique-pause)
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  name={`sets.${index}.isDegressive`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel>Serie degressive?</FormLabel>
                        <FormControl>
                          <Checkbox
                            onCheckedChange={field.onChange}
                            defaultChecked={field.value}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchSets?.[index]?.isDegressive && (
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      name={`sets.${index}.degressiveType`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Type de degression</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger>
                                <SelectValue
                                  className="w-full"
                                  placeholder="Selectionner un type de degression"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {degressiveTypes.map((degressiveType) => (
                                <SelectItem
                                  key={degressiveType}
                                  value={degressiveType}
                                >
                                  {degressiveType}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    {watchSets?.[index]?.degressiveType === "Pourcentage" && (
                      <FormField
                        name={`sets.${index}.degressivePercentage`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pourcentage (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(v) => {
                                  field.onChange(Number(v.target.value));
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}
                <FormField
                  name={`sets.${index}.isDropSet`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel>Drop set?</FormLabel>
                        <FormControl>
                          <Checkbox
                            onCheckedChange={field.onChange}
                            defaultChecked={field.value}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchSets?.[index]?.isDropSet && (
                  <div>
                    <FormField
                      name={`sets.${index}.dropSetStages`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Stages</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(v) => {
                                field.onChange(Number(v.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <FormField
                  name={`sets.${index}.notes`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            {fields.length === 0 && (
              <div className="p-8 flex flex-col items-center justify-center gap-y-4">
                <TargetIcon className="w-8 h-8 text-accent" />
                <p className="text-muted-foreground font-medium">
                  Aucune serie configuree
                </p>
                <p className="text-muted-foreground font-medium">
                  Appuyez sur "Ajouter une serie" pour commencer
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full fex items-center justify-end">
          <Button type="submit" className="w-full">
            Sauvegarder l&apos;exercice
          </Button>
        </div>
      </form>
    </Form>
  );
}
