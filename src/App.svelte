<script>
  import { cart, authenticated, user, client } from "./helpers/writables";
  import Auth from "./lib/Auth.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Tienda from "./lib/Tienda.svelte";
  import Cart from "./lib/Cart.svelte";
  import Popup from "./lib/Popup.svelte";
  import Spinner from "./lib/Spinner.svelte";

  let loading = true;
  $: cartViewable = false;
  $: selectValue = "login";
  $cart = JSON.parse(localStorage.getItem("cart")) || [];

  let { username, password } = JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    $authenticated = false;
    $cart = [];
    $user = "";
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
  };

  const login = async () => {
    try {
      const res = await client.post("/login", { username, password });

      if (res.statusText !== "OK") {
        throw new Error("Error connecting to server");
      }
      const { data } = await res;

      if (!data.ok) {
        $authenticated = false;
        throw new Error(data.error);
      }

      $authenticated = true;
      $user = username;
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: `Welcome back ${$user}`,
          duration: 2000,
          type: "success",
        },
      });
    } catch (error) {
      console.log(error);
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: `Error: ${error}`,
          duration: 2000,
          type: "error",
        },
      });
    }
    loading = false;
  };

  if (username && password) {
    if (username.length > 2 && password.length > 8) {
      login();
    }
  }
</script>

<Navbar {logout} bind:cartViewable bind:selectValue />
<main>
  {#if loading}
    <Spinner />
  {:else}
    {#if $authenticated && cartViewable}
      <Cart />
    {/if}

    {#if !$authenticated}
      <Auth {selectValue} />
    {/if}

    {#if $authenticated && !cartViewable}
      <Tienda />
    {/if}
  {/if}

  <div id="popups" class="popups" />
</main>

<style>
  main {
    margin-top: 3.5rem;
    max-width: 80vw;
  }

  .popups {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
