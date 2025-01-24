const expectedCaches = ["static-v2"];

self.addEventListener("install", (event) => {
  console.log("V1 installing…");

  // cache a cat SVG
  event.waitUntil(
    caches.open("static-v1").then((cache) => cache.add("/cat.svg"))
  );
});

self.addEventListener("activate", (event) => {
  console.log("V1 now ready to handle fetches!");
  //   clients.claim(); // activates immediately
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // serve the cat from the cache if the request is
  // same-origin and the path is '/horse.png'
  if (url.origin == location.origin && url.pathname == "/dog.svg") {
    event.respondWith(caches.match("/cat.svg"));
  }
});
