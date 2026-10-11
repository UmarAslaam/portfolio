(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  var links = menu.querySelectorAll("a:not(.btn)");
  var skills = document.querySelector(".skills");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });

    var barObs = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { skills.classList.add("in"); barObs.disconnect(); }
    }, { threshold: 0.3 });
    barObs.observe(skills);
  } else {
    skills.classList.add("in");
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var rules = {
    name: function (v) { return v.trim().length >= 2 ? "" : "Enter your full name (at least 2 characters)."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address, like name@example.com."; },
    message: function (v) { return v.trim().length >= 20 ? "" : "Write at least 20 characters so I know how to help."; }
  };

  function check(field) {
    var input = form.elements[field];
    var msg = rules[field](input.value);
    input.closest(".field").classList.toggle("invalid", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    document.getElementById(field + "-err").textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach(function (f) {
    form.elements[f].addEventListener("blur", function () { check(f); });
    form.elements[f].addEventListener("input", function () {
      if (form.elements[f].closest(".field").classList.contains("invalid")) check(f);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var results = Object.keys(rules).map(check);
    status.className = "form__status";
    if (results.indexOf(false) !== -1) {
      status.textContent = "Fix the highlighted fields and send again.";
      status.classList.add("error");
      form.querySelector(".invalid input, .invalid textarea").focus();
      return;
    }
    // No backend yet: connect Formspree or Netlify Forms here to deliver messages.
    status.textContent = "Message sent. Thanks " + form.elements.name.value.trim().split(" ")[0] + ", I'll reply soon.";
    form.reset();
  });
})();
