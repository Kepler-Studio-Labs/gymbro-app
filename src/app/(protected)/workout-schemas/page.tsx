"use client";

import { getWorkoutSchemas, TWorkout } from "@/actions/workout-action";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { WorkoutSchemaFormDialog } from "@/components/workout-schema-form-dialog";
import { WorkoutSchemaList } from "@/components/workout-schema-list";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WorkoutSchemasPage() {
  const [workouts, setWorkouts] = useState<TWorkout[]>([]);
  const [c, setC] = useState(0);

  useEffect(() => {
    getWorkoutSchemas()
      .then((schemas) => {
        setWorkouts(schemas);
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Une erreur est survenue lors de la recuperation des seances."
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
              <BreadcrumbPage>Schémas de seances</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="max-w-6xl w-full mx-auto space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Schémas de seances</h1>
          <WorkoutSchemaFormDialog
            refreshCallback={() => setC((prev) => prev + 1)}
          >
            <Button size={"lg"}> Creer</Button>
          </WorkoutSchemaFormDialog>
        </div>
        <WorkoutSchemaList workouts={workouts} />
      </div>
    </SidebarInset>
  );
}
