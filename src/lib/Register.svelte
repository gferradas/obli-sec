<script>
  export let authenticated;
  export let ip;
  let failed = false;
  const register = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = document.getElementById("register");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (form.checkValidity() && username.length > 2 && password.length > 8) {
      fetch(`http://${ip}:3000/register`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            authenticated = true;
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

<main>
  <div class="register">
    <h1>Register</h1>
    <form on:submit={(e) => register(e)} id="register" action="POST">
      <label for="username">Username:</label>
      <input type="text" name="username" id="username" minlength="2" required />
      <label for="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        minlength="8"
        required
      />
      <input type="submit" value="Register" />
    </form>
    {#if failed}
      <span>Failed to register</span>
    {/if}
  </div>
</main>

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

  /*All inputs except button type*/

  input:not([type="button"]) {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
</style>
