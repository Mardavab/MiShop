// PRODUCTOS
let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos(productos);
    });

const contenedorProductos = document.getElementById('contenedor-productos');
const btnCategorias = document.querySelectorAll('.btn-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numerito = document.getElementById('numerito')

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">$${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}

cargarProductos(productos);

btnCategorias.forEach(boton => {
    boton.addEventListener('click',(e) =>{
        btnCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add('active');

        if (e.currentTarget.id != "todos") {
            const productoCategoria  = productos.find(producto => producto.categoria.id === e.currentTarget.id);
           const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id); 
           cargarProductos(productosBoton);
           tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;
        }else{
            tituloPrincipal.innerHTML = "Todos los productos";
            cargarProductos(productos);
        }
    

        
    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarito)
    });
}

let productosEnCarritoLS = localStorage.getItem('productos-en-carrito'); 
let productosEnCarrito;
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}
 
 
function agregarAlCarito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    //let cantidadCarrito = 0;

    Toastify({
        text: "Producto agregado",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        offset: {
            x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: '2rem',
          textTransform:'upeercase',
          fontZise: ".75rem"
        },
        onClick: function(){} // Callback after click
      }).showToast();

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;


        
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
        
    //productosEnCarrito.forEach(producto => {
    //    cantidadCarrito = cantidadCarrito + producto.cantidad
    //    numerito.innerHTML = cantidadCarrito;
    //});
    actualizarNumerito();
    saveData();
}

function actualizarNumerito() {
    let cantidadCarrito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    numerito.innerText = cantidadCarrito;
}


function saveData() {
    localStorage.setItem("productos-en-carrito",  JSON.stringify(productosEnCarrito));

}

function clearData() {
    localStorage.removeItem("data");
    localStorage.removeItem("numTareas");
    localStorage.removeItem("productos-en-carrito");
    localStorage.removeItem("numerito");
}