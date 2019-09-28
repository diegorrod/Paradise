var http = require("https");
var fs = require("fs");

const urlBase = "https://kit-free.fontawesome.com/algo/2/webfonts/";

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http
    .get(url, function(response) {
      response.pipe(file);
      file.on("finish", function() {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function(err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};

const items = [
  "fa-regular-400-free-5.0.0",
  "fa-regular-400-free-5.0.3",
  "fa-regular-400-free-5.0.5",
  "fa-regular-400-free-5.0.9",
  "fa-regular-400-free-5.0.11",
  "fa-regular-400-free-5.0.13",
  "fa-regular-400-free-5.1.0",
  "fa-regular-400-free-5.1.1",
  "fa-regular-400-free-5.2.0",
  "fa-regular-400-free-5.3.0",
  "fa-regular-400-free-5.5.0",
  "fa-regular-400-free-5.7.0",
  "fa-regular-400-free-5.10.1",
  "fa-regular-400-free-5.10.2",
  "fa-solid-900-free-5.0.0",
  "fa-solid-900-free-5.0.1",
  "fa-solid-900-free-5.0.3",
  "fa-solid-900-free-5.0.5",
  "fa-solid-900-free-5.0.7",
  "fa-solid-900-free-5.0.9",
  "fa-solid-900-free-5.0.10",
  "fa-solid-900-free-5.0.11",
  "fa-solid-900-free-5.0.13",
  "fa-solid-900-free-5.1.0",
  "fa-solid-900-free-5.1.1",
  "fa-solid-900-free-5.2.0",
  "fa-solid-900-free-5.3.0",
  "fa-solid-900-free-5.4.0",
  "fa-solid-900-free-5.5.0",
  "fa-solid-900-free-5.6.0",
  "fa-solid-900-free-5.6.1",
  "fa-solid-900-free-5.6.3",
  "fa-solid-900-free-5.7.0",
  "fa-solid-900-free-5.8.0",
  "fa-solid-900-free-5.8.2",
  "fa-solid-900-free-5.9.0",
  "fa-solid-900-free-5.10.1",
  "fa-solid-900-free-5.10.2"
];

for (const item of items) {
  download(`${urlBase}${item}.eot`, `${item}.eot`, () =>
    console.log(`Descarga finalizada de ${item}.eot`)
  );
  download(`${urlBase}${item}.woff`, `${item}.woff`, () =>
    console.log(`Descarga finalizada de ${item}.woff`)
  );
  download(`${urlBase}${item}.woff2`, `${item}.woff2`, () =>
    console.log(`Descarga finalizada de ${item}.woff2`)
  );
  download(`${urlBase}${item}.ttf`, `${item}.ttf`, () =>
    console.log(`Descarga finalizada de ${item}.ttf`)
  );
  download(`${urlBase}${item}.svg`, `${item}.svg`, () =>
    console.log(`Descarga finalizada de ${item}.svg`)
  );
}
