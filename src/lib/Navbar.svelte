<script>
  import { authenticated, user, selectValue } from "../helpers/writables.js";
  import Popup from "./Popup.svelte";
  export let cartViewable = false;

  const handleCart = () => {
    if ($authenticated) {
      cartViewable = !cartViewable;
    } else {
      alert("Please log in before checking your cart");
    }
  };

  const gotoShop = () => {
    if (!$authenticated) {
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: `Please log in to access the shop`,
          duration: 2000,
          type: "failed",
        },
      });
    }

    cartViewable = false;
  };
</script>

<nav>
  <a
    on:click={() => {
      $selectValue = "shop";
    }}
    href="./#shop">Shop</a
  >
  {#if $authenticated}
    <a
      href="./#cart"
      on:click={() => {
        $selectValue = "cart";
      }}>Cart</a
    >
    <a
      on:click={() => {
        $selectValue = "profile";
      }}
      href="./#userProfile">{$user}'s profile</a
    >
  {:else}
    <a
      on:click={() => {
        $selectValue = "login";
      }}
      href="./#login">Login</a
    >
    <a
      on:click={() => {
        $selectValue = "register";
      }}
      href="./#register">Register</a
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
