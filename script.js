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
