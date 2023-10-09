<script>
  import { cart } from "./helpers/cart.js";
  import Auth from "./lib/Auth.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Tienda from "./lib/Tienda.svelte";
  import Cart from "./lib/Cart.svelte";

  $: ok = false;
  $: cartViewable = false;
  $: selectValue = "login";
  $cart = JSON.parse(localStorage.getItem("cart")) || [];

  let { username, password } = JSON.parse(localStorage.getItem("user")) || {};
  const ip = "3.235.14.189";

  const logout = () => {
    ok = false;
    localStorage.removeItem("user");
  };

  const login = () => {
    fetch(`http://${ip}:3000/login`, {
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
          ok = true;
        } else {
          ok = false;
        }
      });
  };

  if (username.length > 2 && password.length > 8) {
    ok = true;
    login();
  }
</script>

<Navbar {logout} {username} bind:cartViewable bind:selectValue loggedIn={ok} />
<main>
  {#if ok && cartViewable}
    <Cart />
  {/if}

  {#if !ok}
    <Auth {selectValue} {ip} bind:ok />
  {/if}

  {#if ok && !cartViewable}
    <Tienda {ip} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
