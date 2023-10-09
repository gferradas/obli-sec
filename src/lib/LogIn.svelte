<script>
  import { ip, authenticated } from "../helpers/cart.js";
  let failed = false;
  const auth = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = document.getElementById("login");
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (form.checkValidity() && username.length > 2 && password.length > 8) {
      fetch(`http://${$ip}:3000/login`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            $authenticated = true;
            localStorage.setItem(
              "user",
              JSON.stringify({ username, password })
            );
          } else {
            failed = true;
          }
        });
    } else {
      alert("Invalid data");
    }
  };
</script>

<div class="login">
  <h1>Login</h1>

  <form id="login" on:submit={auth} action="POST">
    <label for="loginUsername">Username:</label>
    <input
      type="text"
      name="loginUsername"
      id="loginUsername"
      minlength="2"
      required
    />
    <label for="loginPassword">Password:</label>
    <input
      type="password"
      name="loginPassword"
      id="loginPassword"
      minlength="8"
      required
    />
    <input type="submit" value="Log In" />
  </form>
  {#if failed}
    <span>Failed to login</span>
  {/if}
</div>

<style>
  /* input of type button*/
  input[type="submit"] {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    margin: 4px 2px;
    cursor: pointer;
  }
  /*Hover effect*/
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

  /*All inputs except submit type*/

  input:not([type="button"]) {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
  span {
    color: rgb(245, 106, 106);
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }
</style>
