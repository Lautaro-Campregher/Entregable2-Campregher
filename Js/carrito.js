let productosEncarrito = JSON.parse(localStorage.getItem("lista")) || [];

const mostrarCarrito = () => {
  let contenedor = document.querySelector(".productos-carrito");
  let carritoCompleto = "";

  productosEncarrito.forEach((producto) => {
    carritoCompleto += `
      <div class="producto">
       <h3>${producto.nombre}</h3>
       <h4>${producto.precio}</h4>
       <button onclick="quitarProducto(${producto.id})">Quitar</button>
      </div>
      `;
  });

  contenedor.innerHTML = carritoCompleto;
};

mostrarCarrito();

let btnLimpiar = document.getElementById("limpiar");
btnLimpiar.addEventListener("click", () => {
  localStorage.removeItem("lista");
  productosEncarrito = [];
  mostrarCarrito();
});

const quitarProducto = (id) => {
  let carritoLimpio = productosEncarrito.filter(
    (producto) => producto.id !== id
  );
  productosEncarrito = carritoLimpio;
  localStorage.setItem("lista", JSON.stringify(productosEncarrito));
  mostrarCarrito();
};
