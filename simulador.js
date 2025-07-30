let productos = [
  { nombre: "chocolate", precio: 1500, stock: 5 },
  { nombre: "milanesas", precio: 9000, stock: 3 },
  { nombre: "cafe", precio: 4780, stock: 7 },
  { nombre: "papel higenico", precio: 3600, stock: 2 },
  { nombre: "shampoo", precio: 5500, stock: 6 },
  { nombre: "afeitadora", precio: 2500, stock: 10 },
  { nombre: "pilas", precio: 2300, stock: 20 },
  { nombre: "fragancia kevin", precio: 11000, stock: 2 },
  { nombre: "pan lactal", precio: 2800, stock: 4 },
];

const añadirProducto = (a, b) => {
  let total = a * b;
  return total;
};

const restarStock = (a, b) => a - b;

let total = 0;
const carrito = [];
let seguirComprando = true;

while (seguirComprando) {
  let productoIngresado = prompt("¿Que producto deseas comprar?");
  let existe = false;

  for (let i = 0; i < productos.length; i++) {
    let producto = productos[i];

    if (producto.nombre === productoIngresado) {
      existe = true;

      let cantidad = Number(prompt("Ingrese la cantidad de unidades"));

      if (isNaN(cantidad) || cantidad <= 0) {
        alert("Ingresa una cantidad valida");
        break;
      }

      if (cantidad > producto.stock) {
        alert(`Stock insuficiente, quedan ${producto.stock} unidades`);
        break;
      }

      let subtotal = añadirProducto(producto.precio, cantidad);
      total += subtotal;
      producto.stock = restarStock(producto.stock, cantidad);

      carrito.push({ nombre: producto.nombre, cantidad, subtotal });
      alert(
        `Agregaste ${cantidad} unidades de ${producto.nombre} por el monto de ${subtotal}`
      );

      break;
    }
  }

  if (!existe) {
    alert("No existe tal producto");
  }

  seguirComprando = confirm("Deseas comprar otro producto");
}

let resumen = undefined;

carrito.forEach((i) => {
  resumen += `${i.cantidad} x ${i.nombre} = ${i.subtotal}`;
});
console.log(carrito); //Colocado para verificar que los productos seleccionados se guardan en el array carrito
console.log(productos); // Colocado para verificar si el stock resta las unidades de la compra realizada
resumen = `Tu total a pagar: ${total}. Gracias por elegirnos`;

alert(resumen);
