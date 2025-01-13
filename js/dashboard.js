// Cambiar de sección al hacer clic en el menú lateral
document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboard"); // Asegura que el Dashboard sea la sección activa al cargar
});

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  const activeSection = document.getElementById(sectionId);
  activeSection.classList.add("active");
}

// Función para abrir/cerrar las opciones del menú superior
function toggleMenu() {
  const menuOptions = document.getElementById("menuOptions");
  menuOptions.style.display =
    menuOptions.style.display === "block" ? "none" : "block";
}

// Función para cambiar entre pestañas
function showInfoTab(tabId) {
  const tabs = document.querySelectorAll(".info-tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  const activeTab = document.getElementById(tabId);
  activeTab.classList.add("active");
}

// POP UP
function showContactPopup() {
  const popup = document.getElementById("contactPopup");
  popup.style.display = "block"; // Mostrar el pop-up
}

function closePopup() {
  const popup = document.getElementById("contactPopup");
  popup.style.display = "none"; // Ocultar el pop-up
}

// Toggle Hamburger Menu
function toggleHamburgerMenu() {
  const menu = document.getElementById("hamburgerMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("collapsed");
}

function displayJSON(json, resultId) {
  const resultDiv = document.getElementById(resultId);
  resultDiv.textContent = JSON.stringify(json, null, 2);
}

// cerrar sesión
function logout() {
  // Lógica para cerrar sesión
  alert("Cerrando sesión...");
  window.location.href = "index.html"; // Redirige a la página de inicio o login
}

// para mobile version
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("collapsed"); // Agregar/quitar la clase 'collapsed'
}

// Función para alternar el menú secundario en la barra lateral
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileSidebarMenu");
  mobileMenu.classList.toggle("show"); // Agrega o quita la clase "show"
}

// Mes actual en dashboard

// JavaScript para el mes actual
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar el mes actual
  const currentMonthElement = document.getElementById("currentMonth");
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const today = new Date();
  const month = months[today.getMonth()];
  currentMonthElement.textContent = month;

  // Calcular días restantes para el final del mes
  const daysToMonthEndElement = document.getElementById("daysToMonthEnd");
  const year = today.getFullYear();
  const monthEnd = new Date(year, today.getMonth() + 1, 0); // Último día del mes
  const daysRemaining = Math.ceil((monthEnd - today) / (1000 * 60 * 60 * 24));

  daysToMonthEndElement.textContent = `${daysRemaining} día${
    daysRemaining !== 1 ? "s" : ""
  } restantes`;
});

// SECCION FAQ de info general

function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const isVisible = answer.style.display === "block";

  // Cerrar todas las respuestas abiertas
  document.querySelectorAll(".faq-answer").forEach((ans) => {
    ans.style.display = "none";
  });

  // Alternar la visibilidad de la respuesta seleccionada
  answer.style.display = isVisible ? "none" : "block";
}

// seccion info general
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const isActive = answer.classList.contains("active");

  // Cerrar todas las preguntas abiertas
  document.querySelectorAll(".faq-answer").forEach((faq) => {
    faq.classList.remove("active");
  });

  // Alternar el estado actual
  if (!isActive) {
    answer.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado) {
    alert("Debes iniciar sesión.");
    window.location.href = "index.html";
  }

  const adminSection = document.getElementById("administrador");
  if (usuarioLogueado.permiso !== "Super Administrador") {
    adminSection.style.display = "none";
  }

  // Mostrar nombre del usuario logueado en el navbar
  document.getElementById(
    "navbar-usuario"
  ).textContent = `Usuario: ${usuarioLogueado.nombre}`;
});
