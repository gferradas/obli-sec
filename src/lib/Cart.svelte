<script>
  import { cart } from "../helpers/cart";
  import CartItem from "./CartItem.svelte";
  import FormCheckout from "./FormCheckout.svelte";

  $: total = $cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const clearCart = () => {
    $cart = [];
    localStorage.setItem("cart", JSON.stringify($cart));
  };
</script>

<section>
  <span>Total: ${total}</span>
  <button on:click={clearCart}> Clear cart </button>
  <div class="cart">
    <ul>
      {#each $cart as item}
        <CartItem {item} />
      {/each}
    </ul>

    <FormCheckout />
  </div>
</section>

<style>
  section {
    width: 80vw;
    text-align: left;
  }
  section > button {
    margin: 0 1rem;
  }

  .cart {
    display: flex;
    gap: 1rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    list-style: none;
    gap: 1rem 2rem;
    max-height: 80vh;
    max-width: 45vw;
    width: 40vw;
    overflow-y: scroll;
  }
</style>
