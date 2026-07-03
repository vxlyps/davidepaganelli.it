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

  function elbow(fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(fromX, toY);
    ctx.lineTo(toX, toY);
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

    var nx = name.offsetLeft;
    var ny = name.offsetTop + name.offsetHeight + 4;

    sections.forEach(function (sec) {
      if (!visible(sec)) return;
      var midY = sec.offsetTop + sec.offsetHeight / 2;
      elbow(nx, ny, sec.offsetLeft - 16, midY);
    });

    Object.keys(branches).forEach(function (key) {
      var sec = $(key);
      if (!visible(sec)) return;
      var sx = sec.offsetLeft;
      var sy = sec.offsetTop + sec.offsetHeight + 2;
      branches[key].forEach(function (sub) {
        if (!visible(sub)) return;
        var midY = sub.offsetTop + sub.offsetHeight / 2;
        elbow(sx, sy, sub.offsetLeft - 16, midY);
      });
    });
  }

  setInterval(draw, 90);
})();
