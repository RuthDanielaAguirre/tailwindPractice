// ======================================================
//                       TEMA
// ======================================================

function initTheme() {
  const theme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (theme === 'dark' || (!theme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');

  root.classList.toggle('dark', !isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');

  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById('theme-toggle');
  const isDark = document.documentElement.classList.contains('dark');

  if (btn) {
    btn.innerHTML = isDark ? '☀️' : '🌙';
    btn.setAttribute(
      'aria-label',
      isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  }
}

initTheme();


// ======================================================
//                DOMContentLoaded GLOBAL
// ======================================================

document.addEventListener('DOMContentLoaded', () => {
  // ======================
  // BOTÓN TEMA
  // ======================
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
    updateThemeButton();
  }

  // ======================
  // VALIDACIÓN NEWSLETTER
  // ======================
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (emailInput.validity.valid) {
        alert('¡Gracias por suscribirte! 🎉');
        form.reset();
      }
    });
  }

  // ======================
  // FILTRO TARJETAS
  // ======================
  const filterButtons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ======================
  // ANIMACIÓN SCROLL
  // ======================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  
  // ======================================================
  //                   TAMAGOTCHI
  // ======================================================

  let hunger = 50;
  let happiness = 50;
  let health = 100;

  // Obtener referencias DOM del Tamagotchi
  const hungerBar = document.getElementById('hunger-bar');
  const happinessBar = document.getElementById('happiness-bar');
  const healthBar = document.getElementById('health-bar');
  const tamaImg = document.getElementById('tama-img');

  const modal = document.getElementById('tamagotchi-modal');
  const openBtn = document.getElementById('open-tamagotchi');
  const closeBtn = document.getElementById('close-tamagotchi');
  const navTamaButton = document.getElementById('navbar-tamagotchi');

  // Mostrar imagen
  function showImage(state) {
    const states = {
      normal: "./assets/normal.jpg",
      eating: "./assets/eating.jpg",
      blush: "./assets/blush.jpg",
      angry: "./assets/angry.jpg",
      die: "./assets/die.jpg",
    };

    tamaImg.src = states[state] || states.normal;
  }

  // Actualizar barras
  function updateBars() {
    hungerBar.style.width = hunger + "%";
    happinessBar.style.width = happiness + "%";
    healthBar.style.width = health + "%";
  }

  function applyChanges() {
    updateBars();
  }

  // MUERTE
  function die() {
    showImage("die");

    document.getElementById("feed-btn").disabled = true;
    document.getElementById("play-btn").disabled = true;
    document.getElementById("sleep-btn").disabled = true;

    console.log("💀 Tu Tamagotchi ha muerto");
  }

  // ACCIONES
  function feed() {
    hunger = Math.min(hunger + 20, 100);
    happiness = Math.min(happiness + 5, 100);
    health = Math.min(health + 5, 100);

    showImage("eating");
    tamaImg.classList.add("bounce-animation");
    setTimeout(() => {
      tamaImg.classList.remove("bounce-animation");
      showImage("normal");
    }, 800);

    applyChanges();
  }

  function play() {
    happiness = Math.min(happiness + 20, 100);
    hunger = Math.max(hunger - 10, 0);
    health = Math.max(health - 5, 0);

    showImage("blush");
    tamaImg.classList.add("shake-animation");
    setTimeout(() => {
      tamaImg.classList.remove("shake-animation");
      showImage("normal");
    }, 800);

    applyChanges();
  }

  function sleep() {
    health = Math.min(health + 15, 100);
    happiness = Math.max(happiness - 5, 0);
    hunger = Math.max(hunger - 5, 0);

    showImage("normal");
    tamaImg.classList.add("sleep-animation");
    setTimeout(() => tamaImg.classList.remove("sleep-animation"), 1500);

    applyChanges();
  }

  // BOTONES
  if (openBtn) openBtn.onclick = () => modal.classList.remove('hidden');
  if (navTamaButton) navTamaButton.onclick = () => modal.classList.remove('hidden');
  if (closeBtn) closeBtn.onclick = () => modal.classList.add('hidden');

  document.getElementById('feed-btn').onclick = feed;
  document.getElementById('play-btn').onclick = play;
  document.getElementById('sleep-btn').onclick = sleep;

  // APLICAR VALORES INICIALES
  applyChanges();
  showImage("normal");

  // BUCLE PRINCIPAL
  const gameLoop = setInterval(() => {
    hunger = Math.max(hunger - 2, 0);
    happiness = Math.max(happiness - 1, 0);
    health = Math.max(health - 1, 0);

    // Estados automáticos
    if (hunger === 0 && happiness === 0 && health === 0) {
      die();
      clearInterval(gameLoop);
      return;
    }

    if (hunger < 20) showImage("angry");
    else if (happiness > 70) showImage("blush");
    else showImage("normal");

    applyChanges();
  }, 3000);
});
