// DECLARACION DE VARIABLES DE FORMULARIO
    let formuProducto = document.querySelectorAll(".dato")
    console.log(formuProducto)


// Generacion del Array Global
const productos = [];

let rutaimg

const inputImg = document.querySelector('#productImg'); //selector de imagen

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
//llegar a la ruta del usuario de la imagen


//Evento DE INGRESO DE IMAGENES
inputImg.addEventListener('change', (event) => {  

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
            // mostrarImagen(e.target.result) //--Agregar div contendor para muestra previa
        }

    }else{
        console.warn("no se selecciono ninguna imagen")
    }

   
});

function mostrarImagen (ruta){
    let imagenCode = document.createElement("img")
    imagenCode.src=ruta
    nodo.appendChild(imagenCode)
}

//CLASE - PLANTILLA DE PRODUCTOS
class Producto{
    static id = 0

    constructor(precioLista,descripCorta,descripLarga,nombre,imgProd,stockInicial, categoria){
        this.id = ++Producto.id
        this.precioLista = precioLista;
        this.descripCorta = descripCorta;
        this.descripLarga = descripLarga;
        this.nombre = nombre;
        this.oferta = 0;
        this.img = imgProd;
        this.stock = stockInicial;
        this.categoria =categoria

    }



    agregarOferta = descuento =>{
        descuento = this.precioLista * (descuento / 100);
        this.oferta = this.precioLista - descuento;
        console.log(`Se aplicó un descuento. \nEl nuevo precio es: ${this.oferta}`);
    }

}

//Agregar oferta  SUMNAR AL DOM
const ofertaNueva = () =>{

    console.log("incio de ofertas")
    let nombreProducto = prompt("Ingresa Nombre de producto").toLowerCase();
    let descuento = parseFloat(prompt("ingresa el porcentaje de descuento"));


    //--Solucion de validar exitencia con un metodo mas avanzado--
    let idExists = productos.some(producto => nombreProducto == producto.nombre);
    if (idExists) {
        producto.agregarOferta(descuento)
    }




}

//FUNCION PARA VALIDAR LA ENTRADA DE INFO
function validarProductos(precioLista,descripCorta,descripLarga,nombre,imgProd,stock){
    //Inicializacion de componentes

    let parsedPrice = parseFloat(precioLista);
    let parsedStock = parseInt(stock)
    let nombreMinus = nombre.toLowerCase


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
    const valNombre = (nombreMinus) => {
        let nombreExists = productos.some(producto => nombreMinus == producto.nombre);

        if (nombreExists) {
            return false;
        } else {
            return true;
        }
    }


    // Validación para imagen (img)
    // const valImg = imgProd =>{
    //     const extensionsTrues = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];
    //     const imgFileName = imgProd.toLowerCase();
    //     const imgExtension = imgFileName.substring(imgFileName.lastIndexOf("."));
    //     if (!extensionsTrues.includes(imgExtension)) {
    //         console.error("Error: El archivo de imagen debe tener una extensión válida (.jpg, .jpeg, .png, .gif, .bmp, .svg).");
    //         return false;
    //     }else{
    //         return true;
    //     }
    // }

    //Puesto DE CONTROL
    console.log("stock: "+valStock(stock)+"\nNombre: "+valNombre(nombreMinus)+"\ncorta: "+
                valShortDescription(descripCorta)+"\nlarga: "+valLongDescription(descripLarga)+
                "\n precio: "+valPrecio(parsedPrice));


    //VALIDACION GENERAL
    if(valStock(stock)&& valShortDescription(descripCorta)&& valLongDescription(descripLarga)&& valPrecio(parsedPrice)&&valNombre(nombreMinus)){
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
        agregarProductoAlDOM(producto);

        console.log("✨PRODUCTO AGREGADO CORRECTAMENTE✨");
          productos

    }else{
        console.error("❌Error en la carga de Productos❌ \nIntente denuevo mas tarde ");
    }



}//Fin del Agregado de productos





//EVENTOS Y CODIGO EN MARCHA
const agregarProd = document.getElementById("agregarProd"); //BOTON DE FORMULARIO PRODUCTOS

//--AGREGAR PRODUCTOS AL ARRAY---
agregarProd.onclick = () =>{
    agregarProductos()
    console.table(productos);
}


//----CARD DE PRODUCTOS -----
// Función para crear una tarjeta de producto
function crearTarjetaProducto(producto) {
    const productCard = document.createElement('li');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3 class="product-name">${producto.nombre}</h3>
        <p class="product-description">${producto.descripCorta}</p>
        <hr class="divider">
        <p class="product-price">$${producto.precioLista}</p>
        <button class="add-to-cart" id="${producto.id}">Add to Cart</button>
    `;

    return productCard;
}

// Agregar las tarjetas de productos al DOM
function agregarProductoAlDOM(producto) {
    
    const productContainer = document.querySelector('.product-list');
    productContainer.innerHTML=" "
    productos.forEach((producto) =>{
        let productCard = crearTarjetaProducto(producto)
        productContainer.appendChild(productCard);
    })
}


//funcion para guardar el array productos en el LocalStorage
function actualizarProductos (){
    //AlGORITMO
}

//funcion para filtrar por categoria 
export default productos