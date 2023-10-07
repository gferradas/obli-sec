<script>
  import Product from "./Product.svelte";

  let choferes = [];

  fetch("http://127.0.0.1:3000/choferes")
    .then((res) => res.json())
    .then((data) => {
      choferes = data;
    });
</script>

<main>
  <div class="pokemons">
    {#await choferes then}
      {#each choferes as chofer}
        <Product {chofer} />
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
