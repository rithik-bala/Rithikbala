/* =========================================================
   RITHIK BALA — ENGINEERING ARCHIVE PORTFOLIO
   File: js/main.js
   Plain JavaScript only
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initBootLoader();
  initThemeToggle();
  initSystemClock();
  initActiveNav();
  initMobileMenu();
  initScrollProgress();
  initBackToTop();
  initRevealAnimations();
  initCounters();
  initPopupModal();
  initFilters();
  initMarqueeDuplicate();
});

/* -----------------------------
   BOOT LOADER
----------------------------- */

function initBootLoader() {
  const loader = document.querySelector(".boot-loader");

  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 650);
  });
}

/* -----------------------------
   THEME TOGGLE
----------------------------- */

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  const savedTheme = localStorage.getItem("rb-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("rb-theme", isLight ? "light" : "dark");
  });
}

/* -----------------------------
   SYSTEM CLOCK
----------------------------- */

function initSystemClock() {
  const clock = document.getElementById("systemClock");

  if (!clock) return;

  const updateClock = () => {
    const now = new Date();

    const time = now.toLocaleTimeString("en-IN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    clock.textContent = `SYS ${time}`;
  };

  updateClock();
  setInterval(updateClock, 1000);
}

/* -----------------------------
   ACTIVE NAV LINK
----------------------------- */

function initActiveNav() {
  const links = document.querySelectorAll(".nav-link");

  if (!links.length) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* -----------------------------
   MOBILE MENU
----------------------------- */

function initMobileMenu() {
  const button = document.getElementById("mobileMenuBtn");
  const panel = document.getElementById("navPanel");

  if (!button || !panel) return;

  button.addEventListener("click", () => {
    button.classList.toggle("active");
    panel.classList.toggle("active");
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      button.classList.remove("active");
      panel.classList.remove("active");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      button.classList.remove("active");
      panel.classList.remove("active");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      button.classList.remove("active");
      panel.classList.remove("active");
    }
  });
}

/* -----------------------------
   SCROLL PROGRESS
----------------------------- */

function initScrollProgress() {
  const progress = document.querySelector(".scroll-progress span");

  if (!progress) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progressValue = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progress.style.width = `${progressValue}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
}

/* -----------------------------
   BACK TO TOP
----------------------------- */

function initBackToTop() {
  const button = document.querySelector(".back-to-top");

  if (!button) return;

  const toggleButton = () => {
    if (window.scrollY > 500) {
      button.classList.add("visible");
    } else {
      button.classList.remove("visible");
    }
  };

  toggleButton();

  window.addEventListener("scroll", toggleButton, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* -----------------------------
   SCROLL REVEAL
----------------------------- */

function initRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

/* -----------------------------
   COUNTERS
----------------------------- */

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");

  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.count);
    const duration = Number(counter.dataset.duration) || 1200;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easedProgress * target);

      counter.textContent = value.toString().padStart(2, "0");

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toString().padStart(2, "0");
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* -----------------------------
   POPUP / MODAL SYSTEM
----------------------------- */

function initPopupModal() {
  const popupItems = document.querySelectorAll("[data-popup]");
  const modal = document.querySelector(".popup-modal");

  if (!popupItems.length || !modal) return;

  const backdrop = modal.querySelector(".popup-backdrop");
  const closeButton = modal.querySelector(".popup-close");

  const image = modal.querySelector(".popup-image img");
  const title = modal.querySelector(".popup-title");
  const category = modal.querySelector(".popup-category");
  const description = modal.querySelector(".popup-description");
  const tagsContainer = modal.querySelector(".popup-tags");
  const metaContainer = modal.querySelector(".popup-meta");
  const linkButton = modal.querySelector(".popup-link");

  let lastFocusedElement = null;

  const openModal = (item) => {
    lastFocusedElement = document.activeElement;

    const itemTitle = item.dataset.title || "Untitled";
    const itemCategory = item.dataset.category || "Engineering Archive";
    const itemDescription =
      item.dataset.description || "No description added yet.";
    const itemImage = item.dataset.image || "";
    const itemTags = item.dataset.tags || "";
    const itemLink = item.dataset.link || "";

    if (image) {
      image.src = itemImage;
      image.alt = itemTitle;
    }

    if (title) title.textContent = itemTitle;
    if (category) category.textContent = itemCategory;
    if (description) description.textContent = itemDescription;

    if (tagsContainer) {
      tagsContainer.innerHTML = "";

      itemTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .forEach((tag) => {
          const span = document.createElement("span");
          span.textContent = tag;
          tagsContainer.appendChild(span);
        });
    }

    if (metaContainer) {
      metaContainer.innerHTML = "";

      const categoryMeta = document.createElement("span");
      categoryMeta.textContent = `CATEGORY: ${itemCategory}`;
      metaContainer.appendChild(categoryMeta);

      if (itemTags) {
        const tagMeta = document.createElement("span");
        tagMeta.textContent = `TAGS: ${itemTags}`;
        metaContainer.appendChild(tagMeta);
      }
    }

    if (linkButton) {
      if (itemLink) {
        linkButton.href = itemLink;
        linkButton.style.display = "inline-flex";
      } else {
        linkButton.style.display = "none";
      }
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (closeButton) closeButton.focus();
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  popupItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");

    item.addEventListener("click", () => openModal(item));

    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(item);
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* -----------------------------
   FILTER BUTTONS
----------------------------- */

function initFilters() {
  const filterBars = document.querySelectorAll("[data-filter-bar]");

  if (!filterBars.length) return;

  filterBars.forEach((bar) => {
    const buttons = bar.querySelectorAll(".filter-btn");
    const targetSelector = bar.dataset.target;
    const cards = document.querySelectorAll(targetSelector);

    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterValue = button.dataset.filter || "all";

        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        cards.forEach((card) => {
          const cardCategory = card.dataset.filter || "";

          if (filterValue === "all" || cardCategory.includes(filterValue)) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  });
}

/* -----------------------------
   MARQUEE DUPLICATE SUPPORT
----------------------------- */

function initMarqueeDuplicate() {
  const marquees = document.querySelectorAll("[data-marquee]");

  marquees.forEach((track) => {
    if (track.dataset.duplicated === "true") return;

    const children = Array.from(track.children);

    children.forEach((child) => {
      const clone = child.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    track.dataset.duplicated = "true";
  });
}


/* -----------------------------
   FOOTER YEAR + LEGACY HEADER COMPATIBILITY
----------------------------- */

(function initFooterYearAndLegacySupport() {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const legacyClock = document.querySelector("[data-system-time]");
  if (legacyClock) {
    const updateLegacyClock = () => {
      legacyClock.textContent = new Date().toLocaleTimeString("en-IN", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    };
    updateLegacyClock();
    setInterval(updateLegacyClock, 1000);
  }

  const legacyThemeToggle = document.querySelector(".theme-toggle:not(#themeToggle)");
  if (legacyThemeToggle && !legacyThemeToggle.dataset.bound) {
    legacyThemeToggle.dataset.bound = "true";
    legacyThemeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("rb-theme", isLight ? "light" : "dark");
    });
  }

  const legacyNavToggle = document.querySelector(".nav-toggle");
  const legacyNavPanel = document.querySelector("header .nav-panel");
  if (legacyNavToggle && legacyNavPanel && !legacyNavToggle.dataset.bound) {
    legacyNavToggle.dataset.bound = "true";
    legacyNavToggle.addEventListener("click", () => {
      legacyNavToggle.classList.toggle("active");
      legacyNavPanel.classList.toggle("active");
      legacyNavToggle.setAttribute(
        "aria-expanded",
        legacyNavToggle.classList.contains("active") ? "true" : "false"
      );
    });
  }
})();
