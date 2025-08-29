let productos = [
  {
    id: 1,
    nombre: "Smartphone",
    precio: 900,
    categoria: "Electronica",
    imagen: "assets/smartphone.avif",
  },
  {
    id: 2,
    nombre: "Tablet",
    precio: 400,
    categoria: "Electronica",
    imagen: "assets/tablet.webp",
  },
  {
    id: 3,
    nombre: "Laptop",
    precio: 1000,
    categoria: "Electronica",
    imagen: "assets/laptop.webp",
  },
  {
    id: 4,
    nombre: "Smartwatch",
    precio: 70,
    categoria: "Electronica",
    imagen: "assets/smartwatch.webp",
  },
  {
    id: 5,
    nombre: "Auriculares inalámbricos",
    precio: 25,
    categoria: "Electronica",
    imagen: "assets/auriculares.webp",
  },
  {
    id: 6,
    nombre: "Cámara digital",
    precio: 110,
    categoria: "Fotografia",
    imagen: "assets/camaradigital.webp",
  },
  {
    id: 7,
    nombre: "Impresora multifuncional",
    precio: 150,
    categoria: "Computacion",
    imagen: "assets/impresora.webp",
  },
  {
    id: 8,
    nombre: "Altavoz Bluetooth",
    precio: 50,
    categoria: "Electronica",
    imagen: "assets/parlante.webp",
  },
  {
    id: 9,
    nombre: "Reproductor de música MP3",
    precio: 30,
    categoria: "Electronica",
    imagen: "assets/mp3.webp",
  },
  {
    id: 10,
    nombre: "Videojuego para consola",
    precio: 60,
    categoria: "Videojuegos",
    imagen: "assets/juegoPs4.webp",
  },
  {
    id: 11,
    nombre: "Teclado gamer",
    precio: 80,
    categoria: "Computacion",
    imagen: "assets/tecladomecanico.webp",
  },
  {
    id: 12,
    nombre: "Monitor de pantalla plana",
    precio: 200,
    categoria: "Computacion",
    imagen: "assets/monitor-Gamer.webp",
  },
  {
    id: 13,
    nombre: "Router Wi-Fi",
    precio: 70,
    categoria: "Electronica",
    imagen: "assets/router-wifi.webp",
  },
  {
    id: 14,
    nombre: "Videocámara HD",
    precio: 300,
    categoria: "Fotografia",
    imagen: "assets/videocamara.webp",
  },
  {
    id: 15,
    nombre: "Disco duro externo",
    precio: 120,
    categoria: "Computacion",
    imagen: "assets/disco-duro-externo.webp",
  },
];

let carrito = JSON.parse(localStorage.getItem("lista")) || [];

let categoria = document.getElementById("inp-filtrar");
let botonFiltrar = document.getElementById("btn-filtrar");

// Funcion que filtra los productos por categoria.
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

  catalogo.innerHTML = catalogoCompleto;
};

mostrarCatalogo(productos);

// Funcion que agrega el producto al carrito
const agregarAlcarrito = (id) => {
  let productoSeleccionado = productos.find((producto) => producto.id === id);
  carrito.push(productoSeleccionado);
  alert("Producto agregado al carrito");
  localStorage.setItem("lista", JSON.stringify(carrito));
};
