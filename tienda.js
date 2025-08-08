document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".add-to-cart");
  const cartCount = document.querySelector(".cart-count");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Actualiza contador visual
  function actualizarContador() {
    cartCount.textContent = carrito.length;
    localStorage.setItem("cartCount", carrito.length.toString());
  }

  // Recorrer botones
  botones.forEach((btn) => {
    const tarjeta = btn.closest(".card");
    const nombre = tarjeta.querySelector(".card-title").textContent.trim();
    const precio = tarjeta.querySelector(".price").textContent.trim();
    const imagen = tarjeta.querySelector("img").src;

    // Ver si ya está en el carrito
    const yaEnCarrito = carrito.some(item => item.nombre === nombre);

    if (yaEnCarrito) {
      btn.textContent = "¡Añadido!";
      btn.classList.remove("btn-warning");
      btn.classList.add("btn-success");
      btn.dataset.inCart = "true";
    } else {
      btn.dataset.inCart = "false";
    }

    btn.addEventListener("click", () => {
      const enCarrito = btn.dataset.inCart === "true";

      if (enCarrito) {
        // Eliminar
        carrito = carrito.filter((item) => item.nombre !== nombre);
        btn.textContent = "Agregar al carrito";
        btn.classList.remove("btn-success");
        btn.classList.add("btn-warning");
        btn.dataset.inCart = "false";
      } else {
        // Agregar
        carrito.push({ nombre, precio, imagen });
        btn.textContent = "¡Añadido!";
        btn.classList.remove("btn-warning");
        btn.classList.add("btn-success");
        btn.dataset.inCart = "true";
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
    });
  });

  actualizarContador();
});
