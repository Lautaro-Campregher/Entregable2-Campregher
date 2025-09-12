//ARRAY con produtos de la tienda
let productos = [];

//Variables que recuperan elementos del DOM
let carrito = JSON.parse(localStorage.getItem("lista")) || []; // Recupera el carrito de localStorage
let categoria = document.getElementById("inp-filtrar"); // Recupera el input de filtrar
let botonFiltrar = document.getElementById("btn-filtrar"); // Recupera el boton de filtrar

const sweetAlert = (title, text, icon, button, time) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton: button,
    timer: time,
  });
};

const toastNotification = (text, duration, gravity, position) => {
  Toastify({
    text: text,
    duration: duration,
    gravity: gravity,
    position: position,
  }).showToast();
};

// Funcion que muestra el array productos como un catalogo
const mostrarCatalogo = (productos) => {
  let catalogo = document.querySelector(".productos");
  let catalogoCompleto = "";

  productos.forEach((producto) => {
    catalogoCompleto += `
      <div class="producto">
       <h3>${producto.nombre}</h3>
       <img src="${producto.imagen}"alt="${producto.nombre}" >
       <h4>$${producto.precio}</h4>
       <p>Categoría: ${producto.categoria}</p>
       <button onclick="agregarAlcarrito(${producto.id})">Agregar al carrito</button>
      </div>
      `;
  });

  catalogo.innerHTML = catalogoCompleto; // Muestra el catalogo completo
};

mostrarCatalogo(productos); // Muestra el catalogo completo

// Funcion que filtra los productos por categoria.
const filtarCategoria = () => {
  let categoriaSeleccionada = categoria.value;

  if (categoriaSeleccionada === "") {
    mostrarCatalogo(productos);
  }

  let filtrado = productos.filter((producto) =>
    producto.categoria
      .toLowerCase()
      .includes(categoriaSeleccionada.toLowerCase())
  );

  if (filtrado.length > 0) {
    mostrarCatalogo(filtrado);
  } else {
    mostrarCatalogo([]);
    sweetAlert("Error!", "No existe tal categoria", "error", false, 1500);
  }
};

botonFiltrar.addEventListener("click", filtarCategoria);

// Funcion que agrega el producto al carrito
const agregarAlcarrito = (id) => {
  try {
    if (carrito.some((item) => item.id === id)) {
      Swal.fire({
        title: "",
        text: "Este producto ya esta en el carrito.",
        icon: "error",
      });
      return;
    }
    let productoSeleccionado = productos.find((producto) => producto.id === id);
    carrito.push(productoSeleccionado);
    localStorage.setItem("lista", JSON.stringify(carrito));
    toastNotification(
      `${productoSeleccionado.nombre}\nAgregado al carrito`,
      2000,
      "top",
      "right"
    );
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.message || "Ocurrio un error al agregar el producto.",
      icon: "error",
    });
  }
};

axios
  .get("./data/data.json")
  .then((response) => {
    productos = response.data;
    mostrarCatalogo(productos);
  })
  .catch((error) => {
    sweetAlert("Error!", "Nose pudo cargar el catalogo", "error", false, 2000);
    console.error(error);
  });
