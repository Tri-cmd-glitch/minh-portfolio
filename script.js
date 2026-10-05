/**
 * Nguyen Gia Minh — Portfolio Interaction Scripts
 * Pure vanilla JavaScript with progressive enhancement.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mark document as JS ready for smooth progressive reveals
  document.documentElement.classList.add("js-ready");

  // Dynamic Year in footer
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 1. Scroll Progress Indicator
  const progressBar = document.getElementById("scroll-progress");
  const updateScrollProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }
  };
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  // 2. IntersectionObserver for Editorial Scroll Reveals
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("revealed");
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.getElementById("main-navigation");

  if (menuToggle && mainNav) {
    const closeMenu = () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "[ MENU + ]";
    };

    const openMenu = () => {
      mainNav.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.textContent = "[ CLOSE × ]";
    };

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when clicking nav links
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Close when clicking outside of nav
    document.addEventListener("click", (e) => {
      if (mainNav.classList.contains("is-open") && !mainNav.contains(e.target) && e.target !== menuToggle) {
        closeMenu();
      }
    });
  }

  // 4. Back To Top Button
  const backToTopBtn = document.querySelector(".back-to-top-btn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
