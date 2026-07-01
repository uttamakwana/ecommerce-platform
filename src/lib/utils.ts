import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toReadableString(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase → camel Case
    .replace(/[-_]/g, " ") // kebab-case & snake_case
    .replace(/\s+/g, " ") // Remove extra spaces
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
}
