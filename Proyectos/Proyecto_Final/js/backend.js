//DECLARACION DE ELEMENTOS DE ABRIR Y CERRAR POPUP   
const btnProd = document.getElementById("abrirProductos"); // BOTON PRODUCTOS
const cerrarProd = document.getElementById("cerrarProd"); // CERRAR PRODUCTOS
const btnCarrito = document.getElementById("btnCarrito"); // BOTON CARRITO
const btnLAdmin = document.getElementById("btnAdmin"); // BOTON ADMIN
const btnUser = document.getElementById("btnUser")// BOTON USER
const btnOferta = document.querySelector("#btnOferta")//BOTON OFERTA
const cerrarOffer = document.querySelector("#cerrarOffer")//Cerrar Oferta
let btnEliminar = document.querySelector("#btnEliminar")//boton eliminar
const cerrarEliminar = document.querySelector("#cerrarEliminar")//Cerrar eliminar

console.log(btnEliminar)

function abrirPopupProductos() {
    document.getElementById("modalBackgroundProducts").style.display = "block";
    document.getElementById("productPopup").style.display = "block";
}


//funcion de cerrado del PopUp
function cerrarPopupProductos() {
    document.getElementById("modalBackgroundProducts").style.display = "none";
    document.getElementById("productPopup").style.display = "none";
}

function abrirPopupOferta() {
    document.getElementById("backOffer").style.display = "block";
   let popupoffer= document.getElementById("accionOferta")

   popupoffer.style.display = "block";
}

function cerrarPopupOferta(){
    document.getElementById("backOffer").style.display = "none";
    document.getElementById("accionOferta").style.display = "none";
}

function abrirPopupEliminar() {
    document.getElementById("backEliminar").style.display = "block";
    document.getElementById("accionEliminar").style.display = "block";
}

function cerrarPopupEliminar(){ 
    document.getElementById("backEliminar").style.display = "none";
    document.getElementById("accionEliminar").style.display = "none";

}


btnEliminar.addEventListener("click", ()=>{abrirPopupEliminar()})

cerrarEliminar.onclick = () => {cerrarPopupEliminar()}

const elementosAdmin = document.querySelectorAll(".admin")
function modoAdmin(){
    elementosAdmin.forEach((elem =>{
        elem.classList.remove("admin")
    }))

}

function modoUser(){
    elementosAdmin.forEach((elem =>{
        elem.classList.add("admin")
    }))

}


btnProd.onclick = () => abrirPopupProductos();
cerrarProd.onclick = () => cerrarPopupProductos();
btnAdmin.onclick = () => {modoAdmin();btnAdmin.classList.add("admin")};
btnUser.onclick =()=>{modoUser();btnAdmin.classList.remove("admin")}
btnCarrito.onclick = () => console.log("click carrito")

cerrarOffer.onclick = () => cerrarPopupOferta()

btnOferta.addEventListener("click", (e)=>{
    console.log(e.currentTarget)
    abrirPopupOferta()
})




document.getElementById('offerAll').addEventListener('click', function() {
    document.getElementById('descuentoAllDiv').style.display = 'block';
    document.getElementById('busquedaDiv').style.display = 'none';
});

document.getElementById('offerUnico').addEventListener('click', function() {
    document.getElementById('descuentoAllDiv').style.display = 'none';
    document.getElementById('busquedaDiv').style.display = 'block';
});











