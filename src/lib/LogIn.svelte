<script>
  import Popup from "./Popup.svelte";
  import { ip, authenticated, user } from "../helpers/writables";
  let username = "";
  let password = "";

  let form;

  const createPopup = (type, message) => {
    const popup = new Popup({
      target: document.getElementById("popups"),
      props: {
        message: message,
        duration: 2000,
        type: type,
      },
    });

    setTimeout(() => {
      popup.$destroy();
    }, 2150);
  };

  const auth = async () => {
    if (!form.checkValidity() || (username.length < 2 && password.length < 8)) {
      alert("Invalid data");
      return;
    }

    try {
      const res = await fetch(`http://${$ip}:3000/login`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.ok) {
        $user = username;
        $authenticated = true;
        console.log(data);
        localStorage.setItem("user", JSON.stringify({ username, password }));
        createPopup("success", "Logged in as " + username);
      } else {
        createPopup("failed", "Failed to login");
      }
    } catch (error) {
      console.log(error);
      createPopup("failed", "Failed to login: " + error);
    }
  };
</script>

<div class="login">
  <h1>Login</h1>

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
