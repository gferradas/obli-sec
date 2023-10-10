<script>
  import { ip } from "../helpers/writables";
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

    const data = {
      name,
      email,
      address,
      city,
      state,
      zip,
    };

    const res = await fetch(`${ip}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
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
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 35vw;
  }

  label {
    font-weight: bold;
  }
</style>
