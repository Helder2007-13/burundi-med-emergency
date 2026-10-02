/* ============================================
   URGENCES BURUNDI — Comportements partagés
   Révélation au défilement, filtres, onglets, compteurs.
   Sans dépendance. Respecte prefers-reduced-motion.
   ============================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 0. Délégation d'événements ----------
     Sur une page Vue, le montage remplace le DOM de #app : tout
     écouteur posé directement sur un élément est perdu. On écoute
     donc sur document, qui survit au remontage. */
  function delegue(selector, type, handler) {
    document.addEventListener(type, function (e) {
      var el = e.target.closest ? e.target.closest(selector) : null;
      if (el) handler(e, el);
    });
  }

  /* ---------- 1. Révélation au défilement ---------- */
  function reveal() {
    var els = document.querySelectorAll(".ub-reveal");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var d = el.dataset.d || "0";
        el.style.transitionDelay = d + "ms";
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2. Onglets (filtres) ---------- */
  function tabs() {
    delegue("[role=tab]", "click", function (e, btn) {
      var group = btn.closest("[data-tabs]");
      if (!group) return;
      group.querySelectorAll("[role=tab]").forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", on ? "true" : "false");
        var p = document.getElementById(b.dataset.panel);
        if (p) p.hidden = !on;
      });
    });
  }

  /* ---------- 3. Choix uniques (radio en boutons) ---------- */
  function picks() {
    delegue("[data-pick] [aria-pressed]", "click", function (e, btn) {
      var group = btn.closest("[data-pick]");
      if (!group) return;
      var single = group.dataset.pick === "single";
      group.querySelectorAll("[aria-pressed]").forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
      });
      var deja = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", deja && single ? "false" : "true");
    });
  }

  /* ---------- 4. Compteurs animés ---------- */
  function counters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var run = function (el) {
      var to = parseFloat(el.dataset.count);
      if (isNaN(to)) return;
      if (reduce) { el.textContent = String(to); return; }
      var dur = 1100, t0 = null;
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var v = Math.round(to * eased);
        el.textContent = String(v);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. Longueur des tracés SVG animés ---------- */
  function drawLen() {
    document.querySelectorAll("svg.ub-draw").forEach(function (svg) {
      var p = svg.querySelector("path, circle, line, polyline");
      if (!p) return;
      var len = 300;
      try { len = p.getTotalLength(); } catch (e) { /* forme non mesuree */ }
      svg.style.setProperty("--len", Math.ceil(len));
    });
  }

  /* ---------- 6. Heure « en direct » ---------- */
  function clock() {
    var el = document.getElementById("ub-clock");
    if (!el) return;
    var tick = function () {
      var d = new Date();
      el.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()]
        .map(function (n) { return String(n).padStart(2, "0"); })
        .join(":");
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- 7. Bouton de géolocalisation ---------- */
  function geoloc() {
    var btn = document.getElementById("gps");
    if (!btn || btn.dataset.busy) return;
    var origine = btn.innerHTML;
    var champ = document.getElementById("quartier");

    btn.dataset.busy = "1";
    btn.setAttribute("aria-busy", "true");
    btn.style.opacity = ".7";

    var finir = function (texte, ok) {
      btn.innerHTML = texte;
      btn.style.opacity = "";
      btn.removeAttribute("aria-busy");
      delete btn.dataset.busy;
      if (ok && champ) {
        champ.value = "Position obtenue · Nyakabiga, Bujumbura";
        champ.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    if (!navigator.geolocation) {
      finir("Position indisponible · saisissez votre quartier", false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      function () { finir("Position obtenue", true); },
      function () { finir("Position refusée · saisissez votre quartier", false); },
      { timeout: 6000, maximumAge: 60000 }
    );
  }

  /* ---------- 8. Formulaires : état de validation ---------- */
  function validate() {
    delegue("form[data-validate]", "submit", function (e, form) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        /* Une case à cocher est valide quand elle est cochée */
        var vide = f.type === "checkbox" ? !f.checked : !String(f.value || "").trim();
        f.classList.toggle("is-bad", vide);
        f.classList.toggle("is-ok", !vide);
        if (vide && ok) { ok = false; f.focus(); }
      });
      var note = form.querySelector("[data-form-note]");
      if (note) {
        note.hidden = ok;
        note.textContent = ok ? "" :
          (note.dataset.msg || "Complétez les champs obligatoires.");
      }
    });

    /* Retirer l'erreur dès que l'utilisateur corrige le champ */
    delegue("form[data-validate] .is-bad", "input", function (e, f) {
      f.classList.remove("is-bad");
    });
  }

  function boot() {
    drawLen();
    reveal();
    tabs();
    picks();
    counters();
    clock();
    validate();
    delegue("#gps", "click", geoloc);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();