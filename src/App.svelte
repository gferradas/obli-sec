<script>
  import { cart, ip, authenticated, user } from "./helpers/writables";
  import Auth from "./lib/Auth.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Tienda from "./lib/Tienda.svelte";
  import Cart from "./lib/Cart.svelte";
  import Popup from "./lib/Popup.svelte";

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
      const res = await fetch(`${$ip}/login`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (data.ok) {
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
      } else {
        $authenticated = false;
      }
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
  };

  if (username && password) {
    if (username.length > 2 && password.length > 8) {
      login();
    }
  }
</script>

<Navbar {logout} bind:cartViewable bind:selectValue />
<main>
  {#if $authenticated && cartViewable}
    <Cart />
  {/if}

  {#if !$authenticated}
    <Auth {selectValue} />
  {/if}

  {#if $authenticated && !cartViewable}
    <Tienda />
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
