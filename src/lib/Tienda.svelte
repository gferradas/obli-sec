<script>
  import Product from "./Product.svelte";
  import { ip, choferes, client } from "../helpers/writables";
  import {
    sortByName,
    sortByNameDesc,
    sortByPrice,
    sortByPriceDesc,
  } from "../helpers/sorts";
  import Spinner from "./Spinner.svelte";
  import Popup from "./Popup.svelte";
  import { onMount } from "svelte";

  let sortMethod;

  const handleSort = () => {
    if (sortMethod === "name") {
      $choferes.sort(sortByName);
    } else if (sortMethod === "nameDesc") {
      $choferes.sort(sortByNameDesc);
    } else if (sortMethod === "price") {
      $choferes.sort(sortByPrice);
    } else if (sortMethod === "priceDesc") {
      $choferes.sort(sortByPriceDesc);
    }

    $choferes = $choferes;
  };

  onMount(async () => {
    try {
      const res = await client.get("/choferes");

      if (res.statusText !== "OK") {
        throw new Error("Error connecting to server");
      }

      const { data } = await res;

      if (!data) throw new Error(data.error);

      $choferes = data;
    } catch (error) {
      console.log(error);
      new Popup({
        target: document.getElementById("popups"),
        props: {
          message: "Failed to fetch choferes " + error,
          duration: 2000,
          type: "failed",
        },
      });
    }
  });
</script>

<label for="sort">Sort By: </label>
<select bind:value={sortMethod} on:change={handleSort} name="sort" id="sort">
  <option selected disabled value="">-</option>
  <option value="name">A-Z</option>
  <option value="nameDesc">Z-A</option>
  <option value="price">Price (low to high)</option>
  <option value="priceDesc">Price (high to low)</option>
</select>
<div class="productos">
  {#if $choferes.length === 0}
    <Spinner />
  {/if}

  {#await choferes then}
    {#each $choferes as chofer (chofer)}
      <Product {chofer} />
    {/each}
  {/await}
</div>

<style>
  select {
    margin: 1rem auto;
  }

  .productos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    max-width: 80vw;
    margin: auto;
  }
</style>
