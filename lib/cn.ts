import clsx, { type ClassValue } from "clsx";

/** Tiny class-name combiner. */
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
