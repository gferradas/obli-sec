<script>
  import {
    client,
    user,
    authenticated,
    cart,
    tfa,
    selectValue,
  } from "../helpers/writables";
  import Popup from "./Popup.svelte";
  import TfaVerify from "./TFAVerify.svelte";

  let username;
  let password;

  let qrDiv;

  let qrShown = false;

  const logout = () => {
    $authenticated = false;
    $cart = [];
    $user = "";
    $tfa = false;
    $selectValue = "shop";
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
  };

  const requestQr = async () => {
    if ($user !== username) {
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: `Please enter your username`,
          duration: 2000,
          type: "failed",
        },
      });
    }

    try {
      const res = await client.post("/requestQr", { username, password });
      const { data } = await res;

      if (res.statusText !== "OK") {
        throw new Error(res.data.error);
      }

      if (!data.ok) {
        throw new Error(data.error);
      }

      qrShown = true;

      new TfaVerify({
        target: qrDiv,
        props: {
          qr: data.qr,
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
  };

  const disableTFA = async () => {
    try {
      const res = await client.post("/disableTFA", { username, password });

      if (res.statusText !== "OK") {
        throw new Error(res.data.error);
      }

      if (!res.data.ok) {
        throw new Error(res.data.error);
      }

      $tfa = false;

      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: `2FA Disabled`,
          duration: 2000,
          type: "success",
        },
      });
    } catch (error) {}
  };
</script>

<section>
  <h1>{$user}'s Profile</h1>

  {#if !$tfa && !qrShown}
    <div>
      <p>Two factor Authentication is not enabled</p>
      <label for="username">Username: </label>
      <input
        required
        bind:value={username}
        type="text"
        name="username"
        id="username"
      />
      <label for="password">Password: </label>
      <input
        required
        bind:value={password}
        type="password"
        name="password"
        id="password"
      />

      {#if !qrShown}
        <button on:click={requestQr}>Set up 2FA</button>
      {/if}
    </div>
  {/if}

  <div style={`display: ${qrShown ? "block" : "none"}; `} bind:this={qrDiv} />

  {#if $tfa}
    <div>
      <h3>Two factor Authentication is enabled</h3>
      <p>
        If you want to disable 2FA enter your username and password and click
        the button
      </p>
      <label for="username">Username: </label>
      <input
        required
        bind:value={username}
        type="text"
        name="username"
        id="username"
      />
      <label for="password">Password: </label>
      <input
        required
        bind:value={password}
        type="password"
        name="password"
        id="password"
      />
      <button on:click={disableTFA}>Disable 2FA</button>
    </div>
  {/if}

  <button on:click={logout}>Logout</button>
</section>

<style>
  section {
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
