//#region RECURSOS


//------RECUPERO CARRITO ------------------
let carritoProductos = localStorage.getItem("productos-en-carrito");
carritoProductos = JSON.parse(carritoProductos);

let productosLS = JSON.parse(localStorage.getItem("array-productos"))

productos = productosLS


console.log(productos)

//puesto de control
//console.log(carritoProductos)

//Declaracion de elementos 
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const $btnDolar = document.querySelector("#carrito-acciones-moneda")

//console.log($btnDolar)
//#endregion 
//#region DOLAR
let dolarActive 
// Declara una variable global para almacenar los datos
let valorDolarBlue;

async function obtenerValorDolarBlue() {
    try {
        const response = await fetch('https://dolarapi.com/v1/dolares/blue');
        const data = await response.json();
       // console.log(data.venta);      
    
        return new Promise((resolve,reject) =>{
            setTimeout(() => {
                const datos = data.venta ; 
                resolve(datos); 
            },0);
        });


    } catch (error) {
    console.error('Error al obtener el valor del dólar blue:', error);
    return null;
    }
}

async function calcularPrecioEnDolar() {
    try {
    valorDolarBlue = await obtenerValorDolarBlue();

        if (valorDolarBlue !== null) {
           // console.log(valorDolarBlue)
            return valorDolarBlue 
        
        } else {
            console.error('No se pudo obtener el valor del dólar blue.');
        }
    } catch (error) {
    console.error('Error al calcular el precio en dólares:', error);
    }
}

$btnDolar.onclick = () =>{
    console.log(dolarActive)
    if(dolarActive){
        dolarActive = false
    }else{
        dolarActive = true
    }
    // puesto de control
    console.log("Precio en dolar: ", dolarActive)

    cargarProductosCarrito()

    
    actualizarBotonesEliminar();
    actualizarTotal();
}

//FUNCION DE PRECIO ACTUAL (LISTA // OFERTA)
function getPrecioActual(producto){
    if(producto.oferta>0){
        return(producto.oferta)
    }else{
        return(producto.precioLista)
    }

}


function tarjetaCarritoPesos (producto){

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
                    <div id="seccionCant">
                        <button class="boton-restar" id="${producto.id}" >-</button>
                        <p id="cantidad-producto">${producto.cantidad}</p>
                        <button class="boton-sumar" id="${producto.id}">+</button>
                    </div>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>AR$ ${getPrecioActual(producto)}</p>
                    
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>AR$ ${getPrecioActual(producto) * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
}

 async function tarjetaCarritoDolar (producto,precioDolar){

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
                    <div id="seccionCant">
                        <button class="boton-restar" id="${await producto.id}" >-</button>
                        <p id="cantidad-producto">${await producto.cantidad}</p>
                        <button class="boton-sumar" id="${await producto.id}">+</button>
                    </div>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>U$D ${((getPrecioActual(producto)) / await precioDolar).toFixed(2)}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>U$D ${((getPrecioActual(producto) * producto.cantidad)/ await precioDolar).toFixed(2)}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
    
}


//#region CARGAR 
//Funcion para cargar productos
async function cargarProductosCarrito() {

    if (carritoProductos && carritoProductos.length > 0) {
        
        //se desactivan los elementos vacio y comprado y se activan los del carrito activo
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        
        //Reinicio de contenido
        contenedorCarritoProductos.innerHTML = "";
        
        // Crear un array de promesas
        const promises = carritoProductos.map(producto => {
            if(dolarActive){
            return tarjetaCarritoDolar(producto, calcularPrecioEnDolar());
            } else {
            return tarjetaCarritoPesos(producto);
            }
        });

        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);

        let botonRestar = document.querySelectorAll('.boton-restar');
        let botonSumar = document.querySelectorAll('.boton-sumar')

        let idSuma,indexSuma;
        let idResta , indexResta ;
        
        botonRestar.forEach((boton, index) =>{
        //console.log(index)

            if(carritoProductos[index].cantidad == 1){
             botonRestar[index].disabled = true;
            }

            boton.onclick = (e) =>{
                //console.log(e.currentTarget.id)
                idResta = parseInt(e.currentTarget.id)
                indexResta = carritoProductos.findIndex(producto => producto.id === idResta);
             
                productoSeleccionado = carritoProductos[indexResta];
                productoSeleccionado.cantidad -= 1;
                //console.log(carritoProductos[indexSuma])

                cargarProductosCarrito();
                //check0(productoSeleccionado, botonRestar,indexResta)
                localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos))
            }
        })

        botonSumar.forEach(boton =>{
           // console.log(boton)
            boton.onclick = (e) =>{
                //console.log(e.currentTarget.id)
                idSuma = parseInt(e.currentTarget.id)
                indexSuma = carritoProductos.findIndex(producto => producto.id === idSuma);
                
                let productoSeleccionado = carritoProductos[indexSuma] ;
                productoSeleccionado.cantidad += 1;
                cargarProductosCarrito();
                //check0(productoSeleccionado, botonSumar, indexSuma)
    
                localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos))
            }
        })
        
    
        actualizarBotonesEliminar();
        actualizarTotal();
	
    } else {
        //SI NO VACIO
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

     

    
    
    
}

