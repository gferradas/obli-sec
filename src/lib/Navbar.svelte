<script>
  import { authenticated } from "../helpers/writables.js";
  export let cartViewable = false;
  export let username;
  export let logout;
  export let selectValue;

  const handleCart = () => {
    if ($authenticated) {
      cartViewable = !cartViewable;
    } else {
      alert("Please log in before checking your cart");
    }
  };

  const gotoShop = () => {
    cartViewable = false;
  };
</script>

<nav>
  <a on:click={gotoShop} href="/#shop">Shop</a>
  {#if $authenticated}
    <a href="/#cart" on:click={handleCart}>{username}'s cart</a>
    <a on:click={logout} href="/#login">Log Out</a>
  {:else}
    <a
      on:click={() => {
        selectValue = "login";
      }}
      href="/#login">Login</a
    >
    <a
      on:click={() => {
        selectValue = "register";
      }}
      href="/#register">Register</a
    >
  {/if}
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #333;
    color: #fff;
    padding: 1rem 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 100%;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
