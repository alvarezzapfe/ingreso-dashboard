// Cargar usuarios desde localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Crear un usuario
function crearUsuario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const permiso = document.getElementById("permiso").value;

  if (!nombre || !email || !permiso) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Agregar usuario al array
  usuarios.push({ nombre, email, permiso });

  // Guardar usuarios en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Limpiar formulario y cerrar popup
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("permiso").value = "Administrador";
  cerrarPopup();

  // Actualizar la tabla de usuarios
  actualizarTablaUsuarios();
}

// Mostrar usuarios en la tabla
function actualizarTablaUsuarios() {
  const usuariosTabla = document.getElementById("usuariosTabla");
  usuariosTabla.innerHTML = ""; // Limpiar la tabla

  usuarios.forEach((usuario, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${usuario.permiso}</td>
      <td>${usuario.email}</td>
      <td>${usuario.nombre}</td>
      <td>
        <button class="btn-detalle-usuario" onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;

    usuariosTabla.appendChild(fila);
  });
}

// Eliminar usuario
function eliminarUsuario(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    usuarios.splice(index, 1); // Eliminar del array
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualizar localStorage
    actualizarTablaUsuarios(); // Actualizar la tabla
  }
}

// Abrir y cerrar popup
function abrirPopupCrearUsuario() {
  document.getElementById("popupCrearUsuario").style.display = "flex";
}

function cerrarPopup() {
  document.getElementById("popupCrearUsuario").style.display = "none";
}

// Inicializar tabla al cargar la página
document.addEventListener("DOMContentLoaded", actualizarTablaUsuarios);
