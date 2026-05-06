<script lang="ts">
  import { onMount } from 'svelte';
  import { listen } from '@tauri-apps/api/event';
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import CircularSelector from '$lib/components/CircularSelector.svelte';
  import Controls from '$lib/components/Controls.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import Help from '$lib/components/Help.svelte';
  import { timer } from '$lib/state/timer.svelte';
  import { settings } from '$lib/state/settings.svelte';

  let activePanel = $state<'none' | 'settings' | 'help'>('none');

  onMount(() => {
    // Handle timer completion
    timer.onCompleteCallback = async () => {
      const window = getCurrentWindow();
      await window.show();
      await window.setFocus();

      if (settings.soundEnabled) {
        playBeep();
      }
      
      // Flash window / Request attention
      await window.requestUserAttention(1); // 1 = Critical (flash until focused)
      
      // Flash the UI as well
      flashUI();
    };
  });

  function playBeep() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  }

  let isFlashing = $state(false);
  function flashUI() {
    isFlashing = true;
    setTimeout(() => {
      isFlashing = false;
    }, 5000); // Flash for 5 seconds
  }
</script>

<div class="app-container" class:flashing={isFlashing}>
  <header>
    <button class="icon-btn" onclick={() => activePanel = 'help'} title="Help">?</button>
    <h1>FOCUS</h1>
    <button class="icon-btn" onclick={() => activePanel = 'settings'} title="Settings">⚙</button>
  </header>

  <CircularSelector />
  <Controls />

  {#if activePanel !== 'none'}
    <div class="overlay" onclick={() => activePanel = 'none'}>
      <div class="panel-wrapper" onclick={(e) => e.stopPropagation()}>
        {#if activePanel === 'settings'}
          <Settings onclose={() => activePanel = 'none'} />
        {:else if activePanel === 'help'}
          <Help onclose={() => activePanel = 'none'} />
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .app-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    box-sizing: border-box;
    transition: background-color 0.3s;
    justify-content: space-between;
  }

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 1.2rem;
    letter-spacing: 0.3rem;
    margin: 0;
    font-weight: 300;
    opacity: 0.8;
  }

  .icon-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s;
    color: var(--text-color);
  }

  .icon-btn:hover {
    opacity: 1;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--overlay-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    backdrop-filter: blur(4px);
    transition: background-color 0.3s ease;
  }

  .panel-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .flashing {
    animation: flash-bg 0.5s infinite alternate;
  }

  @keyframes flash-bg {
    from { background-color: var(--bg-color); }
    to { background-color: var(--primary-color); }
  }
</style>
