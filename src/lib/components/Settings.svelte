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
    <button class="close" onclick={onclose} aria-label="Close settings panel">&times;</button>
  </div>

  <div class="section">
    <h3>Appearance</h3>
    <label class="switch-container">
      <span class="label-text">{settings.darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      <div class="switch">
        <input type="checkbox" checked={settings.darkMode} onchange={() => settings.toggleDarkMode()}>
        <span class="slider"></span>
      </div>
    </label>
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
          aria-label="Select color {color}"
        ></button>
      {/each}
    </div>
  </div>

  <div class="section">
    <h3>Sound</h3>
    <label class="switch-container">
      <span class="label-text">{settings.soundEnabled ? 'Beep Enabled' : 'Beep Disabled'}</span>
      <div class="switch">
        <input type="checkbox" checked={settings.soundEnabled} onchange={() => settings.toggleSound()}>
        <span class="slider"></span>
      </div>
    </label>
  </div>
</div>

<style>
  .panel {
    background: var(--panel-bg);
    color: var(--text-color);
    padding: 2rem;
    border-radius: 24px;
    width: 90%;
    max-width: 350px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    transition: background-color 0.3s ease;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  h2 { margin: 0; font-size: 1.5rem; font-weight: 800; }

  .close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    color: var(--text-color);
    opacity: 0.5;
  }

  .close:hover { opacity: 1; }

  .section {
    margin-bottom: 2rem;
  }

  h3 { font-size: 0.9rem; margin-bottom: 1rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05rem; }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .color-btn {
    height: 44px;
    border-radius: 12px;
    border: 3px solid transparent;
    cursor: pointer;
    transition: transform 0.2s, border-color 0.2s;
  }

  .color-btn.active {
    border-color: var(--text-color);
    transform: scale(1.1);
  }

  /* Modern Switch Styles */
  .switch-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .label-text { font-weight: 600; font-size: 1rem; }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--track-color);
    transition: .4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--primary-color);
  }

  input:checked + .slider:before {
    transform: translateX(24px);
  }
</style>
