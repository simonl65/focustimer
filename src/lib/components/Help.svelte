<script lang="ts">
  let { onclose } = $props();
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
      <li>The app will flash and beep when time is up.</li>
    </ul>
    
    <p><strong>System Tray:</strong></p>
    <p>You can minimize the app to the system tray. Right-click the icon to show the window, settings, or quit.</p>
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
  }

  ul {
    padding-left: 1.2rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
</style>
