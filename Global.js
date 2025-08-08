document.addEventListener("DOMContentLoaded", () => {
  // 🛒 Mostrar contador del carrito
  const count = localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito")).length
    : 0;

  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }

  // 🌗 Modo oscuro
  const saved = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  const icon = document.getElementById("darkModeIcon");
  const text = document.getElementById("darkModeText");

  if (saved) {
    body.classList.add("dark-mode");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
    if (text) {
      text.textContent = "Modo claro";
    }
  }

  // 📚 Botones "Añadir a Mi Biblioteca"
  const botones = document.querySelectorAll(".añadir-biblioteca");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const titulo = boton.dataset.titulo;
      const descripcion = boton.dataset.descripcion;
      const enlace = boton.dataset.enlace;
      const tipo = boton.dataset.tipo;

      const biblioteca = JSON.parse(localStorage.getItem("miBiblioteca")) || [];

      const yaExiste = biblioteca.some(item => item.titulo === titulo && item.tipo === tipo);
      if (yaExiste) {
        alert("¡Este recurso ya está en tu biblioteca! 📚");
        return;
      }

      biblioteca.push({ titulo, descripcion, enlace, tipo });
      localStorage.setItem("miBiblioteca", JSON.stringify(biblioteca));

      alert("¡Recurso guardado en tu biblioteca! ✨");
    });
  });

  // 👤 Cambiar modo de perfil
  const perfilSwitch = document.getElementById("modoPerfilSwitch");
  if (perfilSwitch) {
    const modoActual = localStorage.getItem("modoPerfil") || "escritor";
    perfilSwitch.checked = modoActual === "lector";

    perfilSwitch.addEventListener("change", () => {
      const nuevoModo = perfilSwitch.checked ? "lector" : "escritor";
      localStorage.setItem("modoPerfil", nuevoModo);
      alert(`Cambiaste al perfil de ${nuevoModo.charAt(0).toUpperCase() + nuevoModo.slice(1)} 📚✍️`);
    });
  }
});

// Función global de toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById("darkModeIcon");
  const text = document.getElementById("darkModeText");

  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  if (icon) {
    icon.classList.remove(isDark ? "fa-moon" : "fa-sun");
    icon.classList.add(isDark ? "fa-sun" : "fa-moon");
  }

  if (text) {
    text.textContent = isDark ? "Modo claro" : "Modo oscuro";
  }

  localStorage.setItem("darkMode", isDark);
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
      <img src="${item.enlace || 'ruta/a/imagen-generica.jpg'}" alt="${item.titulo}">
      <div class="tool-info">
        <strong>${item.titulo}</strong>
        ${item.tipo === "articulo" ? "<span class='etiqueta-articulo'>📰 Artículo</span>" : ""}
      </div>
      <div class="overlay">${item.descripcion}</div>
      <button class="btn-quitar" onclick="eliminarDeBiblioteca(${index})">❌</button>
    `;

    contenedor.appendChild(card);
  });
}
function mostrarFandoms() {
  const contenedor = document.getElementById("iconosFandoms");
  contenedor.innerHTML = "";

  const fandoms = JSON.parse(localStorage.getItem("misFandoms")) || [];

  if (fandoms.length === 0) {
    contenedor.innerHTML = "<p class='text-muted'>No te has unido a ningún fandom todavía. ¡Explora y encuentra tus favoritos! 🌟</p>";
    return;
  }

  fandoms.forEach(f => {
    const icono = document.createElement("a");
    icono.href = f.enlace;
    icono.className = "fandom-icono";
    icono.title = f.nombre;
    icono.innerHTML = `<img src="${f.icono}" alt="${f.nombre}">`;
    contenedor.appendChild(icono);
  });
}

// Mostrar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarFandoms();
});
