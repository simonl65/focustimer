export class TimerState {
  totalSeconds = $state(0);
  remainingSeconds = $state(0);
  status = $state<'idle' | 'running' | 'paused'>('idle');
  interval: number | undefined = undefined;

  // Progress is 1 when full (selected time) and counts down to 0
  progress = $derived(this.totalSeconds > 0 ? this.remainingSeconds / this.totalSeconds : 0);

  displayTime = $derived(
    `${Math.floor(this.remainingSeconds / 60).toString().padStart(2, '0')}:${(this.remainingSeconds % 60).toString().padStart(2, '0')}`
  );

  minutes = $derived(Math.ceil(this.remainingSeconds / 60));

  onCompleteCallback: (() => void) | undefined = undefined;

  constructor() {}

  setTime(minutes: number) {
    if (this.status !== 'idle') return;
    this.totalSeconds = minutes * 60;
    this.remainingSeconds = this.totalSeconds;
  }

  start() {
    if (this.status === 'running' || this.remainingSeconds <= 0) return;
    
    this.status = 'running';
    this.interval = window.setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds -= 1;
      } else {
        this.stop();
        this.onComplete();
      }
    }, 1000);
  }

  pause() {
    if (this.status !== 'running') return;
    this.status = 'paused';
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  stop() {
    this.status = 'idle';
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  reset() {
    this.stop();
    this.remainingSeconds = this.totalSeconds;
  }

  onComplete() {
    if (this.onCompleteCallback) this.onCompleteCallback();
  }
}

export const timer = new TimerState();
