let productos = [
  {
    id: 1,
    nombre: "Smartphone",
    precio: 500,
    categoria: "Electrónica",
    stock: 100,
  },
  { id: 2, nombre: "Tablet", precio: 300, categoria: "Electrónica", stock: 50 },
  { id: 3, nombre: "Laptop", precio: 800, categoria: "Electrónica", stock: 70 },
  {
    id: 4,
    nombre: "Smartwatch",
    precio: 200,
    categoria: "Electrónica",
    stock: 30,
  },
  {
    id: 5,
    nombre: "Auriculares inalámbricos",
    precio: 100,
    categoria: "Electrónica",
    stock: 150,
  },
  {
    id: 6,
    nombre: "Cámara digital",
    precio: 400,
    categoria: "Fotografía",
    stock: 20,
  },
  {
    id: 7,
    nombre: "Impresora multifuncional",
    precio: 150,
    categoria: "Computación",
    stock: 40,
  },
  {
    id: 8,
    nombre: "Altavoz Bluetooth",
    precio: 50,
    categoria: "Electrónica",
    stock: 80,
  },
  {
    id: 9,
    nombre: "Reproductor de música MP3",
    precio: 30,
    categoria: "Electrónica",
    stock: 60,
  },
  {
    id: 10,
    nombre: "Videojuego para consola",
    precio: 60,
    categoria: "Videojuegos",
    stock: 25,
  },
  {
    id: 11,
    nombre: "Teclado gamer",
    precio: 80,
    categoria: "Computación",
    stock: 35,
  },
  {
    id: 12,
    nombre: "Monitor de pantalla plana",
    precio: 200,
    categoria: "Computación",
    stock: 15,
  },
  {
    id: 13,
    nombre: "Router Wi-Fi",
    precio: 70,
    categoria: "Electrónica",
    stock: 45,
  },
  {
    id: 14,
    nombre: "Videocámara HD",
    precio: 300,
    categoria: "Fotografía",
    stock: 10,
  },
  {
    id: 15,
    nombre: "Disco duro externo",
    precio: 120,
    categoria: "Computación",
    stock: 50,
  },
];

let carrito = JSON.parse(localStorage.getItem("lista")) || [];

let categoria = document.getElementById("inp-filtrar");
let botonFiltrar = document.getElementById("btn-filtrar");

const filtarCategoria = () => {
  let categoriaSeleccionada = categoria.value;

  if (categoriaSeleccionada === "") {
    mostrarCatalogo(productos);
    return;
  }

  let filtrado = productos.filter((producto) =>
    producto.categoria
      .toLowerCase()
      .includes(categoriaSeleccionada.toLowerCase())
  );

  if (filtrado.length > 0) {
    mostrarCatalogo(filtrado);
  } else {
    document.querySelector(
      ".productos"
    ).innerHTML = `<p style="color:red; font-weight:bold">No se encontraron productos</p>`;
  }
};

botonFiltrar.addEventListener("click", filtarCategoria);

const mostrarCatalogo = (productos) => {
  let catalogo = document.querySelector(".productos");
  let catalogoCompleto = "";

  productos.forEach((producto) => {
    catalogoCompleto += `
      <div class="producto">
       <h3>${producto.nombre}</h3>
       <h4>${producto.precio}</h4>
       <p>Categoría: ${producto.categoria}</p>
       <input type="number" placeholder="Cuantas unidades quieres agregar?" id="cantidad">
       <button onclick="agregarAlcarrito(${producto.id})">Agregar al carrito</button>
      </div>
      `;
  });

  catalogo.innerHTML = catalogoCompleto;
};

mostrarCatalogo(productos);

const agregarAlcarrito = (id) => {
  let productoSeleccionado = productos.find((producto) => producto.id === id);
  carrito.push(productoSeleccionado);
  localStorage.setItem("lista", JSON.stringify(carrito));
};
