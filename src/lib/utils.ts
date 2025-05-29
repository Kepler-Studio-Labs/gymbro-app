import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  //const remainingSeconds = Math.floor(seconds % 60);
  return `${hours > 0 ? `${hours} hours ` : ""}${
    minutes > 0 ? `${minutes} minutes` : ""
  }`;
}
