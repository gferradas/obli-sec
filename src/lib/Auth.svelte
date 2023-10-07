<script>
  export let ok = false;
  import LogIn from "./LogIn.svelte";
  import Register from "./Register.svelte";
  let selectValue = "login";
  const values = ["login", "register"];
</script>

<main>
  <button
    on:click={() => {
      selectValue = selectValue == "register" ? "login" : "register";
    }}
    >Go to {values.filter((value) => value !== selectValue).toString()}</button
  >

  {#if selectValue === "login"}
    <LogIn bind:authenticated={ok} />
  {/if}
  {#if selectValue === "register"}
    <Register bind:authenticated={ok} />
  {/if}
</main>

<style>
  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
</style>
