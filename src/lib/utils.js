import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function truncate(str, max = 150) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}
