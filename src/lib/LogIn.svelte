<script>
  import Popup from "./Popup.svelte";
  import {
    tfa,
    authenticated,
    user,
    client,
    selectValue,
  } from "../helpers/writables";
  let username = "";
  let password = "";
  let token = "";

  let form;

  const auth = async () => {
    if (!form.checkValidity() || (username.length < 2 && password.length < 8)) {
      alert("Invalid data");
      return;
    }

    try {
      const res = await client.post("/login", { username, password });

      if (res.statusText !== "OK") {
        throw new Error("Error connecting to server");
      }

      const { ok, message, tfa: tfaActive } = await res.data;

      if (!ok) throw new Error(res.data.error);

      if (!tfaActive) {
        $user = username;
        $authenticated = true;
        $selectValue = "shop";
        console.log({ ok, tfa, message });
        localStorage.setItem("user", JSON.stringify({ username, password }));
        new Popup({
          target: document.getElementById("popups"),
          props: {
            message: "Logged in as " + username,
            duration: 2000,
            type: "success",
          },
        });
        return;
      }

      $tfa = true;
    } catch (error) {
      console.log(error);
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Failed to login " + error,
          duration: 2000,
          type: "failed",
        },
      });
    }
  };

  const verify = async () => {
    try {
      const res = await client.post("/verify", { username, token });
      const { ok, message } = await res.data;

      if (!ok) {
        throw new Error(message);
      }

      $user = username;
      $authenticated = true;
      $selectValue = "shop";
      localStorage.setItem("user", JSON.stringify({ username, password }));
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Logged in as " + username,
          duration: 2000,
          type: "success",
        },
      });
    } catch (error) {
      console.log(error);
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Failed to login " + error,
          duration: 2000,
          type: "failed",
        },
      });
    }
  };
</script>

<div class="login">
  <h1>Login</h1>

  {#if $tfa}
    <form on:submit|preventDefault|stopPropagation={verify} action="post">
      <label for="2fa code">2FA Code</label>
      <br />
      <input type="text" name="2fa code" id="2fa code" bind:value={token} />
      <input type="submit" value="Submit" />
    </form>
  {:else}
    <form
      bind:this={form}
      id="login"
      on:submit|preventDefault|stopPropagation={auth}
      action="POST"
    >
      <label for="loginUsername">Username:</label>
      <input
        bind:value={username}
        type="text"
        name="loginUsername"
        id="loginUsername"
        minlength="2"
        required
      />
      <label for="loginPassword">Password:</label>
      <input
        bind:value={password}
        type="password"
        name="loginPassword"
        id="loginPassword"
        minlength="8"
        required
      />
      <input type="submit" value="Log In" />
    </form>
  {/if}
</div>

<style>
  input[type="submit"] {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    margin: 4px 2px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #45a049;
  }

  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login input {
    margin: 0.5rem;
  }

  .login h1 {
    margin: 0 0.5rem 2.5rem 0.5rem;
  }

  .login {
    border: 1px solid whitesmoke;
    border-top: 0;
    border-bottom: 0;
    border-radius: 2rem;
    padding: 2.5rem;
  }

  input:not([type="button"]) {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
</style>
