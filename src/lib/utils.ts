import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PathParams<T> = { params: T };

export interface ParamsProps<T extends { [key: string]: string }> {
  searchParams?: T;
}
