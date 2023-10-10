<script>
  import { cart } from "../helpers/writables";
  import Popup from "./Popup.svelte";
  export let chofer;
  const { name, image, price } = chofer;

  const addToCart = () => {
    if ($cart.some((item) => item.name === name)) {
      $cart = $cart.map((item) => {
        if (item.name === name) {
          item.quantity += 1;
        }
        return item;
      });
    } else {
      $cart = [...$cart, { name, image, price, quantity: 1 }];
    }

    $cart = $cart;

    new Popup({
      target: document.getElementById("popups"),
      props: {
        message: `${name} trip added to cart`,
        duration: 2000,
        type: "success",
      },
    });

    localStorage.setItem("cart", JSON.stringify($cart));
  };
</script>

<div class="product">
  <img width="96px" height="96px" src={image} alt={name + " image"} />
  <div>
    <div class="data">
      <span class="name">{name}</span>
      <span class="price">${price}</span>
    </div>
    <button on:click={addToCart}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"
        ><path
          d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"
        /></svg
      >
    </button>
  </div>
</div>

<style>
  .product {
    display: flex;
    gap: 1rem;
    border: 2px solid whitesmoke;
    border-radius: 5rem;
    max-width: 100%;
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .product > div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
  }

  .data {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  svg {
    fill: #fff;
  }

  div:hover {
    border-color: goldenrod;
  }

  img {
    border-radius: 50%;
  }

  .price {
    font-weight: bold;
  }
</style>
