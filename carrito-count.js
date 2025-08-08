document.addEventListener("DOMContentLoaded", () => {
  const count = localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito")).length
    : 0;

  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
});
