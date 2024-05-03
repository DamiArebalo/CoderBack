// #region RECURSOS


//declaracion de elementos necesarios
const productContainer = document.querySelector('.contenedor-productos');
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");






//#region FUNCIONES

function actualizarOfertasCreadas (){
    let ofertas = productosenLS.filter(producto => producto.oferta > 0 )
    ofertasCreadasLS = ofertas
}

//si hay algo el array global es igual al de local storage
function productosCheck(){
    if(productosenLS){
     productos = productosenLS

    }else{
    productosenLS = []
    }
    //console.log(productos)
}



function offerChek(){
    if(ofertasCreadasLS){
        ofertasCreadas = ofertasCreadasLS
    }{
        ofertasCreadas = []
    }
}

function agregarCarritoOferta() {
    //actualizo contenido
    let agregarCarritoOfertas = document.querySelectorAll(".producto-agregar-offer");

    //console.log(agregarCarritoOfertas)
    //recorro todo los botones de las cards y al que le haga clik lo agrega al carrito
    agregarCarritoOfertas.forEach(boton => {
        boton.addEventListener("click",agregarAlCarrito);


    });
}

//BOTON PARA AGREGAR AL CARRITO
function actualizaragregarCarrito() {
    //actualizo contenido
   let  agregarCarrito = document.querySelectorAll(".producto-agregar");
    agregarCarrito.forEach(boton=>{
        boton.addEventListener("click",agregarAlCarrito)
    })

}
//puesto de control
//console.log(ofertasCreadasLS)



//Funcion para saber si el precio actual es con oferta o es el precio de lista
function getPrecioActual(producto){
    if(producto.oferta>0){
        return(producto.oferta.toFixed(2))
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

function crearTarjetaAgotado(producto) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <img  src="${producto.img}" alt="${producto.nombre}">
        
            <h4 class="product-name">${producto.nombre}</h4>
            <p class="product-description">${producto.descripCorta}</p>
            <p class="product-price">$${getPrecioActual(producto)}</p>
            <button disabled class="producto-agregar" id="agotado"> SIN STOCK </button>
        
    `;

    return productCard;
}

// Agregar las tarjetas de productos al DOM
function agregarProductoAlDOM(productosElegidos) {
   // console.log("agregar al dom: ",carritoLs)
    if(productContainer!=null){
        productContainer.innerHTML=" "

        productosElegidos.forEach((producto,) =>{
            let mismoProductoCarrito = carritoLs.find(carrito => carrito.id = producto.id)
            if(mismoProductoCarrito == undefined){
                if(producto.stock<=0){
                    let productoAgotado = crearTarjetaAgotado(producto)
                    productContainer.appendChild(productoAgotado)
        
                }else{
                    let productCard = crearTarjetaProducto(producto)
                    productContainer.appendChild(productCard);
                }
            }else{
                if(producto.stock<=0||mismoProductoCarrito.cantidad >= mismoProductoCarrito.stock){
                    let productoAgotado = crearTarjetaAgotado(producto)
                    productContainer.appendChild(productoAgotado)
        
                }else{
                    let productCard = crearTarjetaProducto(producto)
                    productContainer.appendChild(productCard);
                }
            }
            //console.log(carritoLs   
            actualizaragregarCarrito();
            agregarCarritoOferta();
            //console.log(agregarCarrito)
        })
        
        
    }
    

    
}




//#region FORMUALRIOS
//-------------------EVENTOS DE CATEGORIA-------------


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

function actualizarVistaProductos(){
    let idElementoActivo
    botonesCategorias.forEach(boton =>{
        if (boton.classList.contains('active')) {
            // Guardamos el ID en la variable global
            idElementoActivo = boton.id;
        }
        //console.log(idElementoActivo)
    })

    let productosBuscados = productos.filter(producto => producto.categoria == idElementoActivo);
    //console.log(productosBuscados)
    if(idElementoActivo=="todos"){
        agregarProductoAlDOM(productos)

    }else{
        agregarProductoAlDOM(productosBuscados)
    }
    ;
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
            <p class="offer-price">$${producto.oferta.toFixed(2)}</p>
            <p class="descuento">%${producto.descuento}</p>
        </div>
        <button class="producto-agregar-offer" id="${producto.id}">Agregar</button>
    
    `;

    return offerCard;
}

function crearTarjetaOfertaAgotado(producto) {
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
        <button disabled class="producto-agregar-offer" id="agotado"> Sin Stock </button>
    
    `;

    return offerCard;
}

function agregarOfertasDOM (ofertasNuevas){

    if(ofertas != null){
        ofertas.innerHTML = " "
        ofertasCreadas = Array.from(ofertasCreadas)
       
    
        ofertasNuevas.forEach((producto) =>{
            let mismoProductoCarrito = carritoLs.find(carrito => carrito.id = producto.id)
            
            if(mismoProductoCarrito == undefined){
                if(producto.stock<=0){
                
                    let ofertaAgotada = crearTarjetaOfertaAgotado(producto)
                    ofertas.appendChild(ofertaAgotada);
                }
                else{
        
                    let productCard = crearTarjetaOferta(producto)
                    ofertas.appendChild(productCard);
                }
            }else{
                if(producto.stock<=0||mismoProductoCarrito.cantidad >= mismoProductoCarrito.stock){
                
                    let ofertaAgotada = crearTarjetaOfertaAgotado(producto)
                    ofertas.appendChild(ofertaAgotada);
                }
                else{
        
                    let productCard = crearTarjetaOferta(producto)
                    ofertas.appendChild(productCard);
                }
            }
        })
        agregarCarritoOferta()   
    }
    
}

//#region RELOAD
//-------------EVENTO DE RECARGA DE PAGINA ------------------

document.addEventListener("DOMContentLoaded", ()=>{
    
    //AGREGA PRODUCTOS Y OFERTAS AL DOM
   //console.log(carritoLs)

    if(carritoLs!=null && carritoLs.length!=0){
        //console.log(numeritoActual)
        numeritoActual = carritoLs.reduce((acc, producto) => acc + producto.cantidad, 0);
    }
    

    
    if(numerito != null){
        //Cambia numerito
        if(numeritoActual< 0 || numeritoActual==undefined){
            numerito.innerText = 0;
        }else{
            numerito.innerText = numeritoActual;
        }

    }
    actualizarOfertasCreadas()

    agregarProductoAlDOM(productosenLS)
    productosCheck()
    agregarOfertasDOM(ofertasCreadasLS)
    
})




