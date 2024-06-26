let productosEnCarrito = localStorage.getItem('productos-en-carrito');
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.getElementById('carrito-vacio');
const contenedorCarritoProductos = document.getElementById('carrito-productos');
const contenedorCarritoAcciones = document.getElementById('carrito-acciones');
const contenedorCarritoComprado = document.getElementById('carrito-comprado');
const botonComprar = document.getElementById('carrito-acciones-comprar');
const carritoTotal = document.getElementById('total');
let botonEliminar = document.querySelectorAll('.carrito-producto-eliminar');
const botonVaciar = document.getElementById('carrito-acciones-vaciar');

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0 ) {
        contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoProductos.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
        contenedorCarritoProductos.innerHTML = '';
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="abrigo01">
                            <div class="carrito-producto-titulo">
                                <small>Titulo</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$${producto.cantidad*producto.precio}</p>
                            </div>
                            <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-trash-fill"></i></button>
            `;
            contenedorCarritoProductos.append(div);
            
        
    
        });
           
    }else{
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    }
   
    actualizarBotonesEliminar();
    actualizarTotal() 
}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    botonEliminar = document.querySelectorAll('.carrito-producto-eliminar');

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e) {
  let idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
  productosEnCarrito.splice(index,1);
  cargarProductosCarrito();
  localStorage.setItem("productos-en-carrito",  JSON.stringify(productosEnCarrito));
  Toastify({
    text: "Producto Elminado",
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
}

botonVaciar.addEventListener('click',vaciarCarrito);
function vaciarCarrito() {
    
    Swal.fire({
        title: "¿Estas Seguro?",
        icon: "question",
        html: `
          Se borraran ${productosEnCarrito.reduce((acc,producto) =>acc + (producto.cantidad),0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `si`,
        cancelButtonText: `no` ,
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            cargarProductosCarrito();
            localStorage.setItem("productos-en-carrito",  JSON.stringify(productosEnCarrito));
        };
      });
}

function actualizarTotal() {
    carritoTotal.innerText = productosEnCarrito.reduce((acc,producto) => acc + (producto.cantidad * producto.precio),0);
}


botonComprar.addEventListener('click', () => {   
    contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoComprado.classList.remove('disabled');
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito",  JSON.stringify(productosEnCarrito));  
}
);

