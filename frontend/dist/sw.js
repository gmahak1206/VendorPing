[{"revision":"53840502317b298e628caf6482c466e3","url":"assets/index-BohwwUJP.js"},{"revision":"8e2eaac13fa77715ae8b3c59b20ca193","url":"assets/index-Cvn9vht8.css"},{"revision":"6fe8e9a16a4454dce743ef1badb21e6c","url":"index.html"}]

// Listen for the 'install' event and skip waiting to activate immediately
self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});
  
  // Listen for the 'activate' event to claim control over all clients
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
  
  // Register push subscription
self.registerPushSubscription = async function() {
  // Ensure we have access to pushManager
  if (!self.registration.pushManager) return;

  try {
    // Subscribe to push notifications
    const subscription = await self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BLPbQTPp2lK5-D76arebSZDFniH3kDNSLhaDVd2Tjm6STz3i3nwU0Avkbm6VPIlRv0_c8TBcXMN2oGOTF1sOE30')
    });

    // Send the subscription details to the backend
    await sendSubscriptionToBackend(subscription);
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
  }
};

self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'REGISTER_PUSH_SUBSCRIPTION') {
    self.registerPushSubscription();
  } else if(event.data.type === 'START_PING') {
    try {
      let intervalId;
        intervalId = setInterval(() => {
          self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage({ type: 'PING_LOCATION' }));
          });
        }, 10000);
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ type: 'SAVE_INTERVAL_ID', value: intervalId }));
      });
    } catch(error) {
        console.error("Failed to start ping:", error);
    }
  } else if(event.data.type === 'STOP_PING') {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage({ type: 'GET_INTERVAL_ID' }));
    });
  } else if(event.data.type === 'INTERVAL_ID') {
    clearTimeout(event.data.value);
  }
})
  
async function sendSubscriptionToBackend(subscription) {
  try {
    await fetch("http://localhost:3001/api/customer/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(subscription)
    });    
  } catch (error) {
    console.error('Failed to send subscription to backend:', error);
  }
}
  
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', {
      body: data.body || 'New notification',
    })
  );
});
  
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
  