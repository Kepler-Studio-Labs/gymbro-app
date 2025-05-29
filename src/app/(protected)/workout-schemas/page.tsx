"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { WorkoutSchemasList } from "@/components/workout-schemas-list";
import { WorkoutSchemaForm } from "@/components/workout-schema-form";

export default function WorkoutSchemasPage() {
  const handleAddSchema = () => {
    window.location.reload()
  }

  return (
    <SidebarInset>
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">Workout Schemas <WorkoutSchemaForm onAdd={handleAddSchema} /></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <WorkoutSchemasList />
      </div>
    </SidebarInset>
  );
}
