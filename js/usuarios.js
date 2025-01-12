const SUPER_ADMIN = {
  nombre: "Luis Alvarez",
  email: "luis@crowdlink.mx",
  permiso: "Super Administrador",
  password: "admin123",
};

// Obtener usuarios de localStorage o inicializar con el Super Administrador
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Verificar si el Super Administrador ya existe
if (!usuarios.some((user) => user.email === SUPER_ADMIN.email)) {
  usuarios.push(SUPER_ADMIN);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Mostrar usuarios en la tabla de Administrador
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
        ${
          usuario.permiso !== "Super Administrador"
            ? `<button class="btn-detalle-usuario" onclick="eliminarUsuario(${index})">Eliminar</button>`
            : `<span class="badge-super-admin">No editable</span>`
        }
      </td>
    `;

    usuariosTabla.appendChild(fila);
  });
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarTablaUsuarios();
});

// Mostrar detalles del usuario logueado en la tabla
function mostrarUsuarioEnTabla() {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const usuarioTabla = document.getElementById("usuarioTabla");

  usuarioTabla.innerHTML = ""; // Limpiar la tabla antes de llenarla

  if (usuarioLogueado) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${usuarioLogueado.permiso}</td>
      <td>${usuarioLogueado.email}</td>
      <td>${usuarioLogueado.nombre}</td>
      <td>
        ${
          usuarioLogueado.permiso !== "Super Administrador"
            ? `<button class="btn-detalle-usuario" onclick="cerrarSesion()">Cerrar Sesión</button>`
            : `<span class="badge-super-admin">Activo</span>`
        }
      </td>
    `;

    usuarioTabla.appendChild(fila);
  } else {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td colspan="4">No hay usuario logueado</td>
    `;
    usuarioTabla.appendChild(fila);
  }
}

// Función para cerrar sesión (opcional para agregar lógica adicional)
function cerrarSesion() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "index.html"; // Redirigir al login
  }
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarUsuarioEnTabla();
  mostrarUsuarioNavbar(); // También actualiza la barra de navegación
});

// Crear usuarios

// Abrir el popup para agregar usuario
function abrirPopupCrearUsuario() {
  document.getElementById("popupCrearUsuario").style.display = "flex";
}

// Cerrar el popup
function cerrarPopup() {
  document.getElementById("popupCrearUsuario").style.display = "none";
  document.getElementById("formAgregarUsuario").reset(); // Limpiar formulario
}

// Crear un nuevo usuario
function crearUsuario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const permiso = document.getElementById("permiso").value;
  const password = document.getElementById("password").value;

  if (!nombre || !email || !permiso || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Verificar si el email ya está registrado
  if (usuarios.some((usuario) => usuario.email === email)) {
    alert("El correo ya está registrado.");
    return;
  }

  // Agregar usuario al array y guardar en localStorage
  usuarios.push({ nombre, email, permiso, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Actualizar tabla de usuarios y cerrar popup
  actualizarTablaUsuarios();
  cerrarPopup();

  alert("Usuario agregado exitosamente.");
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
        ${
          usuario.email !== "luis@crowdlink.mx"
            ? `<button class="btn-detalle-usuario" onclick="eliminarUsuario(${index})">Eliminar</button>`
            : `<span class="badge-super-admin">No editable</span>`
        }
      </td>
    `;

    usuariosTabla.appendChild(fila);
  });
}

// Inicializar tabla al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarTablaUsuarios();
});

// Eliminar usuario
function eliminarUsuario(index) {
  const usuarioAEliminar = usuarios[index];

  // Verificar si el usuario a eliminar es el Super Administrador
  if (usuarioAEliminar.email === "luis@crowdlink.mx") {
    alert("No puedes eliminar al Super Administrador.");
    return;
  }

  if (
    confirm(
      `¿Estás seguro de que deseas eliminar a ${usuarioAEliminar.nombre}?`
    )
  ) {
    usuarios.splice(index, 1); // Eliminar del array
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualizar localStorage
    actualizarTablaUsuarios(); // Actualizar la tabla
    alert(`Usuario ${usuarioAEliminar.nombre} eliminado con éxito.`);
  }
}
