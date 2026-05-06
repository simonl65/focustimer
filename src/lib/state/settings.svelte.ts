export class SettingsState {
  primaryColor = $state('#3b82f6');
  soundEnabled = $state(true);

  constructor() {
    // In a SvelteKit SPA, we can check for browser environment
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('primaryColor');
      if (savedColor) this.primaryColor = savedColor;
      
      const savedSound = localStorage.getItem('soundEnabled');
      if (savedSound !== null) this.soundEnabled = savedSound === 'true';
      
      this.updateCssVariables();
    }
  }

  updateCssVariables() {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', this.primaryColor);
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

  save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('primaryColor', this.primaryColor);
      localStorage.setItem('soundEnabled', this.soundEnabled.toString());
    }
  }
}

export const settings = new SettingsState();
