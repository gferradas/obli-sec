<script>
  export let ok = false;
  export let ip;
  export let selectValue;
  import LogIn from "./LogIn.svelte";
  import Register from "./Register.svelte";
</script>

<main>
  {#if selectValue === "login"}
    <LogIn {ip} bind:authenticated={ok} />
  {/if}
  {#if selectValue === "register"}
    <Register {ip} bind:authenticated={ok} />
  {/if}
</main>

<style>
</style>
