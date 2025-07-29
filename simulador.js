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

const compra = (a, b) => {
  let total = a * b;
  return total;
};

const restarStock = (a, b) => {
  return a - b;
};

let total = 0;
let seguirComprando = true;

while (seguirComprando) {
  let productoIngresado = prompt("¿Que producto deseas comprar?");
  let existe = false;

  for (let i = 0; i < productos.length; i++) {
    let producto = productos[i];

    if (producto.nombre === productoIngresado) {
      existe = true;

      let cantidad = Number(prompt("Ingrese la cantidad de unidades"));

      if (cantidad <= 0) {
        alert("Ingresa una cantidad valida");
        break;
      }

      if (cantidad > producto.stock) {
        alert(`Stock insuficiente, quedan ${producto.stock} unidades`);
        break;
      }

      let subtotal = compra(producto.precio, cantidad);
      total = subtotal;

      producto.stock = restarStock(producto.stock, cantidad);

      alert(
        `Tu compra sera ${cantidad} de ${producto.nombre} y el total es de ${subtotal}`
      );
      break;
    }
  }

  if (!existe) {
    alert("No existe tal producto");
  }

  seguirComprando = confirm("Deseas comprar otro producto");
  if (!seguirComprando) {
    break;
  }
}

alert(`Gracias por tu por elegirnos. Total a pagar: ${total}`);
