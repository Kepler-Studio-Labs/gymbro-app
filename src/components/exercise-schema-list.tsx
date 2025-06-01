"use client";

import { TExercise } from "@/actions/workout-action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ExerciseSchemaListItem } from "./exercise-schema-list-item";

export function ExerciseSchemaList({ exercises }: { exercises: TExercise[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Exercices sauvegardés</CardTitle>
        <CardDescription>
          La liste de vos schémas d'exercices et/ou ceux que vous avez importés
        </CardDescription>
      </CardHeader>
      <CardContent>
        {exercises.length === 0 && (
          <div>
            <p className="text-xl text-muted-foreground">
              Aucun exercice pour le moment.
            </p>
          </div>
        )}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
          {exercises.map((exercise) => (
            <ExerciseSchemaListItem exercise={exercise} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
