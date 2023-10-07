<script>
  export let poke;
  const { name, type, image, price } = poke;
</script>

<div>
  <img width="96px" height="96px" src={image} alt={name + " image"} />
  <hr />
  <h3>{name}</h3>
  <span>{type}</span>
  <br />
  <span>Price: {price} USD</span>
  <br />
  <button>BUY</button>
</div>

<style>
  div {
    border: 2px solid whitesmoke;
    border-radius: 2rem;
    padding: 0.5rem;
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  hr {
    border: 1px solid rgba(255, 255, 255, 0.5);
    max-width: 50%;
    margin: 0 auto;
  }
  h3 {
    margin: 0 auto 0.5rem auto;
  }

  button {
    margin: 0.4rem auto;
  }

  div:hover {
    border-radius: 0;
  }
</style>
