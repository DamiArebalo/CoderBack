// Generacion del Array Global

console.log(productosenLS)

if(productosenLS){
    productos = productosenLS
}else{
    productosenLS = []
}

let busqueda = document.querySelector("#busqueda")

const contentOffer = document.querySelector("#productosDiv")
console.log(busqueda)

function ofertasDOM(filtro){
    contentOffer.innerHTML=" "

    filtro.forEach((producto) =>{
        let productCard = crearTarjetaOferta(producto)
        productContainer.appendChild(productCard);
    })

}

function crearTarjetaSearch(producto) {
    let offerCard = document.createElement('div');
    offerCard.classList.add('offer-card');
 
    offerCard= `
        <div class="offer-card>
            
            <h4 class="name-offer">${producto.nombre}</h4>
            <input type="number" class="desc-offer" id="${producto.id}" placeholder="Agrega Porcentaje">
            <button class="agregar-oferta" id="${producto.id}">Agregar</button>
        </div>
    `

    return offerCard;
}

// Función para filtrar productos según la búsqueda
function filtrarProductos(textobusqueda) {
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textobusqueda)
    );
    
    contentOffer.innerHTML=productosFiltrados.map(producto =>crearTarjetaSearch(producto))
    cardsOfertas = document.querySelectorAll(".offer-card")
    
}
let textoBusqueda
let agregarOferta = document.querySelectorAll(".agregar-oferta")


busqueda.addEventListener("keyup",(e)=>{
    agregarOferta=[]
    textoBusqueda = e.target.value.toLowerCase()
    filtrarProductos(textoBusqueda)
    agregarOferta = document.querySelectorAll(".agregar-oferta")
    let cardsOfertas = document.querySelectorAll(".desc-offer")
    
    console.log(agregarOferta) //puesto de control 

    agregarOferta.forEach(boton =>{
        boton.onclick = (e) =>{
            const botonId = e.currentTarget.id

            const productoSeleccion = productos.find(producto => producto.id == botonId)
            let productIndex = productos.findIndex(producto => producto.id == productoSeleccion.id)
            console.log(productIndex)
            let agregarOfertaArray = Array.from(agregarOferta);
            let indexOffer = agregarOfertaArray.findIndex(card => card.id === botonId);
            let descuento = cardsOfertas[indexOffer].value
            productos[productIndex].oferta = productoSeleccion.precioLista * ((100 - descuento) / 100)
            productos[productIndex].descuento = descuento
            productosenLS = productos

            ofertasCreadas= productos.filter(producto =>producto.oferta > 0)
            console.log(ofertasCreadas)
            agregarOfertasDOM(ofertasCreadas)
            if(checkOffer){
                agregarProductoAlDOM(productos)
            }

        }
    })
})

let descuentoAll = document.querySelector("#descuentoALL");
const btnAll = document.querySelector("#btnAll");

btnAll.onclick = ()=>{
    productos.forEach(producto =>{
     producto.oferta = producto.precioLista * ((100 - descuentoAll.value) / 100);
     producto.descuento = descuentoAll.value
    })

    productosenLS = productos
    ofertasCreadas= productos.filter(producto =>producto.oferta > 0)
 
    agregarOfertasDOM(ofertasCreadas)
    if(checkOffer){
        agregarProductoAlDOM(productos)
    }
 }

 function checkOffer (){
   return (productos.some((producto) => producto.oferta > 0)) 
        
 }












