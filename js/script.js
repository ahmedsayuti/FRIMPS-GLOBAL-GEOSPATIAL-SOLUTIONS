// Initialize animations when document is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation menu functionality
  initNavigation();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize interactive elements
  initInteractiveElements();

  // Initialize hero animation
  initHeroAnimation();
});

// Navigation menu functionality
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Change navbar style on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "0.5rem 0";
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.padding = "1rem 0";
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  });
}

// Scroll animations using Anime.js
function initScrollAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(
    ".service-card, .news-item, .stat, .badge"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Use Anime.js for smooth entrance animations
          anime({
            targets: entry.target,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: "easeOutCubic",
          });

          // If it's a stat element, animate the counting
          if (entry.target.classList.contains("stat")) {
            animateValue(entry.target.querySelector(".stat-number"));
          }

          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Animate counting numbers
function animateValue(element) {
  const finalValue = parseInt(element.getAttribute("data-count"));
  const duration = 2000; // Duration in ms
  const interval = 20; // Update every 20ms
  const steps = duration / interval;
  const increment = finalValue / steps;
  let currentValue = 0;

  const timer = setInterval(function () {
    currentValue += increment;
    if (currentValue >= finalValue) {
      clearInterval(timer);
      currentValue = finalValue;
    }
    element.textContent = Math.round(currentValue);
  }, interval);
}

// Initialize interactive elements
function initInteractiveElements() {
  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      anime({
        targets: this.querySelector(".service-icon"),
        scale: 1.1,
        duration: 300,
        easing: "easeInOutQuad",
      });
    });

    card.addEventListener("mouseleave", function () {
      anime({
        targets: this.querySelector(".service-icon"),
        scale: 1,
        duration: 300,
        easing: "easeInOutQuad",
      });
    });
  });

  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple form validation
      const formData = new FormData(contactForm);
      let isValid = true;

      contactForm.querySelectorAll("[required]").forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "#ddd";
        }
      });

      if (isValid) {
        // Simulate form submission success
        anime({
          targets: contactForm,
          opacity: 0,
          duration: 500,
          complete: function () {
            contactForm.innerHTML =
              '<p class="success-message">Thank you for your message! We will get back to you soon.</p>';
            anime({
              targets: contactForm.querySelector(".success-message"),
              opacity: [0, 1],
              duration: 500,
            });
          },
        });
      }
    });
  }
}

// Hero section animation
function initHeroAnimation() {
  // Animate the globe element
  const globe = document.getElementById("animatedGlobe");

  if (globe) {
    // Create floating animation
    anime({
      targets: globe,
      translateY: [-20, 20],
      duration: 3000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });

    // Add rotating effect
    anime({
      targets: globe,
      rotate: 360,
      duration: 40000,
      loop: true,
      easing: "linear",
    });

    // Add pulsing effect
    anime({
      targets: globe,
      scale: [1, 1.05],
      duration: 2000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }

  // Animate hero text
  anime({
    targets: ".hero-title, .hero-subtitle",
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1200,
    delay: anime.stagger(200),
    easing: "easeOutCubic",
  });

  // Animate buttons
  anime({
    targets: ".hero-buttons a",
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: 800,
    easing: "easeOutCubic",
  });
}

// Additional utility function for scroll-triggered animations
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// about-scripts.js
// Animation scripts for About page

document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation (same as homepage)
  initNavigation();

  // Initialize scroll animations
  initAboutAnimations();

  // Initialize counter animations
  initCounters();
});

// About page specific animations
function initAboutAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(
    ".mission-content, .team-member, .timeline-item, .value-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute("data-animation");
          if (animation) {
            entry.target.classList.add(animation);
          }

          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    // Add delay based on index for staggered animation
    item.style.animationDelay = `${index * 0.3}s`;
  });
}

// Animate statistic counters
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

function animateValue(element) {
  const finalValue = parseInt(element.getAttribute("data-count"));
  const duration = 2000;
  const interval = 20;
  const steps = duration / interval;
  const increment = finalValue / steps;
  let currentValue = 0;

  const timer = setInterval(function () {
    currentValue += increment;
    if (currentValue >= finalValue) {
      clearInterval(timer);
      currentValue = finalValue;
    }
    element.textContent = Math.round(currentValue);
  }, interval);
}
// media-scripts.js
// Animation scripts for Media & Recognition page

document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation (same as homepage)
  initNavigation();

  // Initialize scroll animations
  initMediaAnimations();

  // Initialize interactive elements
  initMediaInteractions();
});

