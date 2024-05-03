// DECLARACION DE VARIABLES DE FORMULARIO
let formuProducto = document.querySelectorAll(".dato");
let formuEditar = document.querySelectorAll(".dato-editar");

const numerito = document.querySelector("#numerito");
//puesto de control
//console.log(formuEditar)


//recupero de LOCALSTORAGE
let productosenLS = JSON.parse(localStorage.getItem("array-productos"))
let ofertasCreadasLS = JSON.parse(localStorage.getItem("ofertas"))
let carritoLs = JSON.parse(localStorage.getItem("productos-en-carrito"));

//productosCheck()
// console.log("Ls: ",productosenLS)
// console.log("Array ",productos)
// console.log("ofertasLS ", ofertasCreadasLS)

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

// Generacion del Array Global

let productos = [] ;
let ofertasCreadas = [];
let numeritoActual

function llamarProductos(){
    if(productosenLS == null || productosenLS == undefined){
        // 1. Cargar los datos desde el archivo "backend.json"
        fetch("backend.json")
        .then(response => response.json())
        .then(data => {
            // 2. Guardar los datos en la variable "seteo"
            const seteo = data;
      
    
            // 3. Actualizar el localStorage con la clave "array-productos"
            localStorage.setItem("array-productos", JSON.stringify(seteo));
      
            //console.log("Datos cargados y almacenados en 'seteo':", seteo);
            productos = seteo
        })
        .catch(error => {
        console.error("Error al cargar los datos:", error);
        });
    }

}



//CLON DE FUNCION ALAMCENAR ARRAY PARA USARLO EN ESTE ARCHIVO
function almacenArray() {
    productosenLS = productos
    localStorage.setItem("array-productos", JSON.stringify(productos));
}





