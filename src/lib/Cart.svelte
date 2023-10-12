<script>
  import { cart } from "../helpers/writables";
  import FormCheckout from "./FormCheckout.svelte";

  $: total = $cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const clearCart = () => {
    $cart = [];
    localStorage.setItem("cart", JSON.stringify($cart));
  };

  const reduceQuantity = (id) => {
    $cart = $cart.map((item) => {
      if (item.id === id) {
        item.quantity -= 1;
      }
      return item;
    });

    $cart = $cart.filter((item) => item.quantity > 0);
    localStorage.setItem("cart", JSON.stringify($cart));
  };

  const increaseQuantity = (id) => {
    $cart = $cart.map((item) => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify($cart));
  };
</script>

<section>
  {#if $cart.length > 0}
    <div class="cart">
      <div class="left">
        <div class="total">
          <span><strong>Total:</strong> ${total}</span>
          <button on:click={clearCart}> Clear cart </button>
        </div>

        <ul>
          <hr />
          {#each $cart as { image, price, quantity, name, id }}
            <li>
              <img
                width="96px"
                height="96px"
                src={image}
                alt={name + " image"}
              />

              <div class="data">
                <span class="name">{name}</span>
                <span class="price"> ~ ${price}</span>
                <br />
                <span class="quantity">Quantity: {quantity}</span>
              </div>

              <div class="botonera">
                <button
                  class="quantityChange green"
                  on:click={() => increaseQuantity(id)}>+</button
                >
                <button
                  class="quantityChange red"
                  on:click={() => reduceQuantity(id)}>-</button
                >
              </div>
            </li>
            <hr />
          {/each}
        </ul>
      </div>

      <FormCheckout />
    </div>
  {:else}
    <h1 style="text-align: center;">Cart is empty</h1>
    <p style="text-align: center;">Buy something</p>
  {/if}
</section>

<style>
  ::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 1rem;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: #888;
    border-radius: 1rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #f1f1f1;
    border-radius: 1rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  section {
    width: 80vw;
    text-align: left;
  }

  .left {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-direction: column;
    width: 50%;
  }

  .cart {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    list-style: none;
    gap: 1rem 2rem;
    max-height: 80vh;
    max-width: 45vw;
    width: 100%;
    overflow-y: scroll;
    justify-items: center;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 70%;
  }

  img {
    border-radius: 50%;
  }

  .quantityChange {
    font-weight: 800;
    width: 3rem;
    height: 3rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .green {
    color: green;
    border-radius: 1rem 1rem 0 0;
  }

  .red {
    color: red;
    border-radius: 0 0 1rem 1rem;
  }

  hr {
    margin: auto;
    width: 100%;
    max-width: 80%;
    border: 1px solid white;
  }

  /** Media query that changes the flex direction of the cart class on mobile */
  @media (max-width: 768px) {
    .cart {
      flex-direction: column;
    }

    .total {
      width: 100%;
    }

    .left {
      width: 100%;
    }

    ul {
      width: 100%;
      max-width: 100%;
    }

    li {
      flex-direction: column;
    }

    .botonera {
      display: flex;
      flex-direction: row-reverse;
    }

    .green {
      color: green;
      border-radius: 0rem 1rem 1rem 0;
    }

    .red {
      color: red;
      border-radius: 1rem 0 0 1rem;
    }
  }
</style>
