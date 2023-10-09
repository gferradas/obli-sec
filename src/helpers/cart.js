import { writable } from "svelte/store";

export const cart = writable([]);
export const ip = writable("3.235.14.189");
export const authenticated = writable(false);