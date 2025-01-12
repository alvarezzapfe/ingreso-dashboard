// Verificar usuario (puedes agregar lógica más adelante para validar usuario y contraseña)
function verificarUsuario() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (email && password) {
    // Aquí puedes añadir lógica de verificación (como una llamada al backend)
    console.log("Usuario:", email, "Contraseña:", password);
    alert("Verificación exitosa (simulada).");
  } else {
    alert("Por favor, ingresa tu correo electrónico y contraseña.");
  }
}

// Alternar entre los formularios de inicio de sesión y registro
function toggleForms() {
  const loginView = document.getElementById("loginView");
  const registerView = document.getElementById("registerView");
  const toggleLink = document.getElementById("toggleLink");

  if (loginView.style.display === "none") {
    loginView.style.display = "block";
    registerView.style.display = "none";
    toggleLink.textContent = "¿Nuevo usuario? Regístrate";
  } else {
    loginView.style.display = "none";
    registerView.style.display = "block";
    toggleLink.textContent = "¿Ya tienes cuenta? Ingresa";
  }
}

// Redirigir al dashboard
function ingresarUsuario() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Recuperar usuarios del localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar usuario con correo y contraseña correctos
  const usuario = usuarios.find(
    (user) => user.email === email && user.password === password
  );

  if (usuario) {
    // Guardar usuario logueado en localStorage
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
    alert("Ingreso exitoso. Bienvenido, " + usuario.nombre);
    window.location.href = "dashboard.html"; // Redirigir al dashboard
  } else {
    alert("Correo o contraseña incorrectos.");
  }
}

document.addEventListener("click", (event) => {
  const popup = document.getElementById("contactPopup");
  const isClickInside =
    popup.contains(event.target) || event.target.closest(".menu-item");

  if (!isClickInside) {
    popup.style.display = "none";
  }
});

// POP UP
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menuIcon");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const contactPopup = document.getElementById("contactPopup");

  // Toggle Hamburger Menu
  menuIcon.addEventListener("click", () => {
    hamburgerMenu.style.display =
      hamburgerMenu.style.display === "block" ? "none" : "block";
    contactPopup.style.display = "none"; // Cierra el popup si el menú se abre/cierra
  });

  // Toggle Popup
  window.togglePopup = function () {
    contactPopup.style.display =
      contactPopup.style.display === "block" ? "none" : "block";
  };

  // Close Popup when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !contactPopup.contains(event.target) &&
      !hamburgerMenu.contains(event.target) &&
      event.target.id !== "menuIcon"
    ) {
      contactPopup.style.display = "none";
    }
  });
});

// Iniciar sesión
function iniciarSesion() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Obtener usuarios del localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar usuario
  const usuarioEncontrado = usuarios.find(
    (user) => user.email === email && user.password === password
  );

  if (usuarioEncontrado) {
    // Guardar el usuario logueado en localStorage
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

    alert(`Bienvenido, ${usuarioEncontrado.nombre}`);
    window.location.href = "dashboard.html"; // Redirigir al dashboard
  } else {
    alert("Correo o contraseña incorrectos.");
  }
}

// Asignar evento al botón de inicio de sesión
document.getElementById("loginButton").addEventListener("click", iniciarSesion);
