/* ============================================
   DAVIDE PAGANELLI — index map
   canvas connector lines + static noise,
   click to reveal branches
   ============================================ */

(function () {
  var canvas = document.getElementById("bg");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var RED = "#ff1e1e";

  var $ = function (id) { return document.getElementById(id); };

  var name = $("name");
  var sections = [$("about"), $("video"), $("magazine"), $("contacts")];
  var branches = {
    video: ["v1", "v2", "v3"].map($),
    magazine: ["g1", "g2", "g3", "g4"].map($),
    contacts: ["c1", "c2"].map($)
  };

  function visible(el) { return !el.classList.contains("hidden"); }

  function toggleAll(els, force) {
    els.forEach(function (el) {
      if (force === "hide") el.classList.add("hidden");
      else el.classList.toggle("hidden");
    });
  }

  // clicking the name folds/unfolds everything
  name.addEventListener("click", function () {
    var anyVisible = sections.some(visible);
    if (anyVisible) {
      sections.forEach(function (el) { el.classList.add("hidden"); });
      Object.keys(branches).forEach(function (k) { toggleAll(branches[k], "hide"); });
    } else {
      sections.forEach(function (el) { el.classList.remove("hidden"); });
    }
  });

  // clicking a section unfolds its branch
  Object.keys(branches).forEach(function (key) {
    $(key).addEventListener("click", function () { toggleAll(branches[key]); });
  });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // straight constellation line between the facing edges of two elements
  function link(fromEl, toEl) {
    var a = fromEl.getBoundingClientRect();
    var b = toEl.getBoundingClientRect();
    var aCx = a.left + a.width / 2;
    var bCx = b.left + b.width / 2;
    var fromX = bCx < aCx ? a.left - 6 : a.right + 6;
    var toX = bCx < aCx ? b.right + 6 : b.left - 6;
    ctx.beginPath();
    ctx.moveTo(fromX, a.top + a.height / 2);
    ctx.lineTo(toX, b.top + b.height / 2);
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // static noise
    for (var i = 0; i < 260; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      ctx.fillStyle = Math.random() < 0.07
        ? "rgba(255,30,30,0.55)"
        : "rgba(255,255,255,0.08)";
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // connector lines
    ctx.strokeStyle = RED;
    ctx.lineWidth = 1;

    sections.forEach(function (sec) {
      if (visible(sec)) link(name, sec);
    });

    Object.keys(branches).forEach(function (key) {
      var sec = $(key);
      if (!visible(sec)) return;
      branches[key].forEach(function (sub) {
        if (visible(sub)) link(sec, sub);
      });
    });
  }

  setInterval(draw, 90);
})();
