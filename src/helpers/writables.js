import { writable } from "svelte/store";
import axios from "axios";

export const cart = writable([]);
export const authenticated = writable(false);
export const choferes = writable([]);
export let user = writable("");
export const client = axios.create({ baseURL: "https://tienda-obli.sebasdiaz.com" })