
// 📌 DOMContentLoaded: Main Initialization Block
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const icon = document.getElementById("darkModeIcon");
  const text = document.getElementById("darkModeText");

  const nombreUsuario = document.getElementById("nombre-usuario");
  const inputNombre = document.getElementById("input-nombre-usuario");
  const iconoEditar = document.getElementById("icono-editar-nombre");

  const streakElement = document.getElementById("streak");
  const logrosContenedor = document.getElementById("logros");
  const profileInput = document.getElementById("profilePicInput");
  const profileImg = document.getElementById("profilePic");
  const banner = document.getElementById("bannerPreview");
  const placeholder = document.getElementById("bannerPlaceholder");
  const controls = document.getElementById("bannerControls");
  const bannerInput = document.getElementById("bannerInput");
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownOptions = document.getElementById("bannerDropdownOptions");
  const userDescription = document.getElementById("userDescription");
  const savedDescription = localStorage.getItem("userDescription");

  if (savedDescription && userDescription) {
    userDescription.value = savedDescription;
  }
  userDescription?.addEventListener("input", () => {
    localStorage.setItem("userDescription", userDescription.value);
  });

  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  if (savedDarkMode) {
    body.classList.add("dark-mode");
    icon?.classList.replace("fa-moon", "fa-sun");
    if (text) text.textContent = "Modo claro";
  }

  const savedName = localStorage.getItem("username") || "Escritor Anónimo";
  if (nombreUsuario) nombreUsuario.textContent = savedName;
  if (inputNombre) inputNombre.value = savedName;

  nombreUsuario?.addEventListener("click", activarEdicionNombre);
  iconoEditar?.addEventListener("click", activarEdicionNombre);
  inputNombre?.addEventListener("blur", guardarNombre);
  inputNombre?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") guardarNombre();
  });

  const streak = localStorage.getItem("writingStreak") || 4;
  if (streakElement) streakElement.textContent = streak;

  const logros = [
    { icono: "📚", titulo: "Primera reseña", desc: "¡Gracias por compartir tu opinión!" },
    { icono: "🔥", titulo: "Racha de 3 días", desc: "Estás on fire escribiendo." },
    { icono: "🎯", titulo: "Meta alcanzada", desc: "Completaste 1000 palabras." }
  ];
  if (logrosContenedor) {
    logros.forEach(logro => {
      const card = document.createElement("div");
      card.className = "card-personal";
      card.innerHTML = `<div style="font-size: 1.8rem;">${logro.icono}</div><strong>${logro.titulo}</strong><p>${logro.desc}</p>`;
      logrosContenedor.appendChild(card);
    });
  }

  if (profileInput && profileImg) {
    profileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (event) {
        profileImg.src = event.target.result;
        localStorage.setItem("profilePic", event.target.result);
      };
      reader.readAsDataURL(file);
    });
    const savedProfile = localStorage.getItem("profilePic");
    if (savedProfile) profileImg.src = savedProfile;
  }

  const savedImage = localStorage.getItem("bannerImage");
  const savedOffset = localStorage.getItem("bannerOffset");
  if (savedImage) {
    aplicarImagen(savedImage);
    if (savedOffset) banner.style.backgroundPositionY = `${savedOffset}px`;
  }

  bannerInput?.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      aplicarImagen(event.target.result);
    };
    reader.readAsDataURL(file);
  });

  dropdownBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownOptions?.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-wrapper")) {
      dropdownOptions?.classList.add("hidden");
    }
  });

  const ultimaPestana = localStorage.getItem("ultimaPestana") || "inicio";
  showTab(ultimaPestana);
  cargarTarjetasDesdeStorage();
});

// 📥 User Profile Name Edit
function activarEdicionNombre() {
  document.getElementById("nombre-usuario")?.classList.add("hidden");
  document.getElementById("icono-editar-nombre")?.classList.add("hidden");
  const input = document.getElementById("input-nombre-usuario");
  input?.classList.remove("hidden");
  input?.focus();
}

function guardarNombre() {
  const input = document.getElementById("input-nombre-usuario");
  const nuevoNombre = input.value.trim();
  if (nuevoNombre) {
    localStorage.setItem("username", nuevoNombre);
    document.getElementById("nombre-usuario").textContent = nuevoNombre;
  }
  input.classList.add("hidden");
  document.getElementById("nombre-usuario").classList.remove("hidden");
  document.getElementById("icono-editar-nombre").classList.remove("hidden");
}

// 🌓 Toggle Dark Mode
function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById("darkModeIcon");
  const text = document.getElementById("darkModeText");

  const isDark = body.classList.toggle("dark-mode");
  icon?.classList.replace(isDark ? "fa-moon" : "fa-sun", isDark ? "fa-sun" : "fa-moon");
  if (text) text.textContent = isDark ? "Modo claro" : "Modo oscuro";
  localStorage.setItem("darkMode", isDark);
}