// Media page specific animations
function initMediaAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(
    ".award-card, .press-item, .conference-item, .news-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute("data-animation");
          if (animation) {
            entry.target.classList.add(animation);
          }

          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Trophy animation in hero
  const trophy = document.getElementById("trophyAnimation");
  if (trophy) {
    // Create rotating trophy animation
    anime({
      targets: trophy,
      rotateY: 360,
      duration: 8000,
      loop: true,
      easing: "linear",
    });
  }
}

// Initialize interactive elements
function initMediaInteractions() {
  // Press item hover effects
  const pressItems = document.querySelectorAll(".press-item");
  pressItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      anime({
        targets: this,
        scale: 1.02,
        duration: 300,
        easing: "easeInOutQuad",
      });
    });

    item.addEventListener("mouseleave", function () {
      anime({
        targets: this,
        scale: 1,
        duration: 300,
        easing: "easeInOutQuad",
      });
    });
  });

  // Award card hover effects
  const awardCards = document.querySelectorAll(".award-card");
  awardCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      anime({
        targets: this.querySelector(".award-badge"),
        scale: 1.1,
        duration: 300,
        easing: "easeInOutQuad",
      });
    });

    card.addEventListener("mouseleave", function () {
      anime({
        targets: this.querySelector(".award-badge"),
        scale: 1,
        duration: 300,
        easing: "easeInOutQuad",
      });
    });
  });
}

// services-scripts.js
// Animation scripts for Services page

document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation (same as other pages)
  initNavigation();

  // Initialize services animations
  initServicesAnimations();

  // Initialize interactive elements
  initServicesInteractions();
});

// Services page specific animations
function initServicesAnimations() {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(
    ".service-category, .service-point, .visual-container, .case-study, .process-step"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute("data-animation");
          if (animation) {
            entry.target.classList.add(animation);
          }

          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Service animation in hero
  const serviceAnimation = document.getElementById("serviceAnimation");
  if (serviceAnimation) {
    // Create data points animation
    anime({
      targets: "#dataPoints::before, #dataPoints::after",
      keyframes: [
        { translateX: -20, translateY: -10, duration: 1000 },
        { translateX: 15, translateY: 20, duration: 1000 },
        { translateX: -10, translateY: 15, duration: 1000 },
        { translateX: 0, translateY: 0, duration: 1000 },
      ],
      loop: true,
      easing: "easeInOutSine",
    });

    // Create analysis layer animation
    anime({
      targets: "#analysisLayer",
      background: [
        {
          value:
            "radial-gradient(circle at 30% 30%, rgba(42, 157, 143, 0.2) 0%, transparent 50%)",
          duration: 2000,
        },
        {
          value:
            "radial-gradient(circle at 70% 70%, rgba(42, 157, 143, 0.2) 0%, transparent 50%)",
          duration: 2000,
        },
        {
          value:
            "radial-gradient(circle at 50% 50%, rgba(42, 157, 143, 0.2) 0%, transparent 50%)",
          duration: 2000,
        },
      ],
      loop: true,
      easing: "easeInOutSine",
    });
  }
}

// Initialize interactive elements
function initServicesInteractions() {
  // Service category hover effects
  const serviceCategories = document.querySelectorAll(".service-category");
  serviceCategories.forEach((category) => {
    category.addEventListener("mouseenter", function () {
      anime({
        targets: this.querySelector(".category-icon"),
        scale: 1.1,
        rotate: 5,
        duration: 300,
        easing: "easeInOutQuad",
      });
    });

    category.addEventListener("mouseleave", function () {
      anime({
        targets: this.querySelector(".category-icon"),
        scale: 1,
        rotate: 0,
        duration: 300,
        easing: "easeInOutQuad",
      });
    });
  });

  // Case study click interaction
  const caseStudies = document.querySelectorAll(".case-study");
  caseStudies.forEach((study) => {
    study.addEventListener("click", function (e) {
      if (!e.target.closest(".case-link")) {
        this.classList.toggle("active");

        if (this.classList.contains("active")) {
          anime({
            targets: this.querySelector(".case-content"),
            height: "auto",
            opacity: 1,
            duration: 500,
            easing: "easeInOutQuad",
          });
        } else {
          anime({
            targets: this.querySelector(".case-content"),
            height: 0,
            opacity: 0,
            duration: 500,
            easing: "easeInOutQuad",
          });
        }
      }
    });
  });

  // Smooth scrolling for service category links
  document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });
}
