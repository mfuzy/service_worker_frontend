/*l
len pre development testovanie, potom tento subor vymazat - pouzije sa build/service-worker.js (po yarn build)
obsah tohto suboru ale skopcit do build/service-worker.js - POZOR: okrem cacheovania, lebo to je uz 
poriesene cez workbox
*/

console.log("public/service-worker.js");

//==========cacheovanie (len pre development testovanie, v produkcii to uz je!)===================

const cacheData = "v1";

//po nainstalovani SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll(["/static/js/main.chunk.js", "/static/js/0.chunk.js", "/static/js/bundle.js", "/index.html", "/"]);
    })
  );
});

//pri requeste
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      if (resp) {
        return resp;
      }
    })
  );
});

//===========================================================================================

//push notification (potom dat do build/service-worker.js)

self.addEventListener("push", (event) => {
  //data pridu ako string, tak ich treba parsovat do objektu
  const data = event.data.json();
  const { title } = data;

  const body = {
    body: data.body,
    icon: data.icon,
  };
  console.log("push received");

  //show notification (zo servera cez service worker do browssera):
  event.waitUntil(self.registration.showNotification(title, body));

  //tuto asi pichnem:  window.location.href = "/";
  //a bude treba asi: self.skipWaiting(); - urobi novy SW aktivny a tak uz budu uzivatelia vidiet novu verziu
});
