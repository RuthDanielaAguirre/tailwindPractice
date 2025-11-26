// src/main.js

// ===================================
// MODO OSCURO CON PERSISTENCIA
// ===================================
function initTheme() {
  const theme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (theme === 'dark' || (!theme && prefersDark)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function toggleTheme() {
  const root = document.documentElement
  const isDark = root.classList.contains('dark')
  
  root.classList.toggle('dark', !isDark)
  localStorage.setItem('theme', isDark ? 'light' : 'dark')
  
  // Actualizar icono del botón
  updateThemeButton()
}

function updateThemeButton() {
  const btn = document.getElementById('theme-toggle')
  const isDark = document.documentElement.classList.contains('dark')
  
  if (btn) {
    btn.innerHTML = isDark ? '☀️' : '🌙'
    btn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro')
  }
}

// Inicializar tema antes de que se renderice la página
initTheme()

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Configurar botón de tema
  const themeBtn = document.getElementById('theme-toggle')
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme)
    updateThemeButton()
  }
  
  // ===================================
  // VALIDACIÓN DE FORMULARIO
  // ===================================
  const form = document.getElementById('newsletter-form')
  const emailInput = document.getElementById('email')
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      
      if (emailInput.validity.valid) {
        // Simular envío exitoso
        alert('¡Gracias por suscribirte! 🎉')
        form.reset()
      }
    })
  }
  
  // ===================================
  // FILTRADO DE TARJETAS (OPCIONAL)
  // ===================================
  const filterButtons = document.querySelectorAll('[data-filter]')
  const cards = document.querySelectorAll('[data-category]')
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter
      
      // Actualizar botones activos
      filterButtons.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      
      // Filtrar tarjetas
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden')
        } else {
          card.classList.add('hidden')
        }
      })
    })
  })
  
  // ===================================
  // ANIMACIÓN DE SCROLL
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, observerOptions)
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
})

// ===================================
// PREVENIR FLASH DE TEMA
// ===================================
// Este script ya se ejecuta en el <head> del HTML