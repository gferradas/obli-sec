<script>
  export let loggedIn = false;
  export let username;
  export let logout;
  export let selectValue;
</script>

<nav>
  <a href="/#shop">Shop</a>
  {#if loggedIn}
    <span>Logged in as: {username}</span>
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
