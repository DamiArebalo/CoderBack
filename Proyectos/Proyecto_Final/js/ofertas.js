//------------------RECUPERANDO ELEMENTOS----------------
//Chequeo SI estoy recuperando array-productos ene ste archivo,
console.log(productosenLS)

//si hay productos cargados
if(productosenLS){

    //NUESTRO ARRAY GLOBAL = AL STORAGE 
    productos = productosenLS
}else{
    productosenLS = []
}

//CLON DE FUNCION ALAMCENAR ARRAY PARA USARLO EN ESTE ARCHIVO
function alamacenArray() {
    productosenLS = productos
    localStorage.setItem("array-productos", JSON.stringify(productosenLS));
}


//instancio barra de busqueda
let busqueda = document.querySelector("#busqueda")

let textoBusqueda
let agregarOferta = document.querySelectorAll(".agregar-oferta")

//Puesto de control
//console.log(busqueda)

//instancio contenedor de ofertas
const contentOffer = document.querySelector("#productosDiv")


//-----------------------------FUNCIONES PRINCIPALES------------------------------------------
//funcion para agregar ofertas al DOM
function ofertasDOM(filtro){
    //reinicia el contenido
    contentOffer.innerHTML=" "

    //recorre el array aprametro //productos
    filtro.forEach((producto) =>{
        //crea una tarjeta por cada producto
        let productCard = crearTarjetaOferta(producto)
        //Y la agrega al DOM
        productContainer.appendChild(productCard);
    })
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

//FUNCION PARA ACTUALIZAR ARRAY OFERTAS
function checkOffer (){
    actualizarOfertasLS() 
    return (productos.some((producto) => producto.oferta > 0)) 
     
}


//FUNCION PARA LLAMAR A UNA CONFIRMACION DE TOASTIFY
function checkToastify (mensaje){
    Toastify({
        text: `✅ ${mensaje}`,
        className: "info",
        duration: 3000,
        close: true,
        position: "left", 
        style: {
          background: "linear-gradient(to left, #34c765, #054d33)",
        //   
        }
      }).showToast();
}

function errorToastify (mensaje){
    Toastify({
        text: `💢 ${mensaje} 💢`,
        className: "info",
        duration: 3000,
        close: true,
        position: "left", 
        style: {
          background: "linear-gradient(to left, #961515e4, #ff233c)", 
        //   
        }
      }).showToast();
}

//FUNCION ACTUALIZAR LS
function actualizarOfertasLS(){
    if(!ofertasCreadasLS){
        productos.forEach(producto=>{
            producto.oferta = 0;
            producto.descuento = 0;
        })
    }
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
   // console.log(agregarOferta) 

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
            //console.log(productIndex)

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
                    alamacenArray()

                    //creo un array con las ofertas hechas
                    ofertasCreadas= productos.filter(producto =>producto.oferta > 0)

                    checkToastify(`Oferta Nueva para ${productos[productIndex].nombre.toUpperCase()}`)

                    //puesto de control
                    //console.log(ofertasCreadas)

                    //Guardo en el storage las ofertas creadas
                    localStorage.setItem("ofertas", JSON.stringify(ofertasCreadas));

                    //Agrego al dom las ofertas creadas
                    agregarOfertasDOM(ofertasCreadas)

                    //Actualiza el DOM por cada evento si hay algun producto mas con desceunto
                    actualizarOfertasLS()
                    productosenLS =productos
                    agregarProductoAlDOM(productos)
                    

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
            alamacenArray()
        
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

 









