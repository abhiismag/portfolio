document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-links');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Mobile nav toggle
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
  });

  // Handle nav link clicks with smooth scrolling and close mobile menu
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // prevent default anchor jump
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      // close mobile navigation if open
      navMenu.classList.remove('show');
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .timeline-item, .project-card').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });

  // Highlight nav link on scroll
  function setActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Change nav style on scroll and show/hide scrollTop button
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    setActiveNav();
    toggleScrollTopBtn();
  }

  function toggleScrollTopBtn() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll);

  // Animate publication metrics when they enter the viewport
  const metricNumbers = document.querySelectorAll('.metric-number');
  if (metricNumbers.length) {
    const metricsObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          const targetValue = parseInt(entry.target.getAttribute('data-target'), 10);
          let currentValue = 1;
          // Determine a suitable increment to finish in ~2 seconds
          const totalSteps = 100;
          const increment = Math.max(1, Math.floor(targetValue / totalSteps));
          const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
              entry.target.textContent = targetValue + '+';
              clearInterval(interval);
            } else {
              entry.target.textContent = currentValue;
            }
          }, 20);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    metricNumbers.forEach(num => metricsObserver.observe(num));
  }
});
