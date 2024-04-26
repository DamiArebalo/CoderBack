// #region RECURSOS
// DECLARACION DE VARIABLES DE FORMULARIO
let formuProducto = document.querySelectorAll(".dato")
//puesto de control
// console.log(formuProducto)

//CLASE - PLANTILLA DE PRODUCTOS
class Producto{
    
    
    constructor(precioLista,descripCorta,descripLarga,nombre,imgProd,stockInicial, categoria){
        
        this.id = productos.length + 1
       
        this.precioLista = precioLista;
        this.descripCorta = descripCorta;
        this.descripLarga = descripLarga;
        this.nombre = nombre;
        this.oferta = 0;
        this.img = imgProd;
        this.stock = stockInicial;
        this.categoria =categoria
        this.descuento = 0
    }



}

//declaracion de elementos necesarios
const productContainer = document.querySelector('.contenedor-productos');
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let agregarCarrito = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const preview = document.querySelector("#preview-img")
let rutaimg
let inputImg = document.getElementById('productImg'); //selector de imagen


// Generacion del Array Global
let productosEnCarrito =[];
let productos = [];
let ofertasCreadas = [];

//recupero de LOCALSTORAGE
let productosenLS = JSON.parse(localStorage.getItem("array-productos"))
let ofertasCreadasLS = JSON.parse(localStorage.getItem("ofertas"))
let CarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"))

//productosCheck()
// console.log("Ls: ",productosenLS)
// console.log("Array ",productos)
// console.log("ofertasLS ", ofertasCreadasLS)


//#region FUNCIONES

//si hay algo el array global es igual al de local storage
function productosCheck(){
    if(productosenLS){
     productos = productosenLS

    }else{
    productosenLS = []
    }
    //console.log(productos)
}

function carritoCheck(){
    if(CarritoLS){
        productosEnCarrito = CarritoLS
    }else{
        productosEnCarrito = []
    }
}

function offerChek(){
    if(ofertasCreadasLS){
        ofertasCreadas = ofertasCreadasLS
    }{
        ofertasCreadas = []
    }
}

//puesto de control
//console.log(ofertasCreadasLS)

//CLON FUNCION CERRAR POPUP
function cerrarPopupProductos() {
    document.getElementById("modalBackgroundProducts").style.display = "none";
    document.getElementById("productPopup").style.display = "none";
}

//Funcion para Validar que el array tenga almenos un elemento ingresado
function arrayVacio(){
    let aux = productos.length; //Cantidad de elementos

    if(aux<=0){
        //console.error("La tabla de productos esta vacia.\nIngrese Productos para trabajar sobre ellos")
        return false;
    }else{
        return true;
    }

}//Fin de la validacion de Array

//Funcion global para mostrar imagen en formulario
function mostrarImagen (ruta){
    preview.innerHTML =" "
    let imagenCode = document.createElement("img")
    imagenCode.src=ruta
    preview.append(imagenCode)
}

//FUNCION PARA VALIDAR LA ENTRADA DE INFO
function validarProductos(precioLista,descripCorta,descripLarga,nombre,stock){
    //Inicializacion de componentes

    let parsedPrice = parseFloat(precioLista);
    let parsedStock = parseInt(stock)
    


    // Validación para productShortDescription (descripCorta)
    const valShortDescription = descripCorta =>{
        if (descripCorta.length > 30) {
           // console.error("Error: productShortDescription no debe exceder los 30 caracteres.");
            return false;
        }else{
            return true;
        }
    }

    // Validación para productShortDescription (descripCorta)
    const valLongDescription = descripLarga =>{
        if (descripCorta.length > 70) {
           // console.error("Error: productLongDescription no debe exceder los 70 caracteres.");
            return false;
        }else{
            return true;
        }
    }

    // Validación para productPrice (precio)
    const valPrecio = parsedPrice =>{

        if (isNaN(parsedPrice) || parsedPrice < 0) {
            //console.error("Error: productPrice debe ser un valor numérico no negativo.");
            return false;
        }else{
            return true;
        }
    }



    // Validación para STOCK
    const valStock = parsedStock =>{

        if (parsedStock < 0) {
            //console.error("Error: ID no debe ser un número negativo.");
            return false;
        }else{
            return true;
        }
    }

    //validacion de nombre
    const valNombre = (nombre) => {
        let nombreExists = productos.some(producto => nombre === producto.nombre);
        // console.log(nombreExists)
        if (nombreExists) {
            return false;
        } else {
            return true;
        }
    }

    //Puesto DE CONTROL
    //console.log("stock: "+valStock(stock)+"\nNombre: "+valNombre(nombre)+"\ncorta: "+
    //            valShortDescription(descripCorta)+"\nlarga: "+valLongDescription(descripLarga)+
    //            "\n precio: "+valPrecio(parsedPrice));


    //VALIDACION GENERAL
    if(valStock(stock)&& valShortDescription(descripCorta)&& valLongDescription(descripLarga)&& valPrecio(parsedPrice)&&valNombre(nombre)){
        return true
    }else{
        return false
    }



}