const $productCards = document.getElementById('product-cards');
let $btneditar = document.querySelectorAll(".btn-editar");
const preview = document.querySelector("#preview-img")
let rutaimg
let inputImg = document.getElementById('productImg'); //selector de imagen
let $guardarCambios = document.querySelector("#guardarCambios")

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
function validarProductos(precioLista,descripCorta,descripLarga,stock){
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

    

    //Puesto DE CONTROL
    //console.log("stock: "+valStock(stock)+"\nNombre: "+valNombre(nombre)+"\ncorta: "+
    //            valShortDescription(descripCorta)+"\nlarga: "+valLongDescription(descripLarga)+
    //           "\n precio: "+valPrecio(parsedPrice));


    //VALIDACION GENERAL
    if(valStock(stock)&& valShortDescription(descripCorta)&& valLongDescription(descripLarga)&& valPrecio(parsedPrice)){
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
    if(validarProductos(precioLista,descripCorta1,descripLarga1,stock)){

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

//#region FORMU CREATE
const agregarProd = document.getElementById("agregarProd"); //BOTON DE FORMULARIO PRODUCTOS

//PROBLEMATICA: llegar a la ruta del usuario de la imagen
//Evento DE INGRESO DE IMAGENES
inputImg.onchange= (event) => {  

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
    almacenArray()
    //TOASTYFY 
    checkToastify("PRODUCTO AGREGADO")
    
}

function getPrecioActual(producto){
    if(producto.oferta>0){
        return(producto.oferta.toFixed(2))
    }else{
        return(producto.precioLista)
    }

}

let $previewEditar= document.querySelector("#editarPreview-img");
let $inputImgEditar= document.querySelector("#editarProductoImg")
let rutaImgEditar



$inputImgEditar.onchange= (event) => {  

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
            rutaImgEditar = e.target.result
            //puesto de control
            //console.log(preview)
            //console.log(e.target.result)
            mostrarImagenEditar(e.target.result) 
        }

    }else{
        console.warn("no se selecciono ninguna imagen")
    } 
}


//console.log(productosenLS)
async function crearTarjetasEditar (){
    $productCards.innerHTML="";
    await productosenLS.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
    
        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>Stock: ${producto.stock}</p>
            <p>Precio: ${getPrecioActual(producto)}</p>
            <button class="btn-editar" id="${producto.id}">Editar</button>
        `;
    
        $productCards.appendChild(card);
    });

    actualizarBtnEditar()
    
}


function actualizarBtnEditar(){
    $btneditar = document.querySelectorAll(".btn-editar");

    $btneditar.forEach(boton =>{
        boton.addEventListener("click",(e)=>{
            let productoClickeado = productosenLS.find(producto => producto.id == e.currentTarget.id)
            let indexClickeado = productosenLS.findIndex(producto => producto.id ==productoClickeado.id)
            // console.log(productosenLS)
            // console.log(e.currentTarget.id)
            // console.log(productoClickeado)
            // console.log(indexClickeado)
            
            setearPopUpEditar(productoClickeado)
            $guardarCambios.onclick = (e) =>{
                editarProducto(productoClickeado)

            }


        })
        
    })
}

function cerrarPopUpEditar(){
    document.getElementById('editarBackground').style.display = 'none';
    document.getElementById('editarPopUp').style.display = 'none';
}

//Funcion global para mostrar imagen en formulario
function mostrarImagenEditar(ruta){
    $previewEditar.innerHTML =" "
    let imagenCode = document.createElement("img")
    imagenCode.src=ruta
    $previewEditar.append(imagenCode)
}

function editarProducto(producto){
    
    let imgProd
    if(formuEditar[0].value.includes("fakepath")){
        imgProd = rutaImgEditar;
    }else{
        imgProd = producto.img
    }

    let nombre1= formuEditar[1].value;
    let descripCorta1= formuEditar[2].value;
    let descripLarga1 = formuEditar[3].value;
    let precioLista = formuEditar[4].value;
    let stock = formuEditar[5].value;
    let categoria = formuEditar[6].value;

    //Ingresar solo si son datos validos
    if(validarProductos(precioLista,descripCorta1,descripLarga1,stock)){

        productosCheck()
        producto.img = imgProd
        producto.nombre= nombre1
        producto.descripCorta= descripCorta1
        producto.descripLarga=descripLarga1
        producto.precioLista=precioLista
        producto.stock= stock
        producto.categoria = categoria

        
        localStorage.setItem("array-productos", JSON.stringify(productosenLS))

        crearTarjetasEditar()
        cerrarPopUpEditar()

        checkToastify(`${nombre1.toUpperCase()} Editado`)
        

        console.log("✨PRODUCTO cambiado CORRECTAMENTE✨");
       
    }else{
        errorToastify("Edicion Cancelada")
    }
    

}

function setearPopUpEditar(producto){
     // Muestra el formulario de edición
    document.getElementById('editarBackground').style.display = 'block';
    document.getElementById('editarPopUp').style.display = 'block';
    

     // Rellena los campos de entrada con los valores actuales del producto
     mostrarImagenEditar(producto.img)
     formuEditar[1].value = producto.nombre;
     formuEditar[2].value = producto.descripCorta;
     formuEditar[3].value = producto.descripLarga;
     formuEditar[4].value = producto.precioLista;
     formuEditar[5].value = producto.stock.toString();
     formuEditar[6].value = producto.categoria;
     
}


//console.log($btneditar)


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

           //console.log(productoSeleccion)
            //Rescato el INDEX del PRODUCTO en array global con el MISMO ID O NOMBRE
            let productIndex = productos.findIndex(producto => producto.nombre == productoSeleccion.nombre)
            let checkCarrito = carritoLs.some((producto) => producto.id == productoSeleccion.id)
            
            //puestod de control
            //console.log(productos[productIndex])
            //console.log(productIndex)

            //Elimino el producto elegido
            if(checkCarrito){
                let  indexCarrito = carritoLs.findIndex(producto => producto.id == botonId);
    
                //puesto de control
                // console.log(CarritoLS)
                // console.log(indexCarrito)
                
                //Elimino el producto elegido
                carritoLs.splice(indexCarrito, 1);
                localStorage.setItem("productos-en-carrito", JSON.stringify(carritoLs));

            }
            productos.splice(productIndex, 1);

            //vuelvo a cargar al DOM 
            agregarProductoAlDOM(productos);

            //actualizo el LS
            almacenArray();
            //puesto de control
            // console.log(productos)
            // console.log(productosenLS)
        }

    })
})//FIN ALGORITMO


//#region OFERTAS

//FUNCION ACTUALIZAR LS
function actualizarOfertasLS(){
    if(!ofertasCreadasLS){
        productos.forEach(producto=>{
            producto.oferta = 0;
            producto.descuento = 0;
        })
    }
}
//Funcion para crear Card de OFerta
function crearTarjetaSearch(producto) {
    //crea un div
    let offerCard = document.createElement('div');
    //le pone clase
    offerCard.classList.add('offer-card');

    //crea tarjeta con HTML y variables de cada producto ofertado
    offerCard= `
        <div class="offer-card>
            <h4 class="name-offer">${producto.nombre}</h4>
            <input type="number" class="desc-offer" id="${producto.id}" placeholder="Agrega Porcentaje">
            <button class="agregar-oferta" id="${producto.id}">Agregar</button>
        </div>
    `

    //Devuelve la taarjeta
    return offerCard;
}

// Función para filtrar productos según la búsqueda
function filtrarProductos(textobusqueda) {
    //crea un array con los productos que contienen las letras buscadas  -->> mejorar con letras ordenadas
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textobusqueda)
    );
    //puesto de control
        // console.log(productosFiltrados)
        // console.log(contentOffer)

    //dentro del contenedor mapea el array creado y devuelve otro con cada tarjeta del las ofertas
    contentOffer.innerHTML=productosFiltrados.map(producto =>crearTarjetaSearch(producto))
    
    //actualizo un array con todas las tarjetas
    cardsOfertas = document.querySelectorAll(".offer-card")
    
}
//-----------------------------EVENTOS DE OFERTAS----------------------------------

//---------------ALGORITMO PARA BUSCAR PRODUCTOS Y AGREGARLE SU OFERTA-----------------

//EVENTO CADA QUE SE SUELTA UNA LETRA A BUSCAR
busqueda.addEventListener("keyup",(e)=>{
   
    //instancio mi variable como un array y no un NODELIST
    agregarOferta=[]

    //instancio conjunto de letras
    textoBusqueda = e.target.value.toLowerCase()
    
    filtrarProductos(textoBusqueda)
    
    //lleno mi array con cada boton de agregar-oferta
    agregarOferta = document.querySelectorAll(".agregar-oferta")

    //creo mi array con todos los inputs de las tarjetas mostradas
    let inputDescuento = document.querySelectorAll(".desc-offer")
    
    //puesto de control 
    //console.log(agregarOferta) 

    //recorro todos los botones
    agregarOferta.forEach(boton =>{
        //por cada boton clickeado
        boton.onclick = (e) =>{
            //rescato su ID
            const botonId = e.currentTarget.id
            //console.log(botonId)

            //Rescato el producto dentro del ARRAY GLOBAL CON EL MISMO ID
            const productoSeleccion = productos.find(producto => producto.id == botonId)
            
            //Rescato el INDEX del PRODUCTO en array global con el MISMO ID
            let productIndex = productos.findIndex(producto => producto.id == productoSeleccion.id)

            //puestod de control
            //.log(productIndex)

            //CONFIRMACION CON SWEET ALERT
            swal("CONFIRMA DESCUENTO A ESTE PRODUCTO?", {
                buttons: ["NO", "SI"], 
        
            }).then((buttons)=>{
                if(buttons){
                    
                    //convierto de NODELIST a ARRAY -- solucion a error 
                    let agregarOfertaArray = Array.from(agregarOferta);

                    //Rescato el index del boton que estoy clickeando
                    let indexOffer = agregarOfertaArray.findIndex(card => card.id === botonId);

                    //rescato el descuento del producto que estoy ofertando
                    let descuento = inputDescuento[indexOffer].value

                    //Al producto que estoy cambiando le agrego el precio de oferta
                    productos[productIndex].oferta = productoSeleccion.precioLista * ((100 - descuento) / 100)

                    //le agrego el porcentaje de descuento
                    productos[productIndex].descuento = descuento

                    //lo actualizo en el LS
                    almacenArray()

                    //creo un array con las ofertas hechas
                    ofertasCreadas= productos.filter(producto =>producto.oferta > 0)

                    checkToastify(`Oferta Nueva para ${productos[productIndex].nombre.toUpperCase()}`)

                    //puesto de control
                    //console.log(ofertasCreadas)


                    //Agrego al dom las ofertas creadas
                    agregarOfertasDOM(ofertasCreadas)

                    //Actualiza el DOM por cada evento si hay algun producto mas con desceunto
                    actualizarOfertasLS()
                    productosenLS =productos
                    

                    //Guardo en el storage las ofertas creadas
                    localStorage.setItem("ofertas", JSON.stringify(ofertasCreadas));
                    crearTarjetasEditar()

                    //puesto de control
                    // console.log(productos)
                    // console.log(productosenLS)

                }else{
                    errorToastify("Oferta Cancelada")
                }
                
            })
            
        }

    })
})//FIN ALGORITMO



//----------------ALGORIMO PARA PONER DESCUENTO A TODOS LOS PRODUCTOS--------------------
// Rescato el input Descuento
let descuentoAll = document.querySelector("#descuentoALL");
//rescato el boton de agregar descuento
const btnAll = document.querySelector("#btnAll");

//cuando se clickea el agregar productos
btnAll.onclick = ()=>{
    //advertencia  si confirma el descuento en TODOS LOS PRODUCTOS
    swal("SEGURO DESEA AGREGAR DESCUENTO A TODOS LOS PRODUCTOS?", {
        buttons: ["CANCELAR", true], 

    }).then((buttons)=>{
        if (buttons ){
            //recorre el array global 
            productos.forEach(producto =>{
                //por cada producto agrega oferta y descuento 
                producto.oferta = producto.precioLista * ((100 - descuentoAll.value) / 100);
                producto.descuento = descuentoAll.value
            })
    
            //actualizo
            almacenArray()
        
            //array de ofertas lo cambio a todos los productos
            ofertasCreadas= productos.filter(producto =>producto.oferta > 0)
        
            //guardo en LS las ofertas creadas
            localStorage.setItem("ofertas", JSON.stringify(ofertasCreadas));
        
            //Agrego al DOM LAS OFERTAS
            agregarOfertasDOM(ofertasCreadas)
        
            actualizarOfertasLS()
            agregarProductoAlDOM(productos)
        
            checkToastify("OFERTA CREADA EN TODOS LOS PRODUCTOS")
        }else{
            errorToastify("Ofertas Canceladas")
        }
    })
    
    
    

}//FIN ALGORITMO



document.addEventListener("DOMContentLoaded", ()=>{
    crearTarjetasEditar();
})

//#region CARRITO
//----------------------CARRITO---------------



//FUNCION PARA ACTUALIZAR EL PREVIEW DEL CARRITO
 function actualizarNumerito() {
    //console.log(carritoLs)
    carritoLs = carritoLs
    let nuevoNumerito = carritoLs.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
    numeritoActual = nuevoNumerito
    //console.log(numeritoActual)
}


//FUNCION DE BOTON AGREGAR AL CARRITO
function agregarAlCarrito(e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del evento de clic

    //TOMO EL BOTON CLICKEADO
    let idBoton = e.currentTarget.id;
    let parseID = Number(idBoton)
    //console.log(`ID del botón clickeado: ${parseID}`);
    
    //BUSCO EL OBJETO PRODUCTO QUE SE SELECCIONO
    let productoAgregado =productos.find(producto => producto.id === parseID);
    
    let productoSeteado =  JSON.stringify(productoAgregado)

    let productoParseado = JSON.parse(productoSeteado)

    //console.log(productoSeteado)

    //console.log(`¿El producto está en el carrito? ${carritoLs.some(producto => producto.id === parseID)}`);
    
    try {
        // SI ESTA EN CARRITO SUMO 1 A LA CANTIDAD
        if(carritoLs.some(producto => producto.id === parseID)) {
            // BUSCO LA POSICION DEL PRODUCTO
            const index = carritoLs.findIndex(producto => producto.id === parseID);
            let productoenCurso = carritoLs[index];

            if(productoenCurso.cantidad >= productoenCurso.stock){
                throw new Error('Cantidad Maxima Alcanzada') 
            }else{
                // SUMO CANTIDAD
                productoenCurso.cantidad++;
            }
        } else {  
            // ARRANCA EN UNO
            productoParseado.cantidad = 1;
            
            // PUSHEO A CARRITO
            carritoLs.push(productoParseado);
        }

        actualizarNumerito();
        //console.log("lo que se guarda",carritoLs);
        //GUARDO EN LOCALSTORAGE EL CARRITO
       // console.log("mis productos", productosenLS);
        localStorage.setItem("productos-en-carrito", JSON.stringify(carritoLs));
    
        Toastify({
            text: "✅Agregado al Carrito",
            className: "info",
            duration: 3000,
            close: true,
            position: "center", 
            style: {
                background: "linear-gradient(to left, #34c765, #054d33)",
            }
        }).showToast();
    } catch (error) {
        errorToastify(error)
    } finally {
        actualizarVistaProductos();
        actualizarOfertasCreadas();
        agregarOfertasDOM(ofertasCreadasLS);
        
    }
}



//#endregion





//#region HISTORIAL
let $contenedorHistoria = document.querySelector(".cards-historial")
let historialLs = JSON.parse(localStorage.getItem("compras-history"));
//console.log(historialLs)



function crearTarjetaHistorial(compra){
    //crea un div
    let historyCard = document.createElement('div');
    //le pone clase
    historyCard.classList.add('offer-card');

    //crea tarjeta con HTML y variables de cada compra ofertado
    historyCard = `
        <div class="history-card">
            <h3 class="name-offer">Info compra</h3>
            <h4class="name-offer">total: ${compra.total} </h4>
            <p class="fecha">${compra.fecha} </p>
            <p class="contacto">${compra.contacto.correo} </p>
            <select id="estado">
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
            </select>
            
        </div>
    `

    //Devuelve la taarjeta
    return historyCard;
}

function AgregarHistoryDOM(historial){
    $contenedorHistoria.innerHTML="";

    historial.forEach(compra =>{
        //crea un div
        let historyCard = document.createElement('div');
        //le pone clase
        historyCard.classList.add('card-historial');

         //crea tarjeta con HTML y variables de cada compra ofertado
        historyCard.innerHTML = `
            
                <h3 class="name-offer">Info compra</h3>
                <h4class="name-offer">total: ${compra.total} </h4>
                <p class="fecha">${compra.fecha} </p>
                <p class="contacto">${compra.contacto.correo} </p>
                <select id="estado">
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                    <option value="cancelado">Cancelado</option>
                </select>
            `    
          
        //console.log(historyCard)
        $contenedorHistoria.appendChild(historyCard)
        
    })

}


document.addEventListener("DOMContentLoaded", ()=>{

    llamarProductos()
    
    
    
   

    AgregarHistoryDOM(historialLs)
})

