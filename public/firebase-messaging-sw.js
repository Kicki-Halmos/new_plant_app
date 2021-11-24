importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);


// Set Firebase configuration, once available
self.addEventListener('fetch', () => {
  const urlParams = new URLSearchParams(location.search);
  self.firebaseConfig = Object.fromEntries(urlParams);
});

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// Initialize Firebase app
firebase.initializeApp(self.firebaseConfig || defaultConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const isSupported = firebase.messaging.isSupported();
console.log(isSupported);
if (isSupported) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );

    const { title, body } = payload.notification;
    const notificationTitle = title;
    const notificationOptions = {
      body: body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);


  });
}
