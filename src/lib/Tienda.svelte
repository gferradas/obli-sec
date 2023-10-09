<script>
  import Product from "./Product.svelte";
  export let ip;
  let choferes = [];

  fetch(`http://${ip}:3000/choferes`)
    .then((res) => res.json())
    .then((data) => {
      choferes = data;
    });
</script>

<div class="productos">
  {#await choferes then}
    {#each choferes as chofer}
      <Product {chofer} />
    {/each}
  {/await}
</div>

<style>
  .productos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 5rem 3rem;
    max-width: 80vw;
    min-width: 300px;
    margin: auto;
  }
</style>