// 🌇 Banner Functions
function aplicarImagen(url) {
  const banner = document.getElementById("bannerPreview");
  const placeholder = document.getElementById("bannerPlaceholder");
  const controls = document.getElementById("bannerControls");

  banner.style.backgroundImage = `url('${url}')`;
  banner.classList.add("has-image");
  placeholder?.classList.add("hidden");
  controls?.classList.add("visible");

  localStorage.setItem("bannerImage", url);
}

function pegarImagenDesdeLink() {
  const url = prompt("Pega el link de tu imagen:");
  if (url && /\.(jpeg|jpg|gif|png|webp)$/i.test(url)) {
    aplicarImagen(url);
  } else if (url) {
    alert("Ese enlace no parece una imagen válida 😓. Asegúrate de que termine en .jpg, .png, etc.");
  }
}

function quitarImagen() {
  const banner = document.getElementById("bannerPreview");
  const placeholder = document.getElementById("bannerPlaceholder");
  const controls = document.getElementById("bannerControls");

  banner.style.backgroundImage = "";
  banner.classList.remove("has-image");
  placeholder?.classList.remove("hidden");
  controls?.classList.remove("visible");

  localStorage.removeItem("bannerImage");
  localStorage.removeItem("bannerOffset");
}

function iniciarReposicion() {
  const offset = prompt("¿Cuántos píxeles hacia abajo?");
  if (!isNaN(offset)) {
    const banner = document.getElementById("bannerPreview");
    banner.style.backgroundPositionY = `${offset}px`;
    localStorage.setItem("bannerOffset", offset);
  }
}

// 🔀 Navigation & Tabs
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add("active");

  document.querySelectorAll(".sidebar .nav-link").forEach(link => link.classList.remove("active"));
  const clickedTab = [...document.querySelectorAll(".sidebar .nav-link")].find(link => link.getAttribute("onclick")?.includes(tabId));
  if (clickedTab) clickedTab.classList.add("active");

  localStorage.setItem("ultimaPestana", tabId);

  if (tabId === "libros") mostrarLibros?.();
  if (tabId === "biblioteca") mostrarBiblioteca?.();
  if (tabId === "fandoms") mostrarFandoms?.();
}
// Guardamos todos los libros en esta variable
let libros = JSON.parse(localStorage.getItem("librosGuardados")) || [];
let libroActualEditando = null;

// 🔁 Cargar al iniciar
document.addEventListener("DOMContentLoaded", () => {
  mostrarLibros();
});
function mostrarLibros() {
  const contenedor = document.getElementById("listaLibros");
  contenedor.innerHTML = "";

  libros.forEach((libro, index) => {
    const card = document.createElement("div");
    card.className = "libro-card";
    card.style.backgroundColor = libro.fondo || "#fff";

    // Si quieres mostrar portada, aquí puedes agregar la imagen
    const portadaHTML = libro.portada
      ? `<img src="${libro.portada}" alt="Portada de ${libro.titulo}">`
      : "";

    const checklistIcons = [
      libro.checklist?.escrito ? "✍️" : "",
      libro.checklist?.editado ? "🛠" : "",
      libro.checklist?.maquetado ? "📐" : "",
      libro.checklist?.publicado ? "📢" : ""
    ].join(" ");

  card.innerHTML = `
  ${portadaHTML}
  <h3 style="color: ${libro.colorTitulo || '#000'}">${libro.titulo || "Sin título"}</h3>
  <p>${libro.descripcion || "Sin descripción"}</p>
  <div class="barra-progreso">
    <div class="progreso" style="width: ${libro.progreso || 0}%"></div>
  </div>
  <p>${checklistIcons}</p>
  <button onclick="abrirModalEditar(${index})">✏️ Editar</button>
`;


    contenedor.appendChild(card);
  });
}

// 💾 Guardar libros en localStorage
function guardarLibros() {
  localStorage.setItem("librosGuardados", JSON.stringify(libros));
}

// 🧩 Abrir modal para editar libro
function abrirModalEditar(index) {
  libroActualEditando = index;
  const libro = libros[index];

  document.getElementById("modalTitulo").value = libro.titulo || "";
  document.getElementById("modalDescripcion").value = libro.descripcion || "";
  document.getElementById("modalProgreso").value = libro.progreso || 0;
  document.getElementById("modalBarraProgreso").style.width = `${libro.progreso || 0}%`;
  document.getElementById("modalFondo").value = libro.fondo || "#ffffff";
  document.getElementById("modalPortadaLink").value = libro.portada || "";
  document.getElementById("modalColorTitulo").value = libro.colorTitulo || "#000000";
  document.getElementById("checkEscrito").checked = libro.checklist?.escrito || false;
  document.getElementById("checkEditado").checked = libro.checklist?.editado || false;
  document.getElementById("checkMaquetado").checked = libro.checklist?.maquetado || false;
  document.getElementById("checkPublicado").checked = libro.checklist?.publicado || false;

  document.getElementById("modalEditarLibro").classList.remove("hidden");
}

