<script lang="ts">
  import { timer } from '../state/timer.svelte';
</script>

<div class="controls-wrapper">
  <div class="status-display">
    {timer.status === 'idle' ? 'SET' : timer.status.toUpperCase()}
  </div>

  <div class="controls">
    {#if timer.status === 'idle' || timer.status === 'paused'}
      <button 
        onclick={() => timer.start()} 
        disabled={timer.remainingSeconds <= 0}
        class="primary"
      >
        PLAY
      </button>
    {:else}
      <button onclick={() => timer.pause()} class="secondary">
        PAUSE
      </button>
    {/if}

    <button onclick={() => timer.reset()} class="ghost" disabled={timer.status === 'idle'}>
      RESET
    </button>
  </div>
</div>

<style>
  .controls-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .status-display {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    color: var(--text-color);
    opacity: 0.6;
  }

  .controls {
    display: flex;
    gap: 1rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    background-color: var(--primary-color);
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .primary:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  .secondary {
    background-color: var(--track-color);
    color: var(--text-color);
  }

  .ghost {
    background-color: transparent;
    color: var(--text-color);
    opacity: 0.6;
  }

  .ghost:hover:not(:disabled) {
    opacity: 1;
  }
</style>
