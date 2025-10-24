// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('change', () => {
    mobileMenu.classList.toggle('open', mobileMenuToggle.checked);
  });
}

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileMenuToggle.checked = false; // Uncheck the checkbox
  });
});

// Hero Slider Logic
/*const slidesEl = document.getElementById('slides');
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
start();*/

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
  restartTestimonials();
  // Restart the timer
}document.getElementById('prevTestimonial').addEventListener('click', () => {
  goTestimonials(indexTestimonials - 1);
});

document.getElementById('nextTestimonial').addEventListener('click', () => {
  goTestimonials(indexTestimonials + 1);
});

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

/* --- WORD ROTATOR AUTO-PLAY LOGIC (HORIZONTAL SLIDE) --- */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.word-rotator-area .word-slide');
    let currentSlideIndex = 0;
    const rotationInterval = 3000; // Time in milliseconds (3 seconds)

    function rotateWord() {
        // 1. Start the OUT animation for the current slide
        const currentSlide = slides[currentSlideIndex];
        currentSlide.classList.remove('active');
        
        // Use a short timeout to apply the 'out' transform while it's visible, then hide it.
        currentSlide.style.transform = 'translateX(-100%)'; // Move out to the left
        currentSlide.style.opacity = '0';

        // 2. Determine the next slide index
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        const nextSlide = slides[currentSlideIndex];
        
        // 3. Prepare the next slide to enter from the right (reset its position and make it visible for the slide-in)
        nextSlide.style.transform = 'translateX(100%)'; 
        nextSlide.style.opacity = '0';
        nextSlide.style.display = 'inline-block'; // Make it visible (but off-screen)
        
        // 4. Activate the next slide and trigger the slide-in animation
        // We use a small delay to ensure the browser registers the position change (step 3)
        setTimeout(() => {
            currentSlide.style.display = 'none'; // Hide the old one completely
            nextSlide.classList.add('active');
            nextSlide.style.transform = 'translateX(0)'; // Slide into the center
            nextSlide.style.opacity = '1';
        }, 50); 
    }

    // Set a small initial delay before starting the rotation
    setTimeout(() => {
        // Ensure the first slide is positioned correctly before starting
        slides[0].style.transform = 'translateX(0)';
        slides[0].style.opacity = '1';
        slides[0].style.display = 'inline-block';
        
        setInterval(rotateWord, rotationInterval);
    }, rotationInterval); 
});
/* --- END WORD ROTATOR AUTO-PLAY LOGIC --- */
