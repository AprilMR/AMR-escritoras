document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito-items");
  const total = document.getElementById("carrito-total");
  const vaciar = document.getElementById("vaciar-carrito");
  const contador = document.querySelector(".cart-count");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderCarrito() {
    contenedor.innerHTML = "";
    let suma = 0;

    if (carrito.length === 0) {
      contenedor.innerHTML = "<p class='text-muted'>Tu carrito está vacío.</p>";
      total.textContent = "$0";
      if (contador) contador.textContent = "0";
      return;
    }

    carrito.forEach((producto, index) => {
      const card = document.createElement("div");
      card.classList.add("card", "mb-3");
      card.classList.add("card", "mb-3", "carrito-producto");
card.innerHTML = `
  <div class="row g-0 align-items-center">
    <div class="col-4 col-md-3">
      <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
    </div>
    <div class="col-8 col-md-9">
      <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
        <div>
          <h5 class="card-title mb-1">${producto.nombre}</h5>
          <p class="card-text mb-2">${producto.precio}</p>
        </div>
        <button class="btn btn-danger eliminar" data-index="${index}">Quitar</button>
      </div>
    </div>
  </div>
`;
 `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">${producto.precio}</p>
              <button class="btn btn-danger eliminar" data-index="${index}">Quitar</button>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(card);

      // Sumar el precio quitando símbolo y puntos
      suma += parseInt(producto.precio.replace("$", "").replace(/\./g, ""));
    });

    total.textContent = `$${suma.toLocaleString("es-CO")}`;
    if (contador) contador.textContent = carrito.length;
  }

  // Quitar productos individuales
  contenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      const index = parseInt(e.target.dataset.index);
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      localStorage.setItem("cartCount", carrito.length.toString());
      renderCarrito();
    }
  });

  // Vaciar todo el carrito
  if (vaciar) {
    vaciar.addEventListener("click", () => {
      carrito = [];
      localStorage.removeItem("carrito");
      localStorage.setItem("cartCount", "0");
      renderCarrito();
    });
  }

  // Inicializar renderizado
  renderCarrito();
});
