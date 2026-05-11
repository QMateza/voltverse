"use strict";

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const fadeInTop = document.querySelectorAll(".fade-in-top");
const fadeInBottom = document.querySelectorAll(".fade-in-bottom");
const fadeInLeft = document.querySelectorAll(".fade-in-left");
const fadeInRight = document.querySelectorAll(".fade-in-right");

const counters = document.querySelectorAll(".counter");

const animatedElements = [
  ...fadeInTop,
  ...fadeInBottom,
  ...fadeInLeft,
  ...fadeInRight,
];

// Counter logic (kept separate for clarity)
const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const suffix = counter.getAttribute("data-suffix") || "";
  const speed = 200;

  const updateCount = () => {
    let count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target + suffix;
    }
  };

  updateCount();
};

// Single observer for EVERYTHING
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // 1. Handle fade-in animations
      el.classList.add("is-visible");

      // 2. Handle counters (only if element is a counter)
      if (el.classList.contains("counter")) {
        startCounter(el);
      }

      // Stop observing after trigger
      obs.unobserve(el);
    });
  },
  {
    threshold: 0.2,
  },
);

// Observe all elements in one pass
[...animatedElements, ...counters].forEach((el) => observer.observe(el));

const navSlide = () => {
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  nav.classList.toggle("nav-active");

  navLinks.forEach((link, index) => {
    if (window.innerWidth < 768) {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    }
  });

  /* Burger animation */
  burger.classList.toggle("toggle");
};

const createEventListeners = () => {
  if (window.addEventListener) {
    burger.addEventListener("click", navSlide, false);
  } else if (window.attachEvent) {
    burger.attachEvent("click", navSlide);
  }

  if (window.addEventListener) {
    nav.addEventListener("click", navSlide, false);
  } else if (window.attachEvent) {
    nav.attachEvent("click", navSlide);
  }
};

const setupPage = () => {
  createEventListeners();
};

if (window.addEventListener) {
  window.addEventListener("load", setupPage, false);
} else if (window.attachEvent) {
  window.attachEvent("load", setupPage);
}
