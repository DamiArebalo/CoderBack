//------------------RECUPERANDO ELEMENTOS----------------
//Chequeo SI estoy recuperando array-productos ene ste archivo,
// let productosenLS = JSON.parse(localStorage.getItem("array-productos"))
//console.log(productosenLS)

//si hay productos cargados
if(productosenLS){

    //NUESTRO ARRAY GLOBAL = AL STORAGE 
    productos = productosenLS
}else{
    productosenLS = []
}




//instancio barra de busqueda
let busqueda = document.querySelector("#busqueda")
//console.log(busqueda)
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







 









