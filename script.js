// Theme toggle
const themeSelect = document.getElementById('theme-select');
if (themeSelect) {
  themeSelect.addEventListener('change', () => {
    document.body.classList.toggle('dark', themeSelect.value === 'dark');
  });
}

// Navigate to the create match page
const newMatchBtn = document.getElementById('new-match');
if (newMatchBtn) {
  newMatchBtn.addEventListener('click', () => {
    window.location.href = 'create-match.html';
  });
}

// Placeholder for creating first match
const createFirst = document.getElementById('create-first');
if (createFirst) {
  createFirst.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'create-match.html';
  });
}

// Handle create match form submission
const matchForm = document.getElementById('match-form');
if (matchForm) {
  matchForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Match created! (placeholder)');
    window.location.href = 'index.html';
  });
}

// Simple flow testing between pages
const flowBtn = document.getElementById('flow-test');
if (flowBtn) {
  flowBtn.addEventListener('click', () => {
    const pages = ['index.html', 'login.html', 'signup.html', 'create-match.html', 'settings.html'];
    const current = location.pathname.split('/').pop();
    let idx = pages.indexOf(current);
    if (idx === -1) idx = 0;
    const next = pages[(idx + 1) % pages.length];
    window.location.href = `${next}?flow=1`;
  });
}

if (new URLSearchParams(location.search).has('flow')) {
  const nextTrigger = document.getElementById('flow-test');
  if (nextTrigger) {
    setTimeout(() => nextTrigger.click(), 1000);
  }
}
