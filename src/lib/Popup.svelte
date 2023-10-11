<script>
  import { onMount } from "svelte";

  export let message;
  export let duration;
  export let type = "success";

  let popup;

  onMount(() => {
    popup.style.opacity = 1;
  });

  setTimeout(() => {
    popup.style.opacity = 0;
    setTimeout(() => {
      popup.parentNode.removeChild(popup);
    }, 150);
  }, duration);
</script>

<div
  bind:this={popup}
  style={`border-color: ${type == "success" ? "green" : "red"};`}
>
  <p>{message}</p>
</div>

<style>
  div {
    border: 1px solid;
    border-radius: 1rem;
    max-width: 80vw;
    width: 25rem;
    height: 5rem;
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, 0.86);
    z-index: 1000;
    opacity: 0;
    transition: all 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  p {
    font-weight: 700;
    font-size: 1.2rem;
  }
</style>
