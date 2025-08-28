let productosEncarrito = JSON.parse(localStorage.getItem("lista")) || [];

const mostrarCarrito = () => {
  let contenedor = document.querySelector(".productos-carrito");
  let carritoCompleto = "";

  productosEncarrito.forEach((producto) => {
    carritoCompleto += `
      <div class="producto">
       <h3>${producto.nombre}</h3>
       <img src="${producto.imagen}">
       <h4>$${producto.precio}</h4>
       <button onclick="quitarProducto(${producto.id})">Quitar</button>
      </div>
      `;
  });

  contenedor.innerHTML = carritoCompleto;
};

mostrarCarrito();

let btnLimpiar = document.getElementById("limpiar");
btnLimpiar.addEventListener("click", () => {
  alert("Quieres vaciar el carrito");
  localStorage.removeItem("lista");
  productosEncarrito = [];
  mostrarCarrito();
});

const quitarProducto = (id) => {
  let carritoLimpio = productosEncarrito.filter(
    (producto) => producto.id !== id
  );
  alert("Vas a borrar este producto del carrito");
  productosEncarrito = carritoLimpio;
  localStorage.setItem("lista", JSON.stringify(productosEncarrito));
  mostrarCarrito();
};

let total = document.getElementById("total");
const sumaCarrito = () => {
  let total = productosEncarrito.reduce((acumulador, producto) => {
    return acumulador + producto.precio;
  }, 0);

  total.innerText = `$${total}`;
};
