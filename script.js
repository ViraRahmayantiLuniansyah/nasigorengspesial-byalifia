  // Custom Cursor
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  let mouseX = 0, mouseY = 0;
 
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    setTimeout(() => {
      trail.style.left = mouseX + 'px';
      trail.style.top  = mouseY + 'px';
    }, 80);
  });
 
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1.8)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });
 
  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
 
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // stagger siblings
        const siblings = e.target.parentElement.querySelectorAll('.reveal');
        siblings.forEach((s, i) => {
          if (!s.classList.contains('visible')) {
            setTimeout(() => s.classList.add('visible'), i * 120);
          }
        });
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));
 
  // Counter animation
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
      }, 20);
    });
  }
 
  // Trigger counters when about section visible
  const aboutSection = document.querySelector('.about');
  const counterObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      counterObserver.disconnect();
    }
  }, { threshold: 0.3 });
  if (aboutSection) counterObserver.observe(aboutSection);
 
  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });