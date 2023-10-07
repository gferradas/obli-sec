<script>
  import Auth from "./lib/Auth.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Tienda from "./lib/Tienda.svelte";
  $: ok = false;
  let { username, password } = JSON.parse(localStorage.getItem("user")) || {};

  fetch(
    `http://127.0.0.1:3000/login?username=${username}&password=${password}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.ok) {
        ok = true;
      } else {
        ok = false;
      }
    });
</script>

<Navbar />
<main>
  {#if !ok}
    <Auth bind:ok />
  {/if}

  {#if ok}
    <button
      on:click={() => {
        ok = false;
        localStorage.removeItem("user");
      }}>Log Out</button
    >

    <Tienda />
  {/if}
</main>

<style>
  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
</style>
