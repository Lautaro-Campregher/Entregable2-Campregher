//ARRAY almaceando en localstorage
let productosEncarrito = JSON.parse(localStorage.getItem("lista")) || [];

//Variables que recuperan elementos del DOM
let totalElemento = document.getElementById("total");
let contenedor = document.querySelector(".productos-carrito");
let btnLimpiar = document.getElementById("limpiar");
let alerta = document.querySelector(".alerta");
let confirmar = document.getElementById("confirmar");

// Función para calcular la suma total
const sumaCarrito = () => {
  let suma = 0;
  productosEncarrito.forEach((producto) => {
    suma += producto.precio;
  });
  totalElemento.innerText = `$${suma}`;
  return suma;
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
// Renderizaría esta función mostrando primero el modal de confirmación, y solo si el usuario confirma, eliminaría el producto del array, actualizaría el localStorage y luego renderizaría el carrito nuevamente. Así se evita eliminar el producto antes de la confirmación. Ejemplo:

const quitarProducto = (id) => {
  Swal.fire({
    title: "¿Quieres eliminar el producto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar.",
  }).then((result) => {
    if (result.isConfirmed) {
      productosEncarrito = productosEncarrito.filter(
        (producto) => producto.id !== id
      );
      localStorage.setItem("lista", JSON.stringify(productosEncarrito));
      Toastify({
        text: "Producto eliminado",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();

      mostrarCarrito();
    }
  });
};

// Botón para limpiar carrito completo
btnLimpiar.addEventListener("click", () => {
  Swal.fire({
    title: "¿Quieres vaciar el carrito?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, vaciar carrito.",
  }).then((result) => {
    if (result.isConfirmed) {
      productosEncarrito = [];
      localStorage.removeItem("lista");
      Toastify({
        text: "Carrito vaciado",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();

      mostrarCarrito();
    }
  });
});

confirmar.addEventListener("click", () => {
  if (sumaCarrito() === 0) {
    Swal.fire({
      title: "Error",
      text: "No existen productos en el carrito",
      icon: "error",
      timer: 3000,
    });
    return;
  }
  Swal.fire({
    text: "¿Quieres confirmar la compra?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, confirmar.",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      productosEncarrito = [];
      localStorage.removeItem("lista");
      mostrarCarrito();

      Swal.fire({
        title: "Compra confirmada",
        text: "Pedido procesado con exito. Gracias por confiar en nosotros",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  });
});

// Mostrar carrito al cargar la página
mostrarCarrito();
