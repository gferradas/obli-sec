<script>
  import { cart } from "../helpers/cart";
  export let item;
  const { name, price, quantity, image } = item;

  const removeItem = (itemName) => {
    $cart = $cart.filter((item) => item.name !== itemName);
    localStorage.setItem("cart", JSON.stringify($cart));
  };

  const reduceQuantity = (itemName) => {
    $cart = $cart.map((item) => {
      if (item.name === itemName) {
        item.quantity -= 1;
      }
      return item;
    });

    $cart = $cart.filter((item) => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify($cart));
  };

  const increaseQuantity = (itemName) => {
    $cart = $cart.map((item) => {
      if (item.name === itemName) {
        item.quantity += 1;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify($cart));
  };
</script>

<li>
  <img width="96px" height="96px" src={image} alt={name + " image"} />
  <div>
    <div class="data">
      <span class="name">{name}</span>
      <span class="price">${price}</span>
      <span class="quantity">Quantity: {quantity}</span>
      <div>
        <button on:click={() => reduceQuantity(name)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            ><path
              d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            /></svg
          >
        </button>
        <button on:click={() => increaseQuantity(name)}>
          <svg
            style="fill: green;"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            ><path
              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            /></svg
          >
        </button>
      </div>
    </div>
  </div>

  <button
    on:click={() => {
      removeItem(name);
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
      ><path
        d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
      /></svg
    >
  </button>
</li>

<style>
  li {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }

  img {
    border-radius: 50%;
  }

  svg {
    fill: brown;
  }
</style>
