//ARRAY con productos de la tienda
let productos = [];

//Variables que recuperan elementos del DOM
let carrito = JSON.parse(localStorage.getItem("lista")) || []; // Recupera el carrito de localStorage
let categoria = document.getElementById("inp-filtrar"); // Recupera el input de filtrar
let botonFiltrar = document.getElementById("btn-filtrar"); // Recupera el boton de filtrar

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
       <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
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
    Swal.fire({
      text: "No existe tal categoria. Intenta nuevamente",
      icon: "info",
      timer: 3000,
      showConfirmButton: false,
    });
  }
};

botonFiltrar.addEventListener("click", filtarCategoria);

// Funcion que agrega el producto al carrito
const agregarAlCarrito = (id) => {
  if (carrito.some((item) => item.id === id)) {
    Swal.fire({
      title: "Error",
      text: "El producto ya existe en el carrito",
      icon: "error",
      timer: 2000,
    });
    return;
  }
  let productoSeleccionado = productos.find((producto) => producto.id === id);
  carrito.push(productoSeleccionado);
  localStorage.setItem("lista", JSON.stringify(carrito));
  Toastify({
    text: `${productoSeleccionado.nombre}\n Agregado al carrito`,
    duration: 3000,
    gravity: "top",
    position: "right",
  }).showToast();
};

// Cargar productos desde el archivo JSON
const cargarProductos = async () => {
  try {
    const response = await axios.get("./public/data.json");
    productos = response.data;
    mostrarCatalogo(productos);
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo cargar el catálogo",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};
cargarProductos();
