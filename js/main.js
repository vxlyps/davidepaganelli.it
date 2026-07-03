/* ============================================
   DAVIDE PAGANELLI — slideshow + no-signal
   ============================================
   Slideshows auto-discover images named
   <prefix>-01.jpg ... <prefix>-10.jpg inside
   their data-dir folder. Just upload the files
   with those names — no code changes needed.
   ============================================ */

// "NO SIGNAL" placeholder shown while an image is missing
function noSignal() {
  var el = document.createElement("div");
  el.className = "no-signal";
  el.innerHTML = '<span class="bar"></span><span>NO SIGNAL</span><span class="bar"></span>';
  return el;
}

// rainbow-letter <h1 class="rainbow" id="rainbow-title">, Geocities-style
(function () {
  var el = document.getElementById("rainbow-title");
  if (!el) return;
  var text = "DAVIDE PAGANELLI";
  text.split("").forEach(function (ch) {
    var span = document.createElement("span");
    span.textContent = ch === " " ? " " : ch;
    el.appendChild(span);
  });
})();

// fake hit counter, persisted per-browser via localStorage
(function () {
  var el = document.getElementById("hitcount");
  if (!el) return;
  var BASE = 4217;
  var count = parseInt(localStorage.getItem("dp_hits"), 10);
  if (isNaN(count)) count = BASE;
  count += 1;
  localStorage.setItem("dp_hits", count);
  el.textContent = String(count).padStart(6, "0");
})();

(function () {
  var MAX_IMAGES = 10;      // tries <prefix>-01 .. <prefix>-10
  var INTERVAL = 3000;      // ms between slides

  document.querySelectorAll(".slideshow").forEach(function (box) {
    var dir = box.dataset.dir;
    var prefix = box.dataset.prefix;
    var loaded = [];
    var pending = MAX_IMAGES;

    function done() {
      if (--pending > 0) return;
      // keep original numeric order
      loaded.sort(function (a, b) { return a.dataset.n - b.dataset.n; });
      if (loaded.length === 0) {
        box.appendChild(noSignal());
        return;
      }
      loaded.forEach(function (img) { box.appendChild(img); });
      var i = 0;
      loaded[0].classList.add("on");
      if (loaded.length > 1) {
        setInterval(function () {
          loaded[i].classList.remove("on");
          i = (i + 1) % loaded.length;
          loaded[i].classList.add("on");
        }, INTERVAL);
      }
    }

    for (var n = 1; n <= MAX_IMAGES; n++) {
      (function (n) {
        var img = new Image();
        var num = (n < 10 ? "0" : "") + n;
        img.src = dir + "/" + prefix + "-" + num + ".jpg";
        img.alt = prefix.toUpperCase() + " " + num;
        img.dataset.n = n;
        img.onload = function () { loaded.push(img); done(); };
        img.onerror = function () { done(); };
      })(n);
    }
  });
})();
