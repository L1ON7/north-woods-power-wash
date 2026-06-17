/* =============================================
   NORTH WOODS POWER WASH — JavaScript
   ============================================= */

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile nav toggle ─────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

// ── Scroll fade-in / fade-up animations ──────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in, .fade-up').forEach(el => {
  observer.observe(el);
});

// ── Before / After Sliders ────────────────────
function initSlider(sliderId, handleId) {
  const slider = document.getElementById(sliderId);
  const handle = document.getElementById(handleId);
  if (!slider || !handle) return;

  const before = slider.querySelector('.ba-before');
  let dragging = false;
  let currentPos = 50; // percent

  function setPosition(x) {
    const rect = slider.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    pos = Math.max(2, Math.min(98, pos));
    currentPos = pos;
    before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    handle.style.left = `${pos}%`;
  }

  // Mouse events
  handle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
  window.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
  window.addEventListener('mouseup',   () => { dragging = false; });

  // Touch events
  handle.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); }, { passive: false });
  window.addEventListener('touchmove',  e => {
    if (dragging) setPosition(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', () => { dragging = false; });

  // Also allow dragging anywhere on the slider
  slider.addEventListener('mousedown', e => { dragging = true; setPosition(e.clientX); });
  slider.addEventListener('touchstart', e => {
    dragging = true;
    setPosition(e.touches[0].clientX);
  }, { passive: true });

  // Initialise at 50%
  before.style.clipPath = 'inset(0 50% 0 0)';
  handle.style.left = '50%';
}

initSlider('slider1', 'handle1');
initSlider('slider2', 'handle2');

// ── Smooth active nav link highlighting ───────
const sections = document.querySelectorAll('section[id], nav');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--blue-600)';
        }
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(sec => navObserver.observe(sec));
