//len pre development testovanie, potom tento subor vymazat - pouzije sa src/serviceWorker.js, kde je to uz vsteko poriesene

//public key, ktory bude na back-ende vygenerovany cez webpush.generateVAPIDKeys():
const vapidPublicKey = "BM-mBIDEPdDrpp5QLDPcfDI25kd5HnPKSn-3_iqvVPA0rIKloATziPciNfDs5F0q-YhfuakJ-84QX5fiFRdnJCI";

const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

export function register() {
  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  navigator.serviceWorker.register(swUrl).then((reg) => {
    console.log("SW registered: ", reg);

    //register push:
    reg.pushManager.subscribe({
      userVisibleOnly: true, //always display notifications
      applicationServerKey: convertedVapidKey,
    });
    /*
    ked bude backend:
    .then(subscription => axios.post("/adresa/xyz", subscription))
    .catch(err => console.error("Push subscription error: ", err))
    */
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