// ❌ Cerrar modal
function cerrarModal() {
  document.getElementById("modalEditarLibro").classList.add("hidden");
  libroActualEditando = null;
}

// 🎚 Mostrar progreso en vivo
document.getElementById("modalProgreso").addEventListener("input", (e) => {
  document.getElementById("modalBarraProgreso").style.width = `${e.target.value}%`;
});

// 💾 Guardar cambios desde el modal
function guardarCambiosModal() {
  if (libroActualEditando === null) return;
  const libro = libros[libroActualEditando];

  libro.titulo = document.getElementById("modalTitulo").value;
  libro.descripcion = document.getElementById("modalDescripcion").value;
  libro.progreso = parseInt(document.getElementById("modalProgreso").value);
  libro.fondo = document.getElementById("modalFondo").value;
  libro.portada = document.getElementById("modalPortadaLink").value;
  libro.colorTitulo = document.getElementById("modalColorTitulo").value;
  libro.colorTitulo = document.getElementById("modalColorTitulo").value;


  libro.checklist = {
    escrito: document.getElementById("checkEscrito").checked,
    editado: document.getElementById("checkEditado").checked,
    maquetado: document.getElementById("checkMaquetado").checked,
    publicado: document.getElementById("checkPublicado").checked,
  };

  const file = document.getElementById("modalPortadaArchivo").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      libro.portada = e.target.result;
      guardarLibros();
      mostrarLibros();
      cerrarModal();
    };
    reader.readAsDataURL(file);
  } else {
    guardarLibros();
    mostrarLibros();
    cerrarModal();
  }
}
function crearLibroNuevo() {
  libros.push({
    titulo: "",
    descripcion: "",
    progreso: 0,
    fondo: "#ffffff",
    colorTitulo: "#000000",
    portada: "",
    checklist: {
      escrito: false,
      editado: false,
      maquetado: false,
      publicado: false
    }
  });
  guardarLibros();
  mostrarLibros();
}
function mostrarBiblioteca() {
  const contenedor = document.getElementById("contenedorBiblioteca");
  contenedor.innerHTML = "";

  const biblioteca = JSON.parse(localStorage.getItem("miBiblioteca")) || [];

  if (biblioteca.length === 0) {
    contenedor.innerHTML = "<p class='text-muted'>Tu biblioteca está vacía. ¡Ve a explorar y añade tus favoritos! 📚✨</p>";
    return;
  }

  biblioteca.forEach(item => {
    const card = document.createElement("div");
    card.className = "tool-card";

    card.innerHTML = `
      <img src="${item.enlace}" alt="${item.titulo}">
      <div class="tool-info"><strong>${item.titulo}</strong></div>
      <div class="overlay">${item.descripcion}</div>
    `;

    contenedor.appendChild(card);
  });
}
function mostrarBiblioteca() {
  const contenedor = document.getElementById("contenedorBiblioteca");
  contenedor.innerHTML = "";

  const biblioteca = JSON.parse(localStorage.getItem("miBiblioteca")) || [];

  if (biblioteca.length === 0) {
    contenedor.innerHTML = "<p class='text-muted'>Tu biblioteca está vacía. ¡Ve a explorar y añade tus favoritos! 📚✨</p>";
    return;
  }

  biblioteca.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "tool-card";

    card.innerHTML = `
      <button class="btn-quitar" title="Eliminar" onclick="eliminarDeBiblioteca(${index})">✖</button>
      <img src="${item.enlace}" alt="${item.titulo}">
      <div class="tool-info"><strong>${item.titulo}</strong></div>
      <div class="overlay">${item.descripcion}</div>
    `;

    contenedor.appendChild(card);
  });
}
function eliminarDeBiblioteca(index) {
  const biblioteca = JSON.parse(localStorage.getItem("miBiblioteca")) || [];
  biblioteca.splice(index, 1); // Elimina solo ese
  localStorage.setItem("miBiblioteca", JSON.stringify(biblioteca));
  mostrarBiblioteca(); // Vuelve a mostrar los actualizados
}



// 🧪 Función para obtener fandoms desde localStorage
function obtenerFandoms() {
  return JSON.parse(localStorage.getItem("misFandoms")) || [];
}

// 💾 Función para guardar fandoms
function guardarFandoms(fandoms) {
  localStorage.setItem("misFandoms", JSON.stringify(fandoms));
}

