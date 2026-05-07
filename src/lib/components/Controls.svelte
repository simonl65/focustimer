<script lang="ts">
  import { timer } from '../state/timer.svelte';
</script>

<div class="controls-wrapper">
  <div class="status-display">
    {timer.status === 'idle' ? 'SET' : timer.status.toUpperCase()}
  </div>

  <div class="controls">
    {#if timer.status !== 'running'}
      <button 
        onclick={() => timer.start()} 
        disabled={timer.remainingSeconds <= 0}
        class="primary"
        title="Start Timer"
      >
        PLAY
      </button>
    {:else}
      <button 
        onclick={() => timer.pause()} 
        class="secondary"
        title="Pause Timer"
      >
        PAUSE
      </button>
    {/if}

    <button 
      onclick={() => timer.reset()} 
      class="ghost" 
      disabled={timer.totalSeconds <= 0}
      title="Restart Timer"
    >
      RESTART
    </button>
  </div>
</div>

<style>
  .controls-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 2rem;
  }

  .status-display {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.2rem;
    color: var(--text-color);
    opacity: 0.5;
  }

  .controls {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  button {
    padding: 0.9rem 2rem;
    border-radius: 50px;
    border: none;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1rem;
    letter-spacing: 0.05rem;
    min-width: 120px;
  }

  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none !important;
  }

  .primary {
    background-color: var(--primary-color);
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    filter: brightness(1.1);
  }

  .secondary {
    background-color: var(--text-color);
    color: var(--bg-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .secondary:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: opacity(0.8);
  }

  .ghost {
    background-color: transparent;
    color: var(--text-color);
    border: 2px solid var(--track-color);
  }

  .ghost:hover:not(:disabled) {
    background-color: var(--track-color);
    border-color: transparent;
  }

  button:active:not(:disabled) {
    transform: translateY(0);
  }
</style>
