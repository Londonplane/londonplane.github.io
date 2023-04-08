self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // If this is an incoming POST request for the
  // registered "action" URL, respond to it.
  if (event.request.method === 'POST' &&
    url.pathname === '/action') {
    event.respondWith((async () => {
      const formData = await event.request.formData();
      const text = formData.get('text') || '';

      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          // Create a new notification
          new Notification('GPT Helper', { body: text });
        }
      });
    })());
  }
});
