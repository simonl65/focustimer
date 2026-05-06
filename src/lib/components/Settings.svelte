<script lang="ts">
  import { settings } from '../state/settings.svelte';

  const colors = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Amber
    '#8b5cf6', // Violet
    '#ec4899'  // Pink
  ];

  let { onclose } = $props();
</script>

<div class="panel">
  <div class="header">
    <h2>Settings</h2>
    <button class="close" onclick={onclose}>&times;</button>
  </div>

  <div class="section">
    <h3>Primary Color</h3>
    <div class="color-grid">
      {#each colors as color}
        <button 
          class="color-btn" 
          style:background-color={color}
          class:active={settings.primaryColor === color}
          onclick={() => settings.setPrimaryColor(color)}
        ></button>
      {/each}
    </div>
  </div>

  <div class="section">
    <h3>Sound</h3>
    <label class="switch">
      <input type="checkbox" checked={settings.soundEnabled} onchange={() => settings.toggleSound()}>
      <span class="slider"></span>
      <span class="label-text">{settings.soundEnabled ? 'Enabled' : 'Disabled'}</span>
    </label>
  </div>
</div>

<style>
  .panel {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    width: 90%;
    max-width: 350px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  h2 { margin: 0; font-size: 1.5rem; }

  .close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
  }

  .section {
    margin-bottom: 2rem;
  }

  h3 { font-size: 1rem; margin-bottom: 1rem; opacity: 0.7; }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .color-btn {
    height: 40px;
    border-radius: 8px;
    border: 3px solid transparent;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .color-btn.active {
    border-color: rgba(0,0,0,0.2);
    transform: scale(1.1);
  }

  .switch {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
  }

  .label-text { font-weight: 500; }
</style>
