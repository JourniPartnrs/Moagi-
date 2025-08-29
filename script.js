// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Hero Slider Logic
const slidesEl = document.getElementById('slides');
const slides = [...document.querySelectorAll('.slide')];
const dotsEl = document.getElementById('dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;
let timer;

function renderDots() {
  dotsEl.innerHTML = '';
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot' + (i === index ? ' active' : '');
    b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    b.addEventListener('click', () => go(i));
    dotsEl.appendChild(b);
  });
}

function go(i) {
  index = (i + slides.length) % slides.length;
  slidesEl.style.transform = `translateX(-${index * 100}%)`;
  [...dotsEl.children].forEach((d, di) => d.classList.toggle('active', di === index));
  restart();
}

function next() {
  go(index + 1)
}

function prev() {
  go(index - 1)
}

function start() {
  timer = setInterval(next, 6000)
}

function stop() {
  clearInterval(timer)
}

function restart() {
  stop();
  start()
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
document.querySelector('.hero').addEventListener('mouseenter', stop);
document.querySelector('.hero').addEventListener('mouseleave', start);
renderDots();
start();

// Testimonials Slider Logic
const slidesTestimonialsEl = document.getElementById('slidesTestimonials');
const slidesTestimonials = [...document.querySelectorAll('.slide-testimonial')];
const dotsTestimonialsEl = document.getElementById('dotsTestimonials');
let indexTestimonials = 0;
let timerTestimonials;

function renderDotsTestimonials() {
  dotsTestimonialsEl.innerHTML = '';
  slidesTestimonials.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot' + (i === indexTestimonials ? ' active' : '');
    b.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    b.addEventListener('click', () => goTestimonials(i));
    dotsTestimonialsEl.appendChild(b);
  });
}

function goTestimonials(i) {
  indexTestimonials = (i + slidesTestimonials.length) % slidesTestimonials.length;
  slidesTestimonialsEl.style.transform = `translateX(-${indexTestimonials * 100}%)`;
  [...dotsTestimonialsEl.children].forEach((d, di) => d.classList.toggle('active', di === indexTestimonials));
  restartTestimonials(); // Restart the timer
}

function startTestimonials() {
  timerTestimonials = setInterval(() => goTestimonials(indexTestimonials + 1), 7000);
} // 7-second interval

function restartTestimonials() {
  clearInterval(timerTestimonials);
  startTestimonials();
}

renderDotsTestimonials();
startTestimonials();

// Tallies (counters)
const nums = [...document.querySelectorAll('.stat .num')];
const yearSpan = document.getElementById('year');
const now = new Date();
yearSpan.textContent = now.getFullYear();

// Auto-calc years since 2013
nums.forEach(n => {
  if (n.dataset.target === 'auto-year') {
    n.dataset.target = String(Math.max(1, now.getFullYear() - 2013));
  }
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounters();
      io.disconnect();
    }
  });
}, {
  threshold: .4
});
io.observe(document.querySelector('.stats'));

function animateCounters() {
  nums.forEach(n => {
    const target = parseInt(n.dataset.target, 10) || 0;
    const duration = 1200 + Math.random() * 800; // 1.2s–2s
    const startTime = performance.now();

    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const val = Math.floor(t * target);
      n.textContent = val.toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      else n.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  });
}

// Single-page navigation logic
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      e.preventDefault();
      const allSections = document.querySelectorAll('.page-section');
      allSections.forEach(section => section.classList.remove('active'));
      targetSection.classList.add('active');

      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Handle initial page load
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash) {
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      const allSections = document.querySelectorAll('.page-section');
      allSections.forEach(section => section.classList.remove('active'));
      targetSection.classList.add('active');
    }
  }
});
