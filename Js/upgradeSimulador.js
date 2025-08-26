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
]; //Array contenedor de lista de productos.

const calcularSubTotal = (a, b) => {
  let total = a * b;
  return total;
}; //funcion que multiplica el precio del producto por la cantidad del mismo.

const restarStock = (a, b) => a - b; //funcion que resta del stock la cantidad de unidades seleccionadas.

let total = 0;
const carrito = []; //Array que contiene los productos seleecionados.
let seguirComprando = true;

//bucle while  que mientras la variable seguirComprando tenga el valor true se ejecuta y se cierra cuando seguirComprando se vuelve false.
while (seguirComprando) {
  let listaProductos = productos
    .map((p) => `- ${p.nombre}: $${p.precio}`)
    .join("\n"); //recorre el array productos
  alert(`Lista de productos disponibles:\n\n${listaProductos}`); //muestra el array productos con nombres y precios

  let productoIngresado = prompt("¿Que producto deseas comprar?");
  let existe = false;

  for (let i = 0; i < productos.length; i++) {
    //recorre el array productos en toda su extension
    let producto = productos[i];

    if (producto.nombre === productoIngresado) {
      //verifica que el producto ingresado exista en el array.
      existe = true;

      let cantidad = Number(prompt("Ingrese la cantidad de unidades"));

      if (isNaN(cantidad) || cantidad <= 0) {
        //ingresa en if si el dato no es numerico o menor a 0.
        alert("Ingresa una cantidad valida");
        break;
      }

      if (cantidad > producto.stock) {
        //ingresa en if si la cantidad es menor al stock del producto
        alert(`Stock insuficiente, quedan ${producto.stock} unidades`);
        break;
      }

      let subtotal = calcularSubTotal(producto.precio, cantidad);
      total += subtotal;
      producto.stock = restarStock(producto.stock, cantidad);

      carrito.push({ nombre: producto.nombre, cantidad, subtotal }); //mediante push ingresa al array carrito el o los productos ingresados.
      alert(
        `Agregaste ${cantidad} unidades de ${producto.nombre} por el monto de $${subtotal}` //ademas agrega el subtotal de cada uno.
      );

      break;
    }
  }

  if (!existe) {
    alert("No existe tal producto");
  } //si el producto no existe dentro del array productos convierte la variable existe en un false y regresa al unicio del bucle while

  seguirComprando = confirm("Deseas comprar otro producto"); //aqui es donde si selccionamos aceptar el bucle while vuelve a iniciarse o caso contrario el bucle se cierra.
}

let mostrarResumen = (carrito, total) => {
  let resumen = "";
  for (let i = 0; i < carrito.length; i++) {
    //recorre el array carrito en toda su extension con los productos que se hayan seleccionado.
    resumen += `\n${carrito[i].cantidad} x \n${carrito[i].nombre} = $${carrito[i].subtotal}\n`;
  }
  resumen += `Tu total a pagar: $${total}. Gracias por elegirnos`;
  alert(resumen); //nos muestra el resumen de nuestra compra.
};

mostrarResumen(carrito, total);

console.log(carrito); //Colocado para verificar que los productos seleccionados se guardan en el array carrito
console.log(productos); // Colocado para verificar si el stock resta las unidades de la compra realizada
//Muestra el resumen de la compra por consola
