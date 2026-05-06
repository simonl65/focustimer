export class SettingsState {
  primaryColor = $state('#3b82f6');
  soundEnabled = $state(true);
  darkMode = $state(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('primaryColor');
      if (savedColor) this.primaryColor = savedColor;
      
      const savedSound = localStorage.getItem('soundEnabled');
      if (savedSound !== null) this.soundEnabled = savedSound === 'true';

      const savedDark = localStorage.getItem('darkMode');
      if (savedDark !== null) {
        this.darkMode = savedDark === 'true';
      } else {
        // Default to system preference if no saved setting
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      this.updateCssVariables();
      this.updateDarkMode();
    }
  }

  updateCssVariables() {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', this.primaryColor);
    }
  }

  updateDarkMode() {
    if (typeof document !== 'undefined') {
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  setPrimaryColor(color: string) {
    this.primaryColor = color;
    this.save();
    this.updateCssVariables();
  }

  async playSound() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.save();
    if (this.soundEnabled) {
      this.playSound();
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.save();
    this.updateDarkMode();
  }

  save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('primaryColor', this.primaryColor);
      localStorage.setItem('soundEnabled', this.soundEnabled.toString());
      localStorage.setItem('darkMode', this.darkMode.toString());
    }
  }
}

export const settings = new SettingsState();
