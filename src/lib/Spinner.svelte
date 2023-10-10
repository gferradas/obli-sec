<script></script>

<div class="spinnerContainer">
  <div class="spinner" />
</div>

<style>
  .spinnerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
  }

  .spinner {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 0.5rem solid #f3f3f3;
    border-top: 0.5rem solid #3498db;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
