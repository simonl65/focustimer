export class SettingsState {
  primaryColor = $state('#3b82f6');
  soundEnabled = $state(true);
  darkMode = $state(false);
  selectedSound = $state('beep.mp3');

  constructor() {
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('primaryColor');
      if (savedColor) this.primaryColor = savedColor;

      const savedSound = localStorage.getItem('soundEnabled');
      if (savedSound !== null) this.soundEnabled = savedSound === 'true';

      const savedSelectedSound = localStorage.getItem('selectedSound');
      // if (savedSelectedSound) {
      //   this.selectedSound = savedSelectedSound.replace('.ogg', '.mp3');
      // }

      const savedDark = localStorage.getItem('darkMode');
      if (savedDark !== null) {
        this.darkMode = savedDark === 'true';
      } else {
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

  async playSoundFile(soundName: string) {
    try {
      // In Tauri production, directly setting src to a local path can fail 
      // with NotSupportedError because the protocol doesn't support streaming.
      // Fetching the blob and using an ObjectURL is much more robust.
      const response = await fetch(`/${soundName}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      audio.onended = () => URL.revokeObjectURL(url);
      await audio.play();
    } catch (e) {
      console.error("Sound playback failed:", e);
    }
  }

  setSelectedSound(sound: string) {
    this.selectedSound = sound;
    this.save();
    if (this.soundEnabled) {
      this.playSoundFile(sound);
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.save();
    if (this.soundEnabled) {
      this.playSoundFile(this.selectedSound);
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
      localStorage.setItem('selectedSound', this.selectedSound);
    }
  }
}

export const settings = new SettingsState();