//Funcion Global para Agregar Productos
function agregarProductos(){
    //Puesto de control
    //console.log("inicio agregarProducto()");

    //DECLARACION DE ELEMENTOS SACADOS DEL FORMULARIO
    let imgProd = rutaimg;
    let nombre1= formuProducto[1].value;
    let descripCorta1= formuProducto[2].value;
    let descripLarga1 = formuProducto[3].value;
    let precioLista = formuProducto[4].value;
    let stock = formuProducto[5].value;
    let categoria = formuProducto[6].value;
    
   
    //Ingresar solo si son datos validos
    if(validarProductos(precioLista,descripCorta1,descripLarga1,nombre1,imgProd,stock)){

        productosCheck()
        const producto = new Producto(precioLista,descripCorta1,descripLarga1,nombre1,imgProd,stock,categoria)

        productos.push(producto)
        agregarProductoAlDOM(productos);
        cerrarPopupProductos()

        //console.log("✨PRODUCTO AGREGADO CORRECTAMENTE✨");
       
    }else{
        //console.error("❌Error en la carga de Productos❌ \nIntente denuevo mas tarde ");
    }



}//Fin del Agregado de productos

//Funcion para saber si el precio actual es con oferta o es el precio de lista
function getPrecioActual(producto){
    if(producto.oferta>0){
        return(producto.oferta)
    }else{
        return(producto.precioLista)
    }

}

