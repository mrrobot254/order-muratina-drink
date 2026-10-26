// =========================================
// ORDER MURATINA DRINK — app.js
// =========================================

// Your WhatsApp number (0710953452) in international form: 254 + number without the 0
const WHATSAPP_LINK = 'https://wa.me/254710953452';

// =========================================
// SLIDESHOW (changes every 3 seconds)
// =========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 3000);

// =========================================
// OPEN WHATSAPP WITH A READY MESSAGE
// =========================================
function orderNow(msg) {
  window.open(WHATSAPP_LINK + '?text=' + encodeURIComponent(msg), '_blank');
}

// =========================================
// TOP MENU — highlight the section you are on
// =========================================
(function navSpy() {
  if (!('IntersectionObserver' in window)) return;
  const links = document.querySelectorAll('.nav-links a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['home', 'products', 'about', 'contact'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });
})();

// =========================================
// SIP VIDEO STICKER — make sure it autoplays
// =========================================
(function sipSticker() {
  const box = document.querySelector('.sip-sticker');
  if (!box) return;
  const art = box.querySelector('.sip-art');
  const v = box.querySelector('video');

  // people who asked their phone to reduce motion get a still picture
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (art && art.pauseAnimations) art.pauseAnimations();
    return;
  }
  if (!v) return;

  // the cartoon plays by itself; your own video (images/sip.mp4) replaces it once it is really playing
  v.muted = true;
  v.addEventListener('playing', () => box.classList.add('has-video'));
  const p = v.play && v.play();
  if (p && p.catch) p.catch(() => {});
})();