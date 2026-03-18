const MSGS = [
  'Hola Jami. Solo pasaba a saludarte 🌿',
  'Buenos días. No hay prisa. Aquí está tu día cuando quieras.',
  'Hola. Un momento para ti. Sin prisas, sin presión.',
  'Buenos días, Jami. Que este día traiga algo bonito, inshallah.',
  'Aquí está tu app. Cuando quieras asomarte, te esperamos.',
  'Hola. Un poquito de organización y luego a crear cosas bonitas.',
  'Buenos días. Dios es bello y ama la belleza. Tú también la creas.',
  'Hola Jami. Solo un momento para ver cómo va el día.'
];

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
    scheduleDaily(e.data.hour, e.data.minute);
  }
});

function scheduleDaily(hour, minute) {
  const now = new Date();
  const next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  const delay = next.getTime() - now.getTime();
  setTimeout(() => {
    fireNotification();
    setInterval(fireNotification, 24 * 60 * 60 * 1000);
  }, delay);
}

function fireNotification() {
  const idx = Math.floor(Math.random() * MSGS.length);
  self.registration.showNotification('Mi día · Jami', {
    body: MSGS[idx],
    icon: 'https://fav.farm/🌿',
    badge: 'https://fav.farm/🌿',
    tag: 'daily-reminder-jami',
    renotify: true,
    vibrate: [200, 100, 200]
  });
}
