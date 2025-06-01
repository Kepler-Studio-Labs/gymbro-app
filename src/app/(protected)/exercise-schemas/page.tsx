"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ExerciseSchemaFormCard } from "@/components/exercise-schema-form-card";
import { ExerciseSchemaList } from "@/components/exercise-schema-list";
import { useEffect, useState } from "react";
import { getWorkoutExercises, TExercise } from "@/actions/workout-action";
import { toast } from "sonner";

export default function ExerciseSchemasPage() {
  const [c, setC] = useState(0);
  const [exercises, setExercises] = useState<TExercise[]>([]);

  useEffect(() => {
    getWorkoutExercises()
      .then((data) => {
        setExercises(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Une erreur est survenue lors de l'obtention des exercices depuis la base de donnees."
        );
      });
  }, [c]);

  return (
    <SidebarInset>
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Schémas d'exercices</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="max-w-6xl w-full mx-auto space-y-6 p-4">
        <h1 className="text-3xl font-bold">Schémas d'exercices</h1>
        <div className="grid max-xl:grid-cols-1 grid-cols-2 gap-4">
          <ExerciseSchemaFormCard
            refreshCallback={() => {
              setC((prev) => prev + 1);
            }}
          />
          <ExerciseSchemaList exercises={exercises} />
        </div>
      </div>
    </SidebarInset>
  );
}
