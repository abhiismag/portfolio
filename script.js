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
});
