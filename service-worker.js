self.addEventListener("fetch",(e=>{const t=new URL(e.request.url);"POST"===e.request.method&&"/action"===t.pathname&&e.respondWith((async()=>{const t=(await e.request.formData()).get("text")||"";Notification.requestPermission().then((function(e){"granted"===e&&new Notification("GPT Helper",{body:t})}))})())}));
//# sourceMappingURL=service-worker.js.map
