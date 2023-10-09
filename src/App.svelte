<script>
  import { cart, ip, authenticated } from "./helpers/writables";
  import Auth from "./lib/Auth.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Tienda from "./lib/Tienda.svelte";
  import Cart from "./lib/Cart.svelte";

  $: cartViewable = false;
  $: selectValue = "login";
  $cart = JSON.parse(localStorage.getItem("cart")) || [];

  let { username, password } = JSON.parse(localStorage.getItem("user")) || {};

  const logout = () => {
    $authenticated = false;
    localStorage.removeItem("user");
  };

  const login = () => {
    fetch(`http://${$ip}:3000/login`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          $authenticated = true;
        } else {
          $authenticated = false;
        }
      });
  };

  if (username && password) {
    if (username.length > 2 && password.length > 8) {
      $authenticated = true;
      login();
    }
  }
</script>

<Navbar {logout} {username} bind:cartViewable bind:selectValue />
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
</main>

<style>
  main {
    margin-top: 5rem;
    max-width: 80vw;
  }
</style>
