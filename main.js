/* ─── main.js ────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Reveal on scroll (IntersectionObserver) ─────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── 2. Sticky nav: show/hide after hero ─────────────────────── */
  const hero    = document.querySelector('.hero');
  const stickyNav = document.querySelector('.sticky-nav');

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyNav.classList.add('visible');
      } else {
        stickyNav.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  if (hero) heroObserver.observe(hero);


  /* ── 3. Scroll spy: highlight active destination in nav ──────── */
  const sections  = document.querySelectorAll('.destination[data-id]');
  const navPills  = document.querySelectorAll('.nav-pill[data-target]');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.id;
        navPills.forEach(pill => {
          pill.classList.toggle('active', pill.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => spyObserver.observe(sec));


  /* ── 4. Smooth scroll from nav pills ────────────────────────── */
  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = document.getElementById(pill.dataset.target);
      if (target) {
        const offset = stickyNav.offsetHeight + 8;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 5. Route overview stop dots → smooth scroll ────────────── */
  document.querySelectorAll('.stop-dot[data-target]').forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) {
        const offset = stickyNav.offsetHeight + 8;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 6. SVG map route animation + city dots ─────────────────── */
  const mapRoute = document.querySelector('.map-route');
  if (mapRoute) {
    // Trigger route draw after a short delay (hero already animates in)
    setTimeout(() => {
      mapRoute.classList.add('animated');
    }, 200);

    // Reveal city dots sequentially after route draws
    const cityDots   = document.querySelectorAll('.map-city-dot');
    const cityLabels = document.querySelectorAll('.map-city-label');

    cityDots.forEach((dot, i) => {
      setTimeout(() => {
        dot.classList.add('visible');
        if (cityLabels[i]) cityLabels[i].classList.add('visible');
      }, 2000 + i * 280);
    });
  }

});
