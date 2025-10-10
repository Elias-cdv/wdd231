// js/storage.js
// Manejo de tema (oscuro / claro) con localStorage

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // 1. Ver si el usuario ya tenía un tema guardado
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  // 2. Crear o seleccionar el botón de cambio de tema
  let themeBtn = document.querySelector(".theme-toggle");
  if (!themeBtn) {
    themeBtn = document.createElement("button");
    themeBtn.className = "theme-toggle";
    themeBtn.textContent = "🌓 Theme";
    document.body.appendChild(themeBtn);
  }

  // 3. Escuchar clics y alternar el tema
  themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);

    // Animación visual rápida al cambiar
    themeBtn.classList.add("clicked");
    setTimeout(() => themeBtn.classList.remove("clicked"), 300);
  });
});
