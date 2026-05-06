<script lang="ts">
  import { timer } from '../state/timer.svelte';
  import { settings } from '../state/settings.svelte';

  let svgElement: SVGSVGElement;
  let isDragging = $state(false);

  const size = 300;
  const center = size / 2;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  // Calculate angle from mouse/pointer position
  function calculateAngle(clientX: number, clientY: number) {
    const rect = svgElement.getBoundingClientRect();
    const x = clientX - rect.left - center;
    const y = clientY - rect.top - center;
    
    // Math.atan2 returns angle in radians from -PI to PI
    // We want 0 at the top (12 o'clock) and clockwise
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    
    return angle;
  }

  function handlePointerDown(e: PointerEvent) {
    if (timer.status !== 'idle') return;
    isDragging = true;
    handlePointerMove(e);
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging || timer.status !== 'idle') return;
    
    const angle = calculateAngle(e.clientX, e.clientY);
    const minutes = Math.round((angle / (2 * Math.PI)) * 60);
    
    // Clamp between 0 and 60
    const clampedMinutes = Math.max(0, Math.min(60, minutes));
    timer.setTime(clampedMinutes);
  }

  function handlePointerUp() {
    isDragging = false;
  }

  // Dash offset represents the "empty" part of the circle
  // When timer is full (1.0), offset is 0
  // When timer is empty (0.0), offset is circumference
  let dashOffset = $derived(circumference * (1 - timer.progress));
</script>

<div class="selector-container">
  <svg
    bind:this={svgElement}
    viewBox="0 0 {size} {size}"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    class:dragging={isDragging}
    class:interactive={timer.status === 'idle'}
  >
    <!-- Background Track -->
    <circle
      cx={center}
      cy={center}
      r={radius}
      class="track"
    />
    
    <!-- Progress Track -->
    <circle
      cx={center}
      cy={center}
      r={radius}
      class="progress"
      style:stroke-dasharray={circumference}
      style:stroke-dashoffset={dashOffset}
      transform="rotate(-90 {center} {center})"
    />

    <!-- Time Display in Center -->
    <text x={center} y={center} class="time-text" dominant-baseline="middle" text-anchor="middle">
      {timer.displayTime}
    </text>
    
    <text x={center} y={center + 40} class="status-text" dominant-baseline="middle" text-anchor="middle">
      {timer.status === 'idle' ? 'SET' : timer.status.toUpperCase()}
    </text>
  </svg>
</div>

<style>
  .selector-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    user-select: none;
  }

  svg {
    width: 100%;
    max-width: 400px;
    height: auto;
    cursor: default;
    touch-action: none;
  }

  svg.interactive {
    cursor: pointer;
  }

  .track {
    fill: none;
    stroke: var(--track-color);
    stroke-width: 15;
  }

  .progress {
    fill: none;
    stroke: var(--primary-color);
    stroke-width: 15;
    stroke-linecap: round;
    transition: stroke 0.3s ease;
  }

  .time-text {
    font-size: 3rem;
    font-weight: 700;
    fill: var(--text-color);
  }

  .status-text {
    font-size: 1rem;
    font-weight: 500;
    fill: var(--text-color);
    opacity: 0.6;
  }

  .dragging .progress {
    filter: brightness(1.1);
  }
</style>
