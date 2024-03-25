

function abrirPopup() {
    document.getElementById("modalBackground").style.display = "block";
    document.getElementById("loginPopup").style.display = "block";
}

function abrirPopupProductos() {
    document.getElementById("modalBackgroundProducts").style.display = "block";
    document.getElementById("productPopup").style.display = "block";
}

//Cerrar popup del login
function cerrarPopupLogin() { 
    document.getElementById("modalBackground").style.display = "none";
    document.getElementById("loginPopup").style.display = "none";
}

//funcion de cerrado del PopUp
function cerrarPopupProductos() {
    document.getElementById("modalBackgroundProducts").style.display = "none";
    document.getElementById("productPopup").style.display = "none";
}


//DECLARACION DE ELEMENTOS DE ABRIR Y CERRAR POPUP   
const cerrarLogin = document.getElementById("cerrarLogin"); // CERRAR LOGIN
const btnProd = document.getElementById("abrirProductos"); // BOTON PRODUCTOS
const cerrarProd = document.getElementById("cerrarProd"); // CERRAR PRODUCTOS
const btnCarrito = document.getElementById("btnCarrito"); // BOTON CARRITO
const btnLog = document.getElementById("btnLogin"); // BOTON LOGIN


cerrarLogin.onclick = () =>{cerrarPopupLogin()};
btnProd.onclick = () => abrirPopupProductos();
cerrarProd.onclick = () => cerrarPopupProductos();
btnLog.onclick = () => {abrirPopup()};
btnCarrito.onclick = () => console.log("click carrito")








