// Small helper to select elements
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

// 1. Navbar: shadow on scroll, mobile menu, active link
const nav = $('#nav'), burger = $('#burger'), menu = $('#menu'), topBtn = $('#top');

const progress = $('#progress');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (scrollY / max * 100) + '%';
  topBtn.classList.toggle('show', window.scrollY > 500);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

function closeMenu() {
  menu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
$$('#menu a').forEach(a => a.addEventListener('click', closeMenu));

const links = $$('#menu a');
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section').forEach(s => spy.observe(s));

// 2. Typing effect in the hero
const words = ['responsive websites', 'clean interfaces', 'fast web apps', 'things people enjoy'];
const typeEl = $('#type');
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typeEl.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1500); }
  if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 80);
}
type();

// 3. Reveal sections, animate skill bars and stat counters
$$('.section .container').forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('.bar i', e.target).forEach(b => (b.style.width = b.dataset.w + '%'));
    $$('[data-count]', e.target).forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
$$('.reveal').forEach(el => io.observe(el));

function countUp(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const t = setInterval(() => {
    n = Math.min(target, n + step);
    el.textContent = n;
    if (n === target) clearInterval(t);
  }, 30);
}

// 4. Contact form validation (frontend only)
const form = $('#form'), success = $('#success');
const rules = {
  name: v => v.trim().length >= 2 || 'Enter your full name (at least 2 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email like you@example.com.',
  subject: v => v.trim().length >= 3 || 'Add a short subject (at least 3 characters).',
  message: v => v.trim().length >= 10 || 'Write a message of at least 10 characters.'
};
function check(input) {
  const result = rules[input.name](input.value);
  const field = input.closest('.field');
  field.classList.toggle('error', result !== true);
  $('small', field).textContent = result === true ? '' : result;
  return result === true;
}
$$('input, textarea', form).forEach(i => i.addEventListener('blur', () => check(i)));
$$('input, textarea', form).forEach(i => i.addEventListener('input', () => i.closest('.field').classList.contains('error') && check(i)));

form.addEventListener('submit', e => {
  e.preventDefault();
  success.textContent = '';
  const inputs = $$('input, textarea', form);
  const ok = inputs.map(check).every(Boolean);
  if (!ok) return inputs.find(i => i.closest('.field').classList.contains('error')).focus();
  success.textContent = 'Message sent. Thanks, I will reply soon!';
  form.reset();
});

// 5. Footer year
$('#year').textContent = new Date().getFullYear();

// 6. Light / dark theme toggle (remembers choice)
const themeBtn = $('#theme');
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  themeBtn.innerHTML = t === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || 'dark');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});
