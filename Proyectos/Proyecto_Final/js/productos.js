// DECLARACION DE VARIABLES DE FORMULARIO
let formuProducto = document.querySelectorAll(".dato")
   // console.log(formuProducto)

const productContainer = document.querySelector('.contenedor-productos');
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let agregarCarrito = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const preview = document.querySelector("#preview-img")

let productosEnCarrito = []

console.log(preview)


// Generacion del Array Global
let productos = [];
let ofertasCreadas = []

let productosenLS = JSON.parse(localStorage.getItem("array-productos"))
console.log(productosenLS)

if(productosenLS){
    productos = productosenLS
}else{
    productosenLS = []
}

document.addEventListener('DOMContentLoaded', function() {
    agregarProductoAlDOM(productos)
})


//FUNCION CERRAR POPUP
function cerrarPopupProductos() {
    document.getElementById("modalBackgroundProducts").style.display = "none";
    document.getElementById("productPopup").style.display = "none";
}

//Funcion para Validar que el array tenga almenos un elemento ingresado
function arrayVacio(){
    let aux = productos.length; //Cantidad de elementos

    if(aux<=0){
        console.error("La tabla de productos esta vacia.\nIngrese Productos para trabajar sobre ellos")
        return false;
    }else{
        return true;
    }

}//Fin de la validacion de Array


let rutaimg

let inputImg = document.getElementById('productImg'); //selector de imagen


//llegar a la ruta del usuario de la imagen
//Evento DE INGRESO DE IMAGENES
inputImg.onchange =  (event) => {  

    //Elemento elegido
    const selectedFile = event.target.files[0];//
    //Si realmente se ingreso una imagen vaida
    if(selectedFile){
        let reader = new FileReader();
        
        //Conversion de ruta - solucion al error ../fakepath/
        reader.readAsDataURL(selectedFile) 
        //--cuando cargue la imagen
        reader.onload = function(e){ 
            //Guardar ruta en una variable gobal
            rutaimg = e.target.result
            //console.log(e.target.result)
            mostrarImagen(e.target.result) 
        }

    }else{
        console.warn("no se selecciono ninguna imagen")
    }

   
}

function mostrarImagen (ruta){
    preview.innerHTML =" "
    let imagenCode = document.createElement("img")
    imagenCode.src=ruta
    preview.append(imagenCode)
}

//CLASE - PLANTILLA DE PRODUCTOS
class Producto{
    static id = 0
    
