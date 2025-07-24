// Theme toggle
const themeSelect = document.getElementById('theme-select');
if (themeSelect) {
  themeSelect.addEventListener('change', () => {
    document.body.classList.toggle('dark', themeSelect.value === 'dark');
  });
}

// Placeholder for creating first match
const createFirst = document.getElementById('create-first');
if (createFirst) {
  createFirst.addEventListener('click', e => {
    e.preventDefault();
    alert('Feature not implemented yet.');
  });
}

// Simple flow testing between pages
const flowBtn = document.getElementById('flow-test');
if (flowBtn) {
  flowBtn.addEventListener('click', () => {
    const pages = ['index.html', 'login.html', 'signup.html', 'settings.html'];
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