//CARGO PRODUCTOS
cargarProductosCarrito();

//ACTUALIZO LOS ID DE LOS BOTONES
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

//FUNCION PARA ELIMINAR
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

//VACIAR CARRITO
function vaciarCarrito() {
    //Vacio el array
    carritoProductos.length = 0;
    //actualizo el LS
    localStorage.setItem("productos-en-carrito", JSON.stringify(carritoProductos));
    //Actualizo al DOM
    cargarProductosCarrito()
    //console.log("vaciaste carrito")
   
}

//---EVENTO PARA VACIAR CARRITO
botonVaciar.addEventListener("click", vaciarCarrito);

//Actualizo el valor TOTAL CON LA ACCUMULACION DE TODOS LOS SUBTOTALES
async function actualizarTotal() {
    const totalCalculado = carritoProductos.reduce((acc, producto) => acc + (getPrecioActual(producto) * producto.cantidad), 0);
    let totalEnDolar = (totalCalculado / await calcularPrecioEnDolar()).toFixed(2)
    
    if(dolarActive){
        total.innerText = `U$D ${totalEnDolar}`;
        return totalEnDolar
    }else{
        total.innerText = `AR$ ${totalCalculado}`;
        return totalCalculado
    }

    
    
    
}

//FUNCION DE COMPRA
botonComprar.addEventListener("click", comprarCarrito);

//funcion de alerta de compra
async function alertaDeCompra(){
    try {
       let result = await Swal.fire({
        title: 'Ingresa tus datos',
        html: `
            <button id="swal-close" style="float: right; border: none; background: none;">X</button>
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre/Apodo">
            <input id="swal-correo" class="swal2-input" placeholder="Correo Electrónico">
            <input id="swal-telefono" class="swal2-input" placeholder="Número Telefónico">
        `,
        focusConfirm: false,
        showConfirmButton: true, // Oculta el botón de confirmación
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#swal-nombre').value
            const correo = Swal.getPopup().querySelector('#swal-correo').value
            const telefono = Swal.getPopup().querySelector('#swal-telefono').value

            if (!nombre || !correo || !telefono) {
                Swal.showValidationMessage(`Por favor ingresa todos los campos`)
            }

            return { nombre: nombre, correo: correo, telefono: telefono }
        }
        })
        
        if (result.isConfirmed) {
            // Guardar los datos en el objeto contacto
            return(result.value);

                
        }
        

        // Agrega un evento de click al botón de cierre
        document.querySelector('#swal-close').addEventListener('click', () => {
            Swal.close();
            throw new Error('Formulario cerrado sin completar');
        });

    }catch (error) {
        console.error(error);
  
    }
}

//SIMULACION DE COMPRA
async function comprarCarrito() {
    let contacto

    await  alertaDeCompra().then(result => {
        contacto = result;
            
    });

    
    let total = await actualizarTotal()
    let cotizacion = await calcularPrecioEnDolar()
    let fecha = luxon.DateTime.now();
    let momento = fecha.toLocaleString(luxon.DateTime.DATETIME_SHORT);
    
    carritoProductos.forEach(producto=>{
        //console.log(producto)
        productoElejido = productos.find(item => item.id === producto.id)
        productoElejido.stock -= producto.cantidad;
        //console.log(productoElejido)   
    })

    localStorage.setItem("array-productos", JSON.stringify(productos))

    //VACIO CARRITO
   // vaciarCarrito()
    
    //MUESTRO MENSAJE DE COMPRA
    // contenedorCarritoVacio.classList.add("disabled");
    // contenedorCarritoProductos.classList.add("disabled");
    // contenedorCarritoAcciones.classList.add("disabled");
    // contenedorCarritoComprado.classList.remove("disabled");

    



}

let comprasHistory=[];

class CompraHistory{
    constructor(carrito,fecha,total,cotizacion){
        this.id = comprasHistory.length +1
        this.carrito = carrito
        this.fecha = fecha
        this.total = total
        this.total = dolarActive
        this.cotizacion = cotizacion
        this.estado = "pendiente"
    }
}