    constructor(precioLista,descripCorta,descripLarga,nombre,imgProd,stockInicial, categoria){
        this.id = Producto.id++
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

//FUNCION PARA VALIDAR LA ENTRADA DE INFO
function validarProductos(precioLista,descripCorta,descripLarga,nombre,stock){
    //Inicializacion de componentes

    let parsedPrice = parseFloat(precioLista);
    let parsedStock = parseInt(stock)
    


    // Validación para productShortDescription (descripCorta)
    const valShortDescription = descripCorta =>{
        if (descripCorta.length > 30) {
            console.error("Error: productShortDescription no debe exceder los 30 caracteres.");
            return false;
        }else{
            return true;
        }
    }

    // Validación para productShortDescription (descripCorta)
    const valLongDescription = descripLarga =>{
        if (descripCorta.length > 70) {
            console.error("Error: productLongDescription no debe exceder los 70 caracteres.");
            return false;
        }else{
            return true;
        }
    }

    // Validación para productPrice (precio)
    const valPrecio = parsedPrice =>{

        if (isNaN(parsedPrice) || parsedPrice < 0) {
            console.error("Error: productPrice debe ser un valor numérico no negativo.");
            return false;
        }else{
            return true;
        }
    }



    // Validación para STOCK
    const valStock = parsedStock =>{

        if (parsedStock < 0) {
            console.error("Error: ID no debe ser un número negativo.");
            return false;
        }else{
            return true;
        }
    }

    //validacion de nombre
    const valNombre = (nombre) => {
        let nombreExists = productos.some(producto => nombre === producto.nombre);
        console.log(nombreExists)
        if (nombreExists) {
            return false;
        } else {
            return true;
        }
    }

    //Puesto DE CONTROL
    console.log("stock: "+valStock(stock)+"\nNombre: "+valNombre(nombre)+"\ncorta: "+
                valShortDescription(descripCorta)+"\nlarga: "+valLongDescription(descripLarga)+
                "\n precio: "+valPrecio(parsedPrice));


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
    console.log("inicio agregarProducto()");

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

        const producto = new Producto(precioLista,descripCorta1,descripLarga1,nombre1,imgProd,stock,categoria)

        productos.push(producto)
        agregarProductoAlDOM(productos);
        cerrarPopupProductos()

        console.log("✨PRODUCTO AGREGADO CORRECTAMENTE✨");
       
    }else{
        console.error("❌Error en la carga de Productos❌ \nIntente denuevo mas tarde ");
    }



}//Fin del Agregado de productos


//EVENTOS Y CODIGO EN MARCHA
const agregarProd = document.getElementById("agregarProd"); //BOTON DE FORMULARIO PRODUCTOS

//--AGREGAR PRODUCTOS AL ARRAY y LOCALSTORAGE---
agregarProd.onclick = () =>{
    agregarProductos()
    console.table(productos);
    alamacenArray()
    
}
function getPrecioActual (producto){
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
let productosLS 
function alamacenArray() {

    productosLS = productos

    localStorage.setItem("array-productos", JSON.stringify(productosLS));
}

//EVENTO POR CADA CLICK EN CAMBIO DE CATEGORIA
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        //RECORRO TODO LOS BOTONES Y LES SACO LA CLASE QUE MUESTRA ACTIVO
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
         

        //AL QUE **SI** ESTOY CLICKEANDO LO DEJA ACTIVO
        e.currentTarget.classList.add("active");
       console.log(e.currentTarget.innerText)
    
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

 

//BOTON PARA AGREGAR AL CARRITO
function actualizaragregarCarrito() {
    //actualizo contenido
    agregarCarrito = document.querySelectorAll(".producto-agregar");

    //recorro todo los botones de las cards y al que le haga clik lo agrega al carrito
    agregarCarrito.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

//FUNCION DE BOTON AGREGAR AL CARRITOO
function agregarAlCarrito(e) {
    //TOMO EL BOTON CLICKEADO
    const idBoton = e.currentTarget.id;
    let parseID = Number(idBoton)
    //BUSCO EL OBJETO PRODUCTO QUE SE SELECCIONO

    let productoAgregado = productos.find(producto => producto.id === parseID);
    //SI ESTA EN CARRITO SUMO 1 A LA CANTIDAD 
    if(productosEnCarrito.some(producto => producto.id === parseID)) {
        //BUSCO LA POSICION DEL PRODUCTO 
        const index = productosEnCarrito.findIndex(producto => producto.id === parseID);
        console.log(index)
        console.log(productosEnCarrito)

        //SUMO CANTIDAD
        productosEnCarrito[index].cantidad++;
        
       
        
    }else{
        console.log(productosEnCarrito)
        //ARRANCA EN UNO
        productoAgregado.cantidad = 1;
        //PUSHEO A CARRITO
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    //GUARDO EN LOCALSTORAGE EL CARRITO
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//FUNCION PARA ACTUALIZAR EL PREVIEW DEL CARRITO
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

const ofertas = document.querySelector("#ofertas-DOM")



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
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
    
    `;

    return offerCard;
}
function agregarOfertasDOM (ofertasNuevas){
    ofertas.innerHTML = " "

    ofertasNuevas.forEach((producto) =>{
        let productCard = crearTarjetaOferta(producto)
        ofertas.appendChild(productCard);
    })

    
}


