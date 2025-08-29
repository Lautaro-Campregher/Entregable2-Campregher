let productosEncarrito = JSON.parse(localStorage.getItem("lista")) || [];

let totalElemento = document.getElementById("total");
let contenedor = document.querySelector(".productos-carrito");
let btnLimpiar = document.getElementById("limpiar");

// Función para calcular la suma total
const sumaCarrito = () => {
  let suma = 0;
  productosEncarrito.forEach((producto) => {
    suma += producto.precio;
  });
  totalElemento.innerText = `$${suma}`;
};

// Función para mostrar productos en el carrito
const mostrarCarrito = () => {
  let carritoCompleto = "";
  productosEncarrito.forEach((producto) => {
    carritoCompleto += `
      <div class="producto">
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}"alt="${producto.nombre}">
        <h4>$${producto.precio}</h4>
        <button onclick="quitarProducto(${producto.id})">Quitar</button>
      </div>
    `;
  });

  contenedor.innerHTML = carritoCompleto;
  sumaCarrito();
};

// Función para quitar un producto del carrito
const quitarProducto = (id) => {
  productosEncarrito = productosEncarrito.filter(
    (producto) => producto.id !== id
  );
  localStorage.setItem("lista", JSON.stringify(productosEncarrito));
  mostrarCarrito();
};

// Botón para limpiar carrito completo
btnLimpiar.addEventListener("click", () => {
  productosEncarrito = [];
  localStorage.removeItem("lista");
  mostrarCarrito();
});

// Mostrar carrito al cargar la página
mostrarCarrito();
