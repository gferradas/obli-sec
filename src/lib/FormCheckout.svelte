<script>
  import { ip, cart, user } from "../helpers/writables";
  import Popup from "./Popup.svelte";
  let name = "";
  let email = "";
  let address = "";
  let city = "";
  let state = "";
  let zip = "";

  let form;

  const submitForm = async () => {
    // check if data is valid

    if (!form.checkValidity()) {
      return;
    }

    if (!name || !email || !address || !city || !state || !zip) {
      alert("Please fill out all fields");
      return;
    }

    if (name.length < 2) {
      alert("Please enter a valid name");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    const address_content = {
      name,
      email,
      address,
      city,
      state,
      zip,
    };

    const order_content = $cart;

    const res = await fetch(`${$ip}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ $user, order_content, address_content }),
    });

    const datas = await res.json();
    if (datas.ok) {
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Order placed",
          duration: 2000,
          type: "success",
        },
      });

      $cart = [];
      localStorage.setItem("cart", JSON.stringify($cart));
      name = "";
      email = "";
      address = "";
      city = "";
      state = "";
      zip = "";
    } else {
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Order failed, try again later",
          duration: 2000,
          type: "failed",
        },
      });
    }

    console.log(datas);
  };
</script>

<div class="formCheckout">
  <h2>Checkout</h2>
  <form
    bind:this={form}
    method="post"
    on:submit|preventDefault|stopPropagation={submitForm}
  >
    <label for="name">Name</label>
    <input bind:value={name} type="text" id="name" minlength="2" />

    <label for="email">Email</label>
    <input bind:value={email} type="email" id="email" />

    <label for="address">Address</label>
    <input bind:value={address} type="text" id="address" minlength="2" />

    <label for="city">City</label>
    <input bind:value={city} type="text" id="city" minlength="2" />

    <label for="state">State</label>
    <input bind:value={state} type="text" id="state" minlength="2" />

    <label for="zip">Zip</label>
    <input bind:value={zip} type="text" id="zip" />

    <button type="submit">Submit</button>
  </form>
</div>

<style>
  .formCheckout {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 70%;
    width: 100%;
  }

  label {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    form {
      max-width: 100%;
    }
  }
</style>
