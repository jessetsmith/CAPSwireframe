window.addEventListener("scroll", () => {
  const pinwheel = document.getElementById("pinwheel");
  const pinwheelSmall = document.getElementById("pinwheel-small");
  const rotation = window.scrollY % 360;
  if (pinwheel) pinwheel.style.transform = `rotate(${rotation}deg)`;
  if (pinwheelSmall) pinwheelSmall.style.transform = `rotate(${-rotation}deg)`;
});

// Parallax and scale effect for .parallax-cinematic
window.addEventListener("scroll", function () {
  const section = document.querySelector(".parallax-cinematic");
  if (!section) return;

  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY || window.pageYOffset;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  // How far into the section have we scrolled? (0 = top, 1 = bottom)
  let progress =
    (scrollY + windowHeight - sectionTop) / (sectionHeight + windowHeight);
  progress = Math.max(0, Math.min(1, progress));

  // Parallax: each layer moves at a different speed
  const bg = document.querySelector(".parallax-bg");
  const family = document.querySelector(".parallax-family");
  const leaves = document.querySelector(".parallax-leaves");

  if (bg)
    bg.style.transform = `translateY(${progress * 30}px) scale(${
      1 + progress * 0.15
    })`;
  if (family)
    family.style.transform = `translateY(${progress * 60}px) scale(${
      1 + progress * 0.22
    })`;
  if (leaves)
    leaves.style.transform = `translateY(${progress * 90}px) scale(${
      1 + progress * 0.3
    })`;
});

// Parallax and scale effect for .snow-cinematic
window.addEventListener("scroll", function () {
  const section = document.querySelector(".snow-cinematic");
  if (!section) return;

  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY || window.pageYOffset;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  // How far into the section have we scrolled? (0 = top, 1 = bottom)
  let progress =
    (scrollY + windowHeight - sectionTop) / (sectionHeight + windowHeight);
  progress = Math.max(0, Math.min(1, progress));

  // Parallax: each layer moves at a different speed horizontally
  const bg = document.querySelector(".snow-bg");
  const family = document.querySelector(".snow-family");
  const flakes = document.querySelector(".snow-flakes");

  if (bg)
    bg.style.transform = `translateX(${progress * 30}px) scale(${
      1 + progress * 0.15
    })`;
  if (family)
    family.style.transform = `translateX(${progress * 60}px) scale(${
      1 + progress * 0.22
    })`;
  if (flakes)
    flakes.style.transform = `translateX(${progress * 90}px) scale(${
      1 + progress * 0.3
    })`;
});

// Expand/collapse for each value in Values card
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".value-header").forEach(function (headerBtn) {
    headerBtn.addEventListener("click", function (e) {
      const targetId = headerBtn.getAttribute("data-target");
      const overlay = document.getElementById(targetId);
      if (overlay) {
        overlay.classList.add("active");
        headerBtn.setAttribute("aria-expanded", "true");
      }
      e.stopPropagation(); // Prevent document click from firing
    });
  });

  document
    .querySelectorAll(".value-overlay .close-btn")
    .forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        const overlay = closeBtn.closest(".value-overlay");
        if (overlay) {
          overlay.classList.remove("active");
          // Set aria-expanded back to false for the corresponding header
          const valueItem = overlay.closest(".value-item");
          if (valueItem) {
            const headerBtn = valueItem.querySelector(".value-header");
            if (headerBtn) headerBtn.setAttribute("aria-expanded", "false");
          }
        }
        e.stopPropagation(); // Prevent document click from firing
      });
    });

  // Close overlay when clicking outside
  document.addEventListener("click", function (e) {
    document
      .querySelectorAll(".value-overlay.active")
      .forEach(function (overlay) {
        // Find the corresponding header button
        const valueItem = overlay.closest(".value-item");
        const headerBtn = valueItem
          ? valueItem.querySelector(".value-header")
          : null;
        // If the click is not inside the overlay or the header button, close it
        if (
          !overlay.contains(e.target) &&
          (!headerBtn || !headerBtn.contains(e.target))
        ) {
          overlay.classList.remove("active");
          if (headerBtn) headerBtn.setAttribute("aria-expanded", "false");
        }
      });
  });
});

