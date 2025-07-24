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

// Utility functions for storing matches in localStorage
function getStoredMatches() {
  try {
    return JSON.parse(localStorage.getItem('matches')) || [];
  } catch (e) {
    return [];
  }
}

function addMatch(match) {
  const matches = getStoredMatches();
  matches.push(match);
  localStorage.setItem('matches', JSON.stringify(matches));
}

// Render matches on the main page
const matchesContainer = document.getElementById('matches');
if (matchesContainer) {
  const matches = getStoredMatches();
  const empty = document.getElementById('empty-state');
  if (matches.length === 0) {
    if (empty) empty.style.display = 'block';
  } else {
    if (empty) empty.style.display = 'none';
    matches.forEach(m => {
      const card = document.createElement('div');
      card.className = 'match-card';
      card.innerHTML = `
        <h3>${m.title}</h3>
        <p>${m.location} | ${m.datetime ? new Date(m.datetime).toLocaleString() : ''}</p>
        <p>Players: ${m.players.join(', ')}</p>
        <p>${m.notes}</p>`;
      matchesContainer.appendChild(card);
    });
  }
}

// Handle player list building and match form submission
const matchForm = document.getElementById('match-form');
const playerInput = document.getElementById('player-input');
const addPlayerBtn = document.getElementById('add-player');
const playerList = document.getElementById('player-list');
const players = [];

function renderPlayers() {
  if (!playerList) return;
  playerList.innerHTML = '';
  players.forEach((name, idx) => {
    const li = document.createElement('li');
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'x';
    remove.addEventListener('click', () => {
      players.splice(idx, 1);
      renderPlayers();
    });
    li.textContent = name + ' ';
    li.appendChild(remove);
    playerList.appendChild(li);
  });
}

if (addPlayerBtn && playerInput) {
  addPlayerBtn.addEventListener('click', () => {
    const name = playerInput.value.trim();
    if (name) {
      players.push(name);
      playerInput.value = '';
      renderPlayers();
      playerInput.focus();
    }
  });
}

if (matchForm) {
  matchForm.addEventListener('submit', e => {
    e.preventDefault();
    const newMatch = {
      title: document.getElementById('match-title').value.trim(),
      location: document.getElementById('match-location').value.trim(),
      datetime: document.getElementById('match-datetime').value,
      players: players.slice(),
      notes: document.getElementById('match-notes').value.trim()
    };
    addMatch(newMatch);
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

// Google Sign-In setup for login page
const gSignInDiv = document.getElementById('google-signin');
if (gSignInDiv && window.google && window.google.accounts && window.google.accounts.id) {
  google.accounts.id.initialize({
    client_id: 'YOUR_GOOGLE_CLIENT_ID',
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(gSignInDiv, { theme: 'outline', size: 'large' });
}

function handleCredentialResponse(response) {
  try {
    const data = parseJwt(response.credential);
    alert(`Signed in as ${data.name || data.email}`);
    localStorage.setItem('user', JSON.stringify(data));
    window.location.href = 'index.html';
  } catch (e) {
    alert('Google sign-in failed');
  }
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(json);
}
