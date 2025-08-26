let productosEncarrito = JSON.parse(localStorage.getItem("lista")) || [];

const mostrarCarrito = () => {
  let contenedor = document.querySelector(".productos-carrito");
  let carritoCompleto = "";

  productosEncarrito.forEach((producto) => {
    carritoCompleto += `
      <div class="producto">
       <h3>${producto.nombre}</h3>
       <h4>${producto.precio}</h4>
       <button>Quitar</button>
      </div>
      `;
  });

  contenedor.innerHTML = carritoCompleto;
};

mostrarCarrito();

const quitarProducto = () => {};
