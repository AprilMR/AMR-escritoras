document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".unirme-fandom");

  botones.forEach(boton => {
    // Lo metemos dentro del evento para que lea cada dataset correctamente
    const nombre = boton.dataset.nombre;
    const icono = boton.dataset.icono;
    const enlace = boton.dataset.enlace;

    const fandomsGuardados = JSON.parse(localStorage.getItem("misFandoms")) || [];
    const yaUnido = fandomsGuardados.some(f => f.nombre === nombre);

    // Si ya está unido, actualizar botón de inmediato
    if (yaUnido) {
      actualizarBotonUnido(boton);
    }

    // Agregar evento solo si aún no está unido
    if (!yaUnido) {
      boton.addEventListener("click", () => {
        const fandoms = JSON.parse(localStorage.getItem("misFandoms")) || [];

        // Seguridad extra
        if (fandoms.some(f => f.nombre === nombre)) {
          alert("¡Ya estás en este fandom!");
          return;
        }

        fandoms.push({ nombre, icono, enlace });
        localStorage.setItem("misFandoms", JSON.stringify(fandoms));

        alert(`¡Bienvenid@ al fandom de ${nombre}!`);

        actualizarBotonUnido(boton); // Cambiar estado visual del botón

        if (typeof mostrarFandomsPerfil === "function") {
          mostrarFandomsPerfil();
        }
      });
    }
  });
});

// Función para actualizar el botón visualmente
function actualizarBotonUnido(boton) {
  boton.textContent = "Ya eres parte ✨";
  boton.disabled = true;
  boton.classList.add("btn-secondary");
  boton.classList.remove("btn-warning");
}


function updateProgress(percent) {
  const bar = document.querySelector(".progress-bar-inner");
  const label = document.querySelector(".progress-percent");
  bar.style.width = percent + "%";
  label.textContent = percent + "%";
}

// Ejemplo de uso:
updateProgress(0); // Puedes cambiar el 0 por otro valor
document.querySelectorAll('.unirme-fandom').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = "¡Unido!";
    btn.disabled = true;
  });
});
