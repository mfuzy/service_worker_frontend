//len pre development testovanie, potom tento subor vymazat - pouzije sa src/serviceWorker.js, kde je to uz vsteko poriesene

import axios from "axios";

//public key, ktory bude na back-ende vygenerovany cez webpush.generateVAPIDKeys():
const vapidPublicKey = "BGOEJ3Rf9--QkRRZqx9bQP2WQhs-VPmMvg-mIgtvMl8vLa2l7eemlw3PUwgJMyWyy1S86TA7sxf7VKfyMrI0_A8";

const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

export function register() {
  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  navigator.serviceWorker.register(swUrl).then((registration) => {
    console.log("SW registered: ", registration);

    //register push and send to server:
    registration.pushManager
      .subscribe({
        userVisibleOnly: true, //always display notifications
        applicationServerKey: convertedVapidKey,
      })
      .then((subscription) => axios.post("/subscribe", subscription))
      .catch((err) => console.error("Push subscription error: ", err));
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
