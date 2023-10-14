<script>
  import { user, client, tfa } from "../helpers/writables.js";
  import Popup from "./Popup.svelte";
  export let qr;
  let div;
  let token;
  let form;

  const verify = async () => {
    if (!form.checkValidity()) {
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Invalid data",
          duration: 2000,
          type: "failed",
        },
      });
      return;
    }

    const res = await client.post("/verify", { username: $user, token });

    if (res.statusText !== "OK") {
      throw new Error(res.data.error);
    }

    const { ok, message } = await res.data;

    if (!ok) {
      throw new Error(message);
    }

    new Popup({
      target: document.getElementById("popups"),
      props: {
        message: "2FA Enabled",
        duration: 2000,
        type: "success",
      },
    });

    div.innerHTML = `<p>${message}</p>`;
    $tfa = true;
  };
</script>

<div bind:this={div}>
  <p>Scan the following code with your preferred 2FA app</p>
  <img width="400" height="400" src={qr} alt="2fa qr code" />

  <p>Then put the code it gives you in here:</p>
  <form
    bind:this={form}
    on:submit|preventDefault|stopPropagation={verify}
    action="post"
  >
    <input required bind:value={token} pattern={"[0-9]{6}"} type="text" />
    <button type="submit">Verify</button>
  </form>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    margin: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    text-align: center;
  }

  input:focus-visible {
    outline: none;
  }

  button {
    margin: 1rem;
  }
</style>
