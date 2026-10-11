// SpendWise: track income and expenses. Saved in localStorage.
const form = document.getElementById('form');
const list = document.getElementById('list');
const error = document.getElementById('error');
let type = 'income';
let items = [];

try { items = JSON.parse(localStorage.getItem('spendwise')) || []; } catch (e) { items = []; }

const money = n => 'Rs ' + n.toLocaleString('en-PK');

function save() {
  try { localStorage.setItem('spendwise', JSON.stringify(items)); } catch (e) {}
}

function render() {
  list.innerHTML = '';
  if (!items.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'No transactions yet. Add your first one!';
    list.appendChild(li);
  }

  items.forEach(it => {
    const li = document.createElement('li');
    li.className = it.type;

    const info = document.createElement('div');
    info.className = 't';
    info.textContent = it.title;
    const date = document.createElement('small');
    date.textContent = it.date;
    info.appendChild(date);

    const amount = document.createElement('b');
    amount.className = it.type === 'income' ? 'in' : 'out';
    amount.textContent = (it.type === 'income' ? '+' : '-') + money(it.amount);

    const del = document.createElement('button');
    del.className = 'x';
    del.textContent = '×';
    del.setAttribute('aria-label', 'Delete ' + it.title);
    del.addEventListener('click', () => { items = items.filter(x => x.id !== it.id); save(); render(); });

    li.append(info, amount, del);
    list.appendChild(li);
  });

  const sum = t => items.filter(i => i.type === t).reduce((a, i) => a + i.amount, 0);
  document.getElementById('income').textContent = money(sum('income'));
  document.getElementById('expense').textContent = money(sum('expense'));
  document.getElementById('balance').textContent = money(sum('income') - sum('expense'));
}

document.getElementById('toggle').addEventListener('click', e => {
  if (!e.target.dataset.type) return;
  type = e.target.dataset.type;
  document.querySelectorAll('#toggle button').forEach(b => b.classList.toggle('on', b === e.target));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const amount = Number(document.getElementById('amount').value);
  if (title.length < 2) return (error.textContent = 'Enter a title (at least 2 characters).');
  if (!amount || amount <= 0) return (error.textContent = 'Enter an amount greater than 0.');
  error.textContent = '';
  items.unshift({
    id: Date.now(), title, amount, type,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  });
  form.reset();
  save(); render();
});

render();
