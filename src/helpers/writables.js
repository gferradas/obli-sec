import { writable } from "svelte/store";
import axios from "axios";

export const selectValue = writable("shop");
export const cart = writable([]);
export const authenticated = writable(false);
export const choferes = writable([]);
export let user = writable("");
export let tfa = writable(false);
export const client = axios.create({ baseURL: "https://tienda-obli.sebasdiaz.com" })
// export const client = axios.create({ baseURL: "https://localhost" })