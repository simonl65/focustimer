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

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.save();
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
