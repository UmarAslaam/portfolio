// Memory Match: flip two cards at a time and find all matching pairs.
const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const timeEl = document.getElementById('time');
const bestEl = document.getElementById('best');
const win = document.getElementById('win');

const EMOJIS = ['🍎','🚀','🎸','🐼','⚽','🌈','🍕','🦊','🎮','🌵','🐙','🍩'];
const LEVELS = { easy: { pairs: 6, cols: 4 }, medium: { pairs: 8, cols: 4 }, hard: { pairs: 12, cols: 6 } };

let level = 'easy', first = null, lock = false, moves = 0, matched = 0, seconds = 0, timer = null;

const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

function getBest() {
  try { return Number(localStorage.getItem('mm-best-' + level)) || null; } catch (e) { return null; }
}
function setBest(v) {
  try { localStorage.setItem('mm-best-' + level, v); } catch (e) {}
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function start() {
  clearInterval(timer);
  timer = null; first = null; lock = false; moves = 0; matched = 0; seconds = 0;
  movesEl.textContent = 0; timeEl.textContent = '0:00';
  const best = getBest();
  bestEl.textContent = best ? best + ' moves' : '-';

  const { pairs, cols } = LEVELS[level];
  board.style.setProperty('--cols', cols);
  board.innerHTML = '';
  shuffle([...EMOJIS.slice(0, pairs), ...EMOJIS.slice(0, pairs)]).forEach(emoji => {
    const card = document.createElement('button');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.setAttribute('aria-label', 'Hidden card');
    card.innerHTML = '<span class="face front">?</span><span class="face back"></span>';
    card.querySelector('.back').textContent = emoji;
    card.addEventListener('click', () => flip(card));
    board.appendChild(card);
  });
}

function flip(card) {
  if (lock || card === first || card.classList.contains('flip') || card.classList.contains('match')) return;
  if (!timer) timer = setInterval(() => { seconds++; timeEl.textContent = fmt(seconds); }, 1000);

  card.classList.add('flip');
  card.setAttribute('aria-label', 'Card ' + card.dataset.emoji);
  if (!first) { first = card; return; }

  moves++;
  movesEl.textContent = moves;
  const a = first, b = card;
  first = null;

  if (a.dataset.emoji === b.dataset.emoji) {
    [a, b].forEach(c => { c.classList.replace('flip', 'match'); c.disabled = true; });
    if (++matched === LEVELS[level].pairs) finish();
  } else {
    lock = true;
    setTimeout(() => {
      [a, b].forEach(c => { c.classList.remove('flip'); c.setAttribute('aria-label', 'Hidden card'); });
      lock = false;
    }, 800);
  }
}

function finish() {
  clearInterval(timer);
  const best = getBest();
  const isBest = !best || moves < best;
  if (isBest) setBest(moves);
  bestEl.textContent = (isBest ? moves : best) + ' moves';
  document.getElementById('winText').textContent =
    'You finished in ' + moves + ' moves and ' + fmt(seconds) + '.' + (isBest ? ' New best score!' : '');
  setTimeout(() => win.showModal(), 600);
}

document.getElementById('levels').addEventListener('click', e => {
  if (!e.target.dataset.level) return;
  level = e.target.dataset.level;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === e.target));
  start();
});
document.getElementById('restart').addEventListener('click', start);
document.getElementById('again').addEventListener('click', () => { win.close(); start(); });

start();
