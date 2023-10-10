import { writable } from "svelte/store";

export const cart = writable([]);
export const ip = writable("44.202.209.71");
export const authenticated = writable(false);