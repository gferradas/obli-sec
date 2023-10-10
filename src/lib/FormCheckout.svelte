<script>
  import { ip } from "../helpers/writables";
  let name = "";
  let email = "";
  let address = "";
  let city = "";
  let state = "";
  let zip = "";

  const submitForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // check if data is valid
    if (
      name === "" ||
      email === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      zip === ""
    ) {
      alert("Please fill out all fields");
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
  <form method="post" on:submit={(e) => submitForm(e)}>
    <label for="name">Name</label>
    <input bind:value={name} type="text" id="name" />

    <label for="email">Email</label>
    <input bind:value={email} type="email" id="email" />

    <label for="address">Address</label>
    <input bind:value={address} type="text" id="address" />

    <label for="city">City</label>
    <input bind:value={city} type="text" id="city" />

    <label for="state">State</label>
    <input bind:value={state} type="text" id="state" />

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
