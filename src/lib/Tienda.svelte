<script>
  import Product from "./Product.svelte";

  let pokemons = [];

  fetch("http://127.0.0.1:3000/pokemon")
    .then((res) => res.json())
    .then((data) => {
      pokemons = data;
    });
</script>

<main>
  <div class="pokemons">
    {#await pokemons then}
      {#each pokemons as poke}
        <Product {poke} />
      {/each}
    {/await}
  </div>
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .pokemons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 5rem 3rem;
    max-width: 80vw;
    min-width: 300px;
    margin: auto;
  }
</style>
