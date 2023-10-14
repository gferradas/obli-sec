<script>
  import { selectValue } from "../helpers/writables.js";
  import LogIn from "./LogIn.svelte";
  import Register from "./Register.svelte";
</script>

<section>
  {#if $selectValue === "login"}
    <LogIn />
  {/if}
  {#if $selectValue === "register"}
    <Register />
  {/if}
</section>

<style>
</style>
