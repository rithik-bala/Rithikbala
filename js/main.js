/* =====================================================
   RITHIK BALA PORTFOLIO
   main.js
   Static GitHub Pages Friendly
   ===================================================== */


/* ================================
   Preloader
   ================================ */

const preloader = document.getElementById("preloader");

window.addEventListener("load", () => {
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 450);
});


/* ================================
   Footer Year
   ================================ */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* ================================
   Scroll Progress Bar
   ================================ */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) {
    scrollProgress.style.width = "0%";
    return;
  }

  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();


/* ================================
   Header Scroll State
   ================================ */

const siteHeader = document.getElementById("siteHeader");

function updateHeaderState() {
  if (!siteHeader) return;

  if (window.scrollY > 24) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();


/* ================================
   Mobile Navigation
   ================================ */

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("nav-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navToggle || !navMenu) return;

    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("nav-open");
  });
});


/* ================================
   Theme Toggle
   ================================ */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const root = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
} else {
  root.setAttribute("data-theme", "dark");
  updateThemeIcon("dark");
}

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.textContent = theme === "dark" ? "◐" : "●";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeIcon(nextTheme);
  });
}


/* ================================
   Custom Cursor Glow
   ================================ */

const cursorGlow = document.querySelector(".cursor-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

const isFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cursorGlow && isFinePointer && !prefersReducedMotion) {
  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursorGlow.style.opacity = "1";
    },
    { passive: true }
  );

  window.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });

  function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    cursorGlow.style.transform = `translate(${glowX - 110}px, ${glowY - 110}px)`;

    requestAnimationFrame(animateCursorGlow);
  }

  animateCursorGlow();
} else if (cursorGlow) {
  cursorGlow.style.display = "none";
}


/* ================================
   Reveal On Scroll
   ================================ */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


/* ================================
   Magnetic Button Effect
   ================================ */

const magneticElements = document.querySelectorAll(".btn, .logo, .theme-toggle");

if (isFinePointer && !prefersReducedMotion) {
  magneticElements.forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate(0, 0)";
    });
  });
}


/* ================================
   Card Tilt Effect
   ================================ */

const tiltCards = document.querySelectorAll(
  ".project-card, .cad-card, .skill-card, .about-skill-card, .certificate-card, .identity-card, .focus-card"
);

if (isFinePointer && !prefersReducedMotion) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 6;
      const rotateX = ((y / rect.height) - 0.5) * -6;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}


/* ================================
   Smooth Anchor Scroll
   ================================ */

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});


/* ================================
   Active Nav Link By Current Page
   ================================ */

const currentPage = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});


/* ================================
   Video Optimization
   ================================ */

const heroVideo = document.querySelector(".hero-video video, video.hero-video");

if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.playsInline = true;

  const playVideo = () => {
    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser blocked autoplay. User interaction will allow playback.
      });
    }
  };

  if (document.readyState === "complete") {
    playVideo();
  } else {
    window.addEventListener("load", playVideo);
  }
}


/* ================================
   Lightweight Parallax Elements
   ================================ */

const parallaxElements = document.querySelectorAll(
  ".hero-visual, .profile-visual, .floating-card, .profile-tags"
);

function updateParallax() {
  if (!parallaxElements.length || prefersReducedMotion) return;

  const scrollY = window.scrollY;

  parallaxElements.forEach((element, index) => {
    const speed = 0.025 + index * 0.004;
    element.style.setProperty("--parallax-y", `${scrollY * speed}px`);
  });
}

window.addEventListener("scroll", updateParallax, { passive: true });
updateParallax();


/* ================================
   Page Ready Class
   ================================ */

document.documentElement.classList.add("js-ready");
