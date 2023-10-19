<script>
  import Popup from "./Popup.svelte";
  import {
    authenticated,
    user,
    client,
    selectValue,
  } from "../helpers/writables";
  import { onMount } from "svelte";

  let username = "";
  let password = "";
  let passwordInput;
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_#@$+*.,<>!¡¿?]).{8,30}$/;

  let form;

  onMount(() => {
    passwordInput.setAttribute("pattern", regex.source);
    passwordInput.addEventListener("input", () => {
      if (!regex.test(password)) {
        passwordInput.setCustomValidity(
          "Password must be 8 to 30 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character ( _ # @ $ + * . , < > ! ¡ ¿ ? )"
        );
        passwordInput.reportValidity();
        return;
      }

      passwordInput.setCustomValidity("");
      passwordInput.reportValidity();
    });
  });

  const register = async () => {
    if (!form.checkValidity() || username.length < 2 || password.length < 8) {
      alert("Invalid data");
      return;
    }

    try {
      const res = await client.post("/register", { username, password });

      if (res.statusText !== "OK") {
        throw new Error("Error connecting to server");
      }

      const { data } = await res;

      if (!data.ok) throw new Error(data.error);

      $user = username;
      $authenticated = true;
      $selectValue = "shop";
      console.log(data);
      localStorage.setItem("user", JSON.stringify({ username, password }));
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Registered as " + username,
          duration: 2000,
          type: "success",
        },
      });
    } catch (error) {
      console.log(error);
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Failed to register " + error,
          duration: 2000,
          type: "failed",
        },
      });
    }
  };
</script>

<div class="register">
  <h1>Register</h1>
  <form
    bind:this={form}
    on:submit|preventDefault|stopPropagation={register}
    id="register"
    action="POST"
  >
    <label for="username">Username:</label>
    <input
      bind:value={username}
      type="text"
      name="username"
      id="username"
      minlength="2"
      required
    />
    <label for="password">Password:</label>
    <input
      bind:this={passwordInput}
      bind:value={password}
      type="password"
      name="password"
      id="password"
      minlength="8"
      required
    />
    <br />
    <span
      >Password must be 8 to 30 characters long, <br />
      contain at least one uppercase letter,<br />
      one lowercase letter,<br />
      one number and one special character [ _ # @ $ + * . , ! ¡ ¿ ? ( ) ]
    </span>
    <input type="submit" value="Register" />
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

  .register {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .register input {
    margin: 0.5rem;
  }

  .register h1 {
    margin: 0 0.5rem 2.5rem 0.5rem;
  }

  .register {
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
