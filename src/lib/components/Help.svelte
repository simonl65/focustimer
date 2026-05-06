<script lang="ts">
  import { onMount } from 'svelte';
  import { getVersion } from '@tauri-apps/api/app';

  let version = $state('');
  let { onclose } = $props();

  onMount(async () => {
    version = await getVersion();
  });
</script>

<div class="panel">
  <div class="header">
    <h2>Help</h2>
    <button class="close" onclick={onclose} aria-label="Close help panel">&times;</button>
  </div>

  <div class="content">
    <p><strong>How to use:</strong></p>
    <ul>
      <li>Drag the circular selector clockwise to set your focus time (up to 60 minutes).</li>
      <li>Click <strong>PLAY</strong> to start the countdown.</li>
      <li>The selector will re-trace anti-clockwise as time passes.</li>
      <li>The app will beep when time is up.</li>
    </ul>
  </div>
  <div class="version">v{version}</div>
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
    margin-bottom: 1.5rem;
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

  .content {
    line-height: 1.6;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.2rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .version {
    font-size: 0.8rem;
    opacity: 0.4;
    text-align: center;
  }
</style>
