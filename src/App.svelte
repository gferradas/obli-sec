<script>
  import Auth from "./lib/Auth.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Tienda from "./lib/Tienda.svelte";
  $: ok = false;
  $: selectValue = "login";
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

  if (username && password) {
    login();
  }
</script>

<Navbar {logout} {username} bind:selectValue loggedIn={ok} />
<main>
  {#if !ok}
    <Auth {selectValue} {ip} bind:ok />
  {/if}

  {#if ok}
    <Tienda {ip} />
  {/if}
</main>

<style>
</style>
