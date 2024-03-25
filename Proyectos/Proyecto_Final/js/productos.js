// DECLARACION DE VARIABLES DE FORMULARIO
    let formuProducto = document.querySelectorAll(".product-form input")
    console.log(formuProducto)

//funcion de cerrado del PopUp
function cerrarPopupProductos() {
    document.getElementById("modalBackgroundProducts").style.display = "none";
    document.getElementById("productPopup").style.display = "none";
}

const productos = []; // Generacion del vector Global

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

//CLASE - PLANTILLA DE PRODUCTOS 
class Producto{
    static id = 0
    
    constructor(precioLista,descripCorta,descripLarga,nombre,imgProd,stockInicial){
        this.id = ++Producto.id
        this.precioLista = precioLista;
        this.descripCorta = descripCorta;
        this.descripLarga = descripLarga;
        this.nombre = nombre;
        this.oferta = 0;
        this.img = imgProd;
        this.stock = stockInicial;

    }

    agregarOferta = descuento =>{
        descuento = this.precioLista * (descuento / 100);
        this.oferta = this.precioLista - descuento;
        console.log(`Se aplicó un descuento. \nEl nuevo precio es: ${this.oferta}`);
    } 

}

//Agregar oferta
const ofertaNueva = () =>{

    console.log("incio de ofertas")
    let nombreProducto = prompt("Ingresa Nombre de producto").toLowerCase();
    let descuento = parseFloat(prompt("ingresa el porcentaje de descuento"));

    for (const producto of productos) {
        producto.nombre = producto.nombre.toLowerCase(); // Normalización de entrada

        if (producto.nombre === nombreProducto) {
            producto.agregarOferta(descuento);
        }
    }

    



}

//FUNCION PARA VALIDAR LA ENTRADA DE INFO

function validarProductos(precioLista,descripCorta,descripLarga,nombre,imgProd,stock){
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

    
   
    // Validación para ID (id)
    const valStock = parsedStock =>{
        
        if (parsedStock < 0) {
            console.error("Error: ID no debe ser un número negativo.");
            return false;
        }else{
            return true;
        }
    }
    
   
    // Validación para imagen (img)
    const valImg = imgProd =>{
        const extensionsTrues = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];
        const imgFileName = imgProd.toLowerCase();
        const imgExtension = imgFileName.substring(imgFileName.lastIndexOf("."));
        if (!extensionsTrues.includes(imgExtension)) {
            console.error("Error: El archivo de imagen debe tener una extensión válida (.jpg, .jpeg, .png, .gif, .bmp, .svg).");
            return false;
        }else{
            return true;
        }
    }
        
    console.log("stock: "+valStock(stock)+"\ncorta: "+valShortDescription(descripCorta)+"\nlarga: "+valLongDescription(descripLarga)+"\n precio: "+valPrecio(parsedPrice)+"\n img: "+valImg(imgProd));

    if(valStock(stock)&& valShortDescription(descripCorta)&& valLongDescription(descripLarga)&& valPrecio(parsedPrice)&&valImg(imgProd)){
        return true
    }else{
        return false
    }



}

//Funcion Global para Agregar Productos
function agregarProductos(){ 
    //Puesto de control
    console.log("inicio agregarProducto()");

    let imgProd = formuProducto[0].value;
    let nombre1= formuProducto[1].value;
    let descripCorta1= formuProducto[2].value;
    let descripLarga1 = formuProducto[3].value;
    let precioLista = formuProducto[4].value;
    let stock = formuProducto[5].value;
    
    //Ingresar solo si son datos validos
    if(validarProductos(precioLista,descripCorta1,descripLarga1,nombre1,imgProd,stock)){ 

        const producto = new Producto(precioLista,descripCorta1,descripLarga1,nombre1,imgProd,stock)

        productos.push(producto)

        console.log("✨PRODUCTO AGREGADO CORRECTAMENTE✨");

    }else{
        console.error("❌Error en la carga de Productos❌ \nIntente denuevo mas tarde ");
    }
    
 
    
}//Fin del Agregado de productos

//EVENTOS Y CODIGO EN MARCHA

const agregarProd = document.getElementById("agregarProd");

agregarProd.onclick = () =>{
    agregarProductos()
    console.table(productos);
}


