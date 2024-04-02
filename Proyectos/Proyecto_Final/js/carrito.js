let carritoProductos = localStorage.getItem("productos-en-carrito");
carritoProductos = JSON.parse(carritoProductos);

//puesto de control
console.log(carritoProductos)

//Declaracion de elementos 
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function getPrecioActual(producto){
    if(producto.oferta>0){
        return(producto.oferta)
    }else{
        return(producto.precioLista)
    }

}

//Funcion para cargar productos
function cargarProductosCarrito() {

    if (carritoProductos && carritoProductos.length > 0) {

        //se desactivan los elementos vacio y comprado y se activan los del carrito activo
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        
        //Reinicio de contenido
        contenedorCarritoProductos.innerHTML = "";
        
        //Recorro array carrito
        carritoProductos.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.img}" alt="${producto.nombre}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${getPrecioActual(producto)}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${getPrecioActual(producto) * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}


function eliminarDelCarrito(e) {
    //Recupero el id del boton que es = al del producto en su array
    let idBoton = e.currentTarget.id;

    //recupero el index del producto a eliminar
    const index = carritoProductos.findIndex(producto => producto.id == idBoton);
    
    //puesto de control
    // console.log(carritoProductos)
    // console.log(index)
    
    //Elimino el producto elegido
    carritoProductos.splice(index, 1);

    //vuelvo a cargar al DOM 
    cargarProductosCarrito();

    //actualizo el LS
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    //Vacio el array
    carritoProductos.length = 0;
    //actualizo el LS
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos));
    //Actualizo al DOM
    cargarProductosCarrito()
    console.log("vaciaste carrito")
   
}

//Actualizo el valor TOTAL CON LA ACCUMULACION DE TODOS LOS SUBTOTALES
function actualizarTotal() {
    const totalCalculado = carritoProductos.reduce((acc, producto) => acc + (getPrecioActual(producto) * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    carritoProductos.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}