let productos = [
  {
    id: 1,
    nombre: "Smartphone",
    precio: 900.0,
    categoria: "Electronica",
    stock: 100,
    imagen: "assets/smartphone.avif",
  },
  {
    id: 2,
    nombre: "Tablet",
    precio: 400.0,
    categoria: "Electronica",
    stock: 50,
    imagen: "assets/tablet.webp",
  },
  {
    id: 3,
    nombre: "Laptop",
    precio: 1000000,
    categoria: "Electronica",
    stock: 70,
    imagen: "assets/laptop.webp",
  },
  {
    id: 4,
    nombre: "Smartwatch",
    precio: 70.0,
    categoria: "Electronica",
    stock: 30,
    imagen: "assets/smartwatch.webp",
  },
  {
    id: 5,
    nombre: "Auriculares inalámbricos",
    precio: 25.0,
    categoria: "Electronica",
    stock: 150,
    imagen: "assets/auriculares.webp",
  },
  {
    id: 6,
    nombre: "Cámara digital",
    precio: 110.0,
    categoria: "Fotografia",
    stock: 20,
    imagen: "assets/camaradigital.webp",
  },
  {
    id: 7,
    nombre: "Impresora multifuncional",
    precio: 150,
    categoria: "Computacion",
    stock: 40,
    imagen: "assets/impresora.webp",
  },
  {
    id: 8,
    nombre: "Altavoz Bluetooth",
    precio: 50,
    categoria: "Electronica",
    stock: 80,
    imagen: "assets/parlante.webp",
  },
  {
    id: 9,
    nombre: "Reproductor de música MP3",
    precio: 30,
    categoria: "Electronica",
    stock: 60,
    imagen: "assets/mp3.webp",
  },
  {
    id: 10,
    nombre: "Videojuego para consola",
    precio: 60,
    categoria: "Videojuegos",
    stock: 25,
    imagen: "assets/juegoPs4.webp",
  },
  {
    id: 11,
    nombre: "Teclado gamer",
    precio: 80,
    categoria: "Computacion",
    stock: 35,
    imagen: "assets/tecladomecanico.webp",
  },
  {
    id: 12,
    nombre: "Monitor de pantalla plana",
    precio: 200,
    categoria: "Computacion",
    stock: 15,
    imagen: "assets/monitor-Gamer.webp",
  },
  {
    id: 13,
    nombre: "Router Wi-Fi",
    precio: 70,
    categoria: "Electronica",
    stock: 45,
    imagen: "assets/router-wifi.webp",
  },
  {
    id: 14,
    nombre: "Videocámara HD",
    precio: 300,
    categoria: "Fotografia",
    stock: 10,
    imagen: "assets/videocamara.webp",
  },
  {
    id: 15,
    nombre: "Disco duro externo",
    precio: 120000,
    categoria: "Computacion",
    stock: 50,
    imagen: "assets/disco-duro-externo.webp",
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
       <img src="${producto.imagen}">
       <h4>$${producto.precio}</h4>
       <p>Categoría: ${producto.categoria}</p>
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
  alert("Producto agregado al carrito");
  localStorage.setItem("lista", JSON.stringify(carrito));
};