// Count up animation for impact stats
function animateCountUp(el, target, duration = 1500) {
  let start = 0;
  let startTime = null;
  function updateCount(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    el.textContent = value.toLocaleString() + "+";
    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      el.textContent = target.toLocaleString() + "+";
    }
  }
  requestAnimationFrame(updateCount);
}

function runImpactStatsCountUp() {
  document.querySelectorAll(".impact-stat-number").forEach((el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    if (!isNaN(target)) {
      animateCountUp(el, target);
    }
  });
}

// Use Intersection Observer to trigger animation when section is in view
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".impact-stats-section");
  let hasAnimated = false;
  if (section) {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          runImpactStatsCountUp();
          hasAnimated = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  }
});

// Footer dropdowns for mobile
document.querySelectorAll(".footer-dropdown-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const parent = btn.parentElement;
    parent.classList.toggle("open");
  });
});

// Values Modal Pinwheel
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.querySelector(".open-values-modal-btn");
  const modal = document.getElementById("values-modal");
  const closeBtn = document.querySelector(".values-modal-close");

  function closeModal() {
    modal.classList.remove("active");
  }

  if (openBtn && modal) {
    openBtn.addEventListener("click", function () {
      modal.classList.add("active");
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", closeModal);
  }
  // Close modal when clicking outside content
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  // Optional: close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});

// Value Pinwheel Modal Logic
document.addEventListener("DOMContentLoaded", function () {
  // Value data
  const valueData = {
    hope: {
      title: "Rooted in Hope",
      desc: "Although many of the children we serve have experienced abuse, we remain optimistic that our work at CAPS can make a difference in preventing child abuse, one child at a time.",
    },
    excellence: {
      title: "Called to Excellence",
      desc: "Grounded in our belief that every child deserves safety and love, we are dedicated to maintaining the highest standards in our work.",
    },
    relationships: {
      title: "Committed to Relationships",
      desc: "We recognize that meaningful impact stems from strong relationships, so we intentionally nurture connections with the children and families we serve, as well as with our colleagues, partners, and community.",
    },
  };

  const modal = document.getElementById("value-pinwheel-modal");
  const closeBtn = document.querySelector(".value-pinwheel-modal-close");
  const titleEl = document.getElementById("value-modal-title");
  const descEl = document.getElementById("value-modal-desc");

  document.querySelectorAll(".value-header").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const key = btn.getAttribute("data-value");
      if (valueData[key]) {
        titleEl.textContent = valueData[key].title;
        descEl.textContent = valueData[key].desc;
        modal.classList.add("active");
      }
    });
  });

  function closeModal() {
    modal.classList.remove("active");
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener("click", closeModal);
  }
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const pinwheelContainer = document.querySelector(".pinwheel-container");
  const overlay = pinwheelContainer?.querySelector(".pinwheel-reveal-overlay");
  if (!hero || !overlay || !pinwheelContainer) return;

  const heroRect = hero.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  let progress =
    1 -
    Math.max(
      0,
      Math.min(1, (heroRect.bottom - windowHeight) / heroRect.height)
    );

  // Clamp progress between 0 and 1
  progress = Math.max(0, Math.min(1, progress));

  // Move overlay down from 0 to 100% of pinwheel container height
  const maxMove = pinwheelContainer.offsetHeight;
  overlay.style.transform = `translateY(${progress * maxMove}px)`;

  // Remove parallax from next section
  const nextSection = document.querySelector(
    ".hero + .placeholder-section, .hero + .cards-section, .hero + section"
  );
  if (nextSection) {
    nextSection.style.transform = "none";
  }
});
