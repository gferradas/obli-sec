<script></script>

<div class="formCheckout">
  <h2>Checkout</h2>
  <form>
    <label for="name">Name</label>
    <input type="text" id="name" />
    <label for="email">Email</label>
    <input type="email" id="email" />
    <label for="address">Address</label>
    <input type="text" id="address" />
    <label for="city">City</label>
    <input type="text" id="city" />
    <label for="state">State</label>
    <input type="text" id="state" />
    <label for="zip">Zip</label>
    <input type="text" id="zip" />
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
