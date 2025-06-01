"use client";

import { TargetIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ExerciseSchemaForm } from "./forms/exercise-schema-form";

export function ExerciseSchemaFormCard({
  refreshCallback,
}: {
  refreshCallback?: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-1">
          <TargetIcon size={18} /> Créer un schéma d&apos;exercice
        </CardTitle>
        <CardDescription>
          Definissez votre schéma d&apos;exercice et ajoutez-y des exercices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExerciseSchemaForm refreshCallback={refreshCallback} />
      </CardContent>
    </Card>
  );
}
