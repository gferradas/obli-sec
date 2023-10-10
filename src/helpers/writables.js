import { writable } from "svelte/store";

export const cart = writable([]);
export const ip = writable("https://tienda-obli.sebasdiaz.com");
export const authenticated = writable(false);
export const choferes = writable([]);
export let user = writable("");