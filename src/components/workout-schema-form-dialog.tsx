import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Link from "next/link";
import { WorkoutSchemaForm } from "./forms/workout-schema-form";

export function WorkoutSchemaFormDialog({
  children,
  refreshCallback,
}: {
  children: ReactNode;
  refreshCallback?: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Creer une seance</DialogTitle>
          <DialogDescription>
            Saisissez les informations pour cree un schema de seance avec des
            exercices predefinis <Link href={"/exercise-schemas"}>ici</Link>
          </DialogDescription>
        </DialogHeader>
        <div>
          <WorkoutSchemaForm refreshCallback={refreshCallback} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
