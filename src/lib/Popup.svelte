<script>
  export let message;
  export let duration;
  export let type = "success";

  let div;

  setTimeout(() => {
    div.style.opacity = 1;
  }, 100);

  setTimeout(() => {
    div.style.opacity = 0;
  }, duration);
</script>

<div
  bind:this={div}
  style={`border-color: ${type == "success" ? "green" : "red"};`}
>
  <p>{message}</p>
</div>

<style>
  div {
    border: 1px solid;
    border-radius: 1rem;
    width: 25rem;
    height: 5rem;
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, 0.86);
    z-index: 1000;
    transition: all 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
    opacity: 0;
  }

  p {
    font-weight: 700;
    font-size: 1.2rem;
  }
</style>