//----CARD DE PRODUCTOS -----
// Función para crear una tarjeta de producto
function crearTarjetaProducto(producto) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <img  src="${producto.img}" alt="${producto.nombre}">
        
            <h4 class="product-name">${producto.nombre}</h4>
            <p class="product-description">${producto.descripCorta}</p>
            <p class="product-price">$${getPrecioActual(producto)}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        
    `;

    return productCard;
}

// Agregar las tarjetas de productos al DOM
function agregarProductoAlDOM(productosElegidos) {
    
    productContainer.innerHTML=" "

    productosElegidos.forEach((producto) =>{
        let productCard = crearTarjetaProducto(producto)
        productContainer.appendChild(productCard);
    })

    actualizaragregarCarrito();
}

//funcion para guardar el array productos en el LocalStorage
function alamacenArray() {
    productosenLS = productos
    localStorage.setItem("array-productos", JSON.stringify(productosenLS));
}


//#region FORMUALRIOS
//-------------------EVENTOS DE FORMULARIO-------------

const agregarProd = document.getElementById("agregarProd"); //BOTON DE FORMULARIO PRODUCTOS

//PROBLEMATICA: llegar a la ruta del usuario de la imagen
//Evento DE INGRESO DE IMAGENES
inputImg.onchange =  (event) => {  

    //Elemento elegido
    const selectedFile = event.target.files[0];//

    //Si realmente se ingreso una imagen vaida
    if(selectedFile){
        //Leo el archivo
        let reader = new FileReader();

        //Conversion de ruta - solucion al error ../fakepath/
        reader.readAsDataURL(selectedFile) 

        //--cuando cargue la imagen
        reader.onload = function(e){ 
            //Guardar ruta en una variable gobal
            rutaimg = e.target.result
            //puesto de control
            //console.log(preview)
            //console.log(e.target.result)
            mostrarImagen(e.target.result) 
        }

    }else{
        console.warn("no se selecciono ninguna imagen")
    } 
}

//--AGREGAR PRODUCTOS AL ARRAY y LOCALSTORAGE---
agregarProd.onclick = () =>{
    agregarProductos()
    //console.table(productos);
    alamacenArray()
    //TOASTYFY 
    Toastify({
        text: "PRODUCTO AGREGADO",
        className: "info",
        duration: 3000,
        close: true,
        position: "center", 
        style: {
          background: "linear-gradient(to left, #34c765, #054d33)",
        //   
        }
      }).showToast();
    
}

//EVENTO POR CADA CLICK EN CAMBIO DE CATEGORIA
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        //RECORRO TODO LOS BOTONES Y LES SACO LA CLASE QUE MUESTRA ACTIVO
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
         

        //AL QUE **SI** ESTOY CLICKEANDO LO DEJA ACTIVO
        e.currentTarget.classList.add("active");
       //console.log(e.currentTarget.innerText)
    
        //SI EL ID DEL BOTON QUE ESTOY CLICKEANDO ES DISTINTO A TODOS.. 
        if (e.currentTarget.id!= "todos") {

            // CAMBIO EL TITULO DE LA BUSQUEDA
            tituloPrincipal.innerText = e.currentTarget.innerText ;

            //GUARDO EL ID DEL PRODUCTO === ID DEL BOTON
            const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id);

            //MUESTRO LOS PRODUCTOS DE ESA CATEGORIA
            agregarProductoAlDOM(productosBoton);

        } else {
            //SI ES TODOS MUESTRA TODOS LOS PRODUCTOS
            tituloPrincipal.innerText = "Todos los productos";
            agregarProductoAlDOM(productos);
        }

    })
});


//#region CARRITO
//----------------------CARRITO---------------

function agregarCarritoOferta() {
    //actualizo contenido
    let agregarCarritoOfertas = document.querySelectorAll(".producto-agregar-offer");

    console.log(agregarCarritoOfertas)
    //recorro todo los botones de las cards y al que le haga clik lo agrega al carrito
    agregarCarritoOfertas.forEach(boton => {
        boton.addEventListener("click",agregarAlCarrito);
    });
}

//BOTON PARA AGREGAR AL CARRITO
function actualizaragregarCarrito() {
    //actualizo contenido
    agregarCarrito = document.querySelectorAll(".producto-agregar");

    //recorro todo los botones de las cards y al que le haga clik lo agrega al carrito
    agregarCarrito.forEach(boton => {
        boton.addEventListener("click",agregarAlCarrito);
    });
}


//FUNCION DE BOTON AGREGAR AL CARRITOO
function agregarAlCarrito(e) {
    //TOMO EL BOTON CLICKEADO
    const idBoton = e.currentTarget.id;
    let parseID = Number(idBoton)

    //BUSCO EL OBJETO PRODUCTO QUE SE SELECCIONO
    let productoAgregado = productos.find(producto => producto.id === parseID);

    carritoCheck()

    
    //SI ESTA EN CARRITO SUMO 1 A LA CANTIDAD 
    if(productosEnCarrito.some(producto => producto.id === parseID)) {
        
        //BUSCO LA POSICION DEL PRODUCTO 
        const index = productosEnCarrito.findIndex(producto => producto.id === parseID);       
        //console.log(productosEnCarrito)
        
        //SUMO CANTIDAD
        productosEnCarrito[index].cantidad++; 

        Toastify({
            text: "✅Agregado al Carrito",
            className: "info",
            duration: 3000,
            close: true,
            position: "center", 
            style: {
              background: "linear-gradient(to left, #34c765, #054d33)",
            //   
            }
          }).showToast();
        
    }else{  
       //ARRANCA EN UNO
       productoAgregado.cantidad = 1;
        //PUSHEO A CARRITO
        //carritoCheck()
        productosEnCarrito.push(productoAgregado);

        Toastify({
            text: "✅Agregado al Carrito",
            className: "info",
            duration: 3000,
            close: true,
            position: "center", 
            style: {
              background: "linear-gradient(to left, #34c765, #054d33)",
            //   
            }
          }).showToast();
    }

    actualizarNumerito();
    console.log(productosEnCarrito)
    //GUARDO EN LOCALSTORAGE EL CARRITO

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

let numeritoActual


//FUNCION PARA ACTUALIZAR EL PREVIEW DEL CARRITO
 function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
    numeritoActual = nuevoNumerito
    //console.log(numeritoActual)
}


//#region OFERTAS 
//------------------SECCION OFERTAS-------------
const ofertas = document.querySelector("#ofertas-DOM")




//FUNCION PARA ACTUALIZAR ARRAY OFERTAS
function checkOffer (){
    return (productos.some((producto) => producto.oferta > 0)) 
     
}

function crearTarjetaOferta(producto) {
    const offerCard = document.createElement('div');
    offerCard.classList.add('product-card');

    offerCard.innerHTML = `
        <img class="img-offer" src="${producto.img}" alt="${producto.nombre}">
        <h4 class="product-name">${producto.nombre}</h4>
        <p class="product-description">${producto.descripCorta}</p>
        <div class="precio-oferta">
            <p class="offer-price">$${producto.oferta}</p>
            <p class="descuento">%${producto.descuento}</p>
        </div>
        <button class="producto-agregar-offer" id="${producto.id}">Agregar</button>
    
    `;

    return offerCard;
}

function agregarOfertasDOM (ofertasNuevas){
    ofertas.innerHTML = " "
    ofertasCreadas = Array.from(ofertasCreadas)

    ofertasNuevas.forEach((producto) =>{
        let productCard = crearTarjetaOferta(producto)
        ofertas.appendChild(productCard);
    }) 

    agregarCarritoOferta()
}

//#region RELOAD
//-------------EVENTO DE RECARGA DE PAGINA ------------------

document.addEventListener("DOMContentLoaded", ()=>{

    
    
    if(CarritoLS!=null && CarritoLS.length!=0){
        numeritoActual = CarritoLS.reduce((acc, producto) => acc + producto.cantidad, 0);
    }
    
    
    //Cambia numerito
    if(numeritoActual< 0 || numeritoActual==undefined){
        numerito.innerText = 0;
    }else{
        numerito.innerText = numeritoActual;
    }

    productos = productosenLS
    
    //AGREGA PRODUCTOS Y OFERTAS AL DOM
    agregarProductoAlDOM(productos)
    offerChek()
    productosCheck()
    agregarOfertasDOM(ofertasCreadasLS)
    
})


//#region DELETE
//-----------------------------POPUP DE ELIMINAR-----------------
const busquedaEliminar = document.querySelector("#busquedaEliminar")
const contentELiminar = document.querySelector("#productosEliminar")

//PUESTO DE CONTROL
// console.log(busquedaEliminar)
// console.log(contentELiminar)

//FUNCION QUE CREAD LAS CARDS DE LA BUSQUEDA
function crearTarjetaEliminar(producto){
    //crea un div
    let eliminarCard = document.createElement('div');
    //le pone clase
    eliminarCard.classList.add('offer-card');

    //crea tarjeta con HTML y variables de cada producto ofertado
    eliminarCard= `
        <div class="offer-card>
            <h4 class="name-offer">${producto.nombre}</h4>
            <button class="agregar-oferta" id="${producto.id}">Eliminar</button>
        </div>
    `

    //Devuelve la taarjeta
    return eliminarCard;

}

// Función para filtrar productos según la búsqueda
function filtrarProductosEliminar(textobusqueda) {
    //crea un array con los productos que contienen las letras buscadas  -->> mejorar con letras ordenadas
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textobusqueda)
    );
    //puesto de control
        // console.log(productosFiltrados)
        // console.log(contentOffer)

    //dentro del contenedor mapea el array creado y devuelve otro con cada tarjeta del las ofertas
    contentELiminar.innerHTML=productosFiltrados.map(producto =>crearTarjetaEliminar(producto))
    
    //actualizo un array con todas las tarjetas
    cardsOfertas = document.querySelectorAll(".offer-card")
    
}

//EVENTO CADA QUE SE SUELTA UNA LETRA A BUSCAR
busquedaEliminar.addEventListener("keyup",(e)=>{
    
    //instancio conjunto de letras
    textoBusqueda = e.target.value.toLowerCase()

    //filtro por cada producto en array
    filtrarProductosEliminar(textoBusqueda)

    //lleno mi array con cada boton de agregar-oferta
    eliminarbotones = document.querySelectorAll(".agregar-oferta")
    
    //puesto de control 
    //console.log(eliminarbotones) 

    //recorro todos los botones
    eliminarbotones.forEach(boton =>{
        //por cada boton clickeado
        boton.onclick = (e) =>{
            //rescato su ID
            const botonId = e.currentTarget.id
            //console.log(botonId)
            
            //Rescato el producto dentro del ARRAY GLOBAL CON EL MISMO ID
            const productoSeleccion = productos.find(producto => producto.id == botonId)
           // console.log(productoSeleccion)
            //Rescato el INDEX del PRODUCTO en array global con el MISMO ID O NOMBRE
            let productIndex = productos.findIndex(producto => producto.nombre == productoSeleccion.nombre)
            let checkCarrito = CarritoLS.some((producto) => producto.id == productoSeleccion.id)
            
            //puestod de control
            //console.log(productos[productIndex])
            //console.log(productIndex)

            //Elimino el producto elegido
            if(checkCarrito){
                let  indexCarrito = CarritoLS.findIndex(producto => producto.id == botonId);
    
                //puesto de control
                // console.log(CarritoLS)
                // console.log(indexCarrito)
                
                //Elimino el producto elegido
                CarritoLS.splice(indexCarrito, 1);
                localStorage.setItem("productos-en-carrito", JSON.stringify(CarritoLS));

            }
            productos.splice(productIndex, 1);

            //vuelvo a cargar al DOM 
            agregarProductoAlDOM(productos);

            //actualizo el LS
            alamacenArray();
            //puesto de control
            // console.log(productos)
            // console.log(productosenLS)
        }

    })
})//FIN ALGORITMO

