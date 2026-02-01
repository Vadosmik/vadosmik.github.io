const btn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// 1. Sprawdź czy jest zapisany wybór, jeśli nie - sprawdź system
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (currentTheme === "dark" || (!currentTheme && prefersDark)) {
  document.body.classList.add("dark-mode");
}

// 2. Obsługa przycisku
btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  
  let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});