if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(new URL('/service-worker.js', import.meta.url));
}

document.addEventListener('alpine:init', () => {
  const url = new URL(window.location);
  Alpine.store('shared', url.searchParams.get('text'));
});
