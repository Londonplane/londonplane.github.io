if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(new URL('/service-worker.js', import.meta.url));
}

document.addEventListener('alpine:init', () => {
  const url = new URL(window.location);
  Alpine.store('shared', url.searchParams.get('text'));

  Alpine.data('settings', () => ({
    showSettings: false,
    saved: false,

    setAPIKey(key) {
      localStorage.setItem('openai-apikey', key);
      this.key = key;
      this.saved = true;

      _this = this;
      setTimeout(() => { _this.saved = false; }, 1000);
    },

    key: localStorage.getItem('openai-apikey'),

    toggle() {
      this.showSettings = !this.showSettings;
    }
  }))
});
