/* ============================================================
   ALI RAZA — PORTFOLIO — MAIN JS
   Vanilla JavaScript — no dependencies
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADER
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 1800);


  /* ---------------------------------------------------------
     2. NAVBAR — scroll blur + active link highlight
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  function handleActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleActiveLink();
    updateScrollProgress();
    toggleBackToTop();
  });

  handleNavbarScroll();
  handleActiveLink();


  /* ---------------------------------------------------------
     3. MOBILE MENU
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });


  /* ---------------------------------------------------------
     4. THEME TOGGLE (Dark / Light)
  --------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyStoredTheme() {
    let saved = 'dark';
    try { saved = window.localStorage.getItem('portfolio-theme') || 'dark'; }
    catch (e) { /* storage unavailable, default to dark */ }
    if (saved === 'light') root.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      try { window.localStorage.setItem('portfolio-theme', 'dark'); } catch (e) { }
    } else {
      root.setAttribute('data-theme', 'light');
      try { window.localStorage.setItem('portfolio-theme', 'light'); } catch (e) { }
    }
  });

  applyStoredTheme();


  /* ---------------------------------------------------------
     5. SCROLL PROGRESS BAR
  --------------------------------------------------------- */
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  }

  updateScrollProgress();


  /* ---------------------------------------------------------
     6. BACK TO TOP BUTTON
  --------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 500) { backToTop.classList.add('show'); } else { backToTop.classList.remove('show'); }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleBackToTop();


  /* ---------------------------------------------------------
     7. TYPING EFFECT (Hero headline)
  --------------------------------------------------------- */
  const typedEl = document.getElementById('typedText');
  const words = ['Websites', 'Business Sites', 'Landing Pages', 'Portfolio Pages', 'Dashboard'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeLoop, isDeleting ? 45 : 85);
  }

  if (typedEl) typeLoop();


  /* ---------------------------------------------------------
     8. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ---------------------------------------------------------
     9. ANIMATED COUNTERS (Stats)
  --------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1400;
      const startTime = performance.now();

      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsBar);
  }


  /* ---------------------------------------------------------
     10. SKILL BARS FILL ON SCROLL
  --------------------------------------------------------- */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = `${width}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(el => skillObserver.observe(el));


  /* ---------------------------------------------------------
     11. PROJECT FILTERING
  --------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        card.classList.toggle('filtered-out', !shouldShow);
      });
    });
  });


  /* ---------------------------------------------------------
     12. TESTIMONIAL SLIDER (auto-slide)
  --------------------------------------------------------- */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let activeIndex = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => card.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    activeIndex = index;
  }

  function nextTestimonial() {
    const next = (activeIndex + 1) % testimonialCards.length;
    showTestimonial(next);
  }

  function startTestimonialAutoplay() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function resetTestimonialAutoplay() {
    clearInterval(testimonialInterval);
    startTestimonialAutoplay();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showTestimonial(parseInt(dot.getAttribute('data-index'), 10));
      resetTestimonialAutoplay();
    });
  });

  if (testimonialCards.length) startTestimonialAutoplay();


  /* ---------------------------------------------------------
     13. CONTACT FORM VALIDATION
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function setError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(`${inputId}Error`);
    const group = input.closest('.form-group');
    if (message) {
      group.classList.add('error');
      errorEl.textContent = message;
    } else {
      group.classList.remove('error');
      errorEl.textContent = '';
    }
  }

  function validateForm() {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {
      setError('name', 'Please enter your full name.');
      isValid = false;
    } else {
      setError('name', '');
    }

    if (!emailPattern.test(email)) {
      setError('email', 'Please enter a valid email address.');
      isValid = false;
    } else {
      setError('email', '');
    }

    if (subject.length < 3) {
      setError('subject', 'Please enter a subject.');
      isValid = false;
    } else {
      setError('subject', '');
    }

    if (message.length < 10) {
      setError('message', 'Message should be at least 10 characters.');
      isValid = false;
    } else {
      setError('message', '');
    }

    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validateForm()) {
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      } else {
        formSuccess.classList.remove('show');
      }
    });

    ['name', 'email', 'subject', 'message'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => setError(id, ''));
    });
  }


  /* ---------------------------------------------------------
     14. SMOOTH SCROLL FOR ANCHOR LINKS (with navbar offset)
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});