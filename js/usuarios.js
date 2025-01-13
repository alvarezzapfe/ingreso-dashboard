// Inicializar usuarios en localStorage
const SUPER_ADMIN = {
  nombre: "Luis Alvarez",
  email: "luis@crowdlink.mx",
  permiso: "Super Administrador",
  password: "admin123",
};

const ADMIN1 = {
  nombre: "Jeronimo Cosio",
  email: "jero@crowdlink.mx",
  permiso: "Administrador",
  password: "admin123",
};

const ADMIN2 = {
  nombre: "Juana Monroy",
  email: "conta@crowdlink.mx",
  permiso: "Administrador",
  password: "admin123",
};

const SUPER_ADMIN2 = {
  nombre: "Paulina Zapfe",
  email: "pau@crowdlink.mx",
  permiso: "Super Administrador",
  password: "admin123",
};

const ADMIN3 = {
  nombre: "Rafael Cancino",
  email: "rafa@crowdlink.mx",
  permiso: "Administrador",
  password: "admin123",
};

// Recuperar usuarios del localStorage o inicializar con los predeterminados
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

[SUPER_ADMIN, ADMIN1, ADMIN2, SUPER_ADMIN2, ADMIN3].forEach((usuario) => {
  if (!usuarios.some((user) => user.email === usuario.email)) {
    usuarios.push(usuario);
  }
});

localStorage.setItem("usuarios", JSON.stringify(usuarios));

// Crear usuario (Solo Super Administrador puede hacerlo)
function crearUsuario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const permiso = document.getElementById("permiso").value;
  const password = document.getElementById("password").value;

  if (!nombre || !email || !permiso || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  usuarios.push({ nombre, email, permiso, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  cerrarPopup();
  actualizarTablaUsuarios();
}

// Mostrar usuarios en la tabla (Solo Administrador y Super Administrador)
function actualizarTablaUsuarios() {
  const usuariosTabla = document.getElementById("usuariosTabla");
  usuariosTabla.innerHTML = "";

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

// Eliminar usuario
// Mostrar usuarios en la tabla
function actualizarTablaUsuarios() {
  const usuariosTabla = document.getElementById("usuariosTabla");
  usuariosTabla.innerHTML = ""; // Limpiar la tabla

  usuarios.forEach((usuario) => {
    const fila = document.createElement("tr");

    // Verificar si el usuario es ineditable
    const ineditable =
      usuario.email === "luis@crowdlink.mx" || // Super Administrador
      usuario.email === "jero@crowdlink.mx" || // Jerónimo
      usuario.email === "conta@crowdlink.mx" || // Juana
      usuario.email === "pau@crowdlink.mx";

    fila.innerHTML = `
      <td>${usuario.permiso}</td>
      <td>${usuario.email}</td>
      <td>${usuario.nombre}</td>
      <td>
        ${
          ineditable
            ? `<span class="badge-super-admin">No editable</span>`
            : `<button class="btn-detalle-usuario" onclick="eliminarUsuario('${usuario.email}')">Eliminar</button>`
        }
      </td>
    `;

    usuariosTabla.appendChild(fila);
  });
}

// Eliminar usuario
function eliminarUsuario(email) {
  const usuarioAEliminar = usuarios.find((usuario) => usuario.email === email);

  if (
    usuarioAEliminar.email === "luis@crowdlink.mx" ||
    usuarioAEliminar.email === "jero@crowdlink.mx" ||
    usuarioAEliminar.email === "conta@crowdlink.mx" ||
    usuarioAEliminar.email === "pau@crowdlink.mx"
  ) {
    alert("No puedes eliminar este usuario.");
    return;
  }

  if (
    confirm(
      `¿Estás seguro de que deseas eliminar a ${usuarioAEliminar.nombre}?`
    )
  ) {
    usuarios = usuarios.filter((usuario) => usuario.email !== email); // Filtrar el usuario
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Actualizar localStorage
    actualizarTablaUsuarios(); // Actualizar la tabla
  }
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarTablaUsuarios();
  mostrarUsuarioLogueado();
});

// Verificar acceso a la sección de Administrador
function verificarAccesoAdministrador() {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado || usuarioLogueado.permiso !== "Super Administrador") {
    alert("Acceso denegado: Solo el Super Administrador puede acceder.");
    window.location.href = "dashboard.html"; // Redirige si no tiene acceso
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  actualizarTablaUsuarios();
});

// mostrar usuario logeado en la seccion de Usuario

// Mostrar el usuario logueado en el navbar y la sección de Usuario
function mostrarUsuarioLogueado() {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado) {
    alert("No hay usuario logueado. Redirigiendo al inicio de sesión.");
    window.location.href = "index.html";
    return;
  }

  // Mostrar el usuario logueado en el navbar
  const navbarUsuario = document.getElementById("navbar-usuario");
  if (navbarUsuario) {
    navbarUsuario.textContent = `Usuario: ${usuarioLogueado.nombre}`;
  }

  // Mostrar el usuario logueado en la sección de Usuario
  const usuarioTabla = document.getElementById("usuarioTabla");
  if (usuarioTabla) {
    usuarioTabla.innerHTML = `
      <tr>
        <td>${usuarioLogueado.permiso}</td>
        <td>${usuarioLogueado.email}</td>
        <td>${usuarioLogueado.nombre}</td>
        <td><span class="badge-super-admin">Logueado</span></td>
      </tr>
    `;
  }
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarUsuarioLogueado();
});

// crear usuario nuevo

// Abrir popup para agregar usuario
function abrirPopupCrearUsuario() {
  document.getElementById("popupCrearUsuario").style.display = "flex";
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("permiso").value = "Administrador";
  document.getElementById("password").value = "";
}

// Cerrar popup
function cerrarPopup() {
  document.getElementById("popupCrearUsuario").style.display = "none";
}

// Crear un nuevo usuario
function crearUsuario() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const permiso = document.getElementById("permiso").value;
  const password = document.getElementById("password").value.trim();

  if (!nombre || !email || !permiso || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Verificar si el correo ya está en uso
  if (usuarios.some((usuario) => usuario.email === email)) {
    alert("El correo electrónico ya está registrado.");
    return;
  }

  // Agregar el nuevo usuario al array
  usuarios.push({ nombre, email, permiso, password });

  // Guardar usuarios en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Cerrar el popup y actualizar la tabla
  cerrarPopup();
  actualizarTablaUsuarios();
  alert(`Usuario ${nombre} agregado con éxito.`);
}
