

    let id = document.getElementById("productId");
    let nombre= document.getElementById("productName");
    let descripLarga = document.getElementById("productLongDescription");
    let descripCorta= document.getElementById("productShortDescription");
    let precio = document.getElementById("productPrice");
    let img = document.getElementById("productImg");

//funcion de cerrado del PopUp
function cerrarPopupProductos() {
    document.getElementById("modalBackgroundProducts").style.display = "none";
    document.getElementById("productPopup").style.display = "none";
}

const productos = []; // Generacion del vector Global

const addProduct = () => {
    console.log("inicio de funcion");

    const id = document.getElementById("productId");
    const nombre= document.getElementById("productName");
    const descripLarga = document.getElementById("productLongDescription");
    const descripCorta= document.getElementById("productShortDescription");
    const precio = document.getElementById("productPrice");
    const img = document.getElementById("productImg");

    let producto = {
        id: id.value , 
        nombre: nombre.value,
        descripCorta: descripCorta.value,
        descripLarga: descripLarga.value,
        precio: precio.value,
        img: img.value 
    }

    if(validarProductos()==true){
        


        productos.push(producto)

        console.log("producto agregado correctamente");

        cerrarPopupProductos();

    }else{
        console.warn("Error en la carga de datos")
    }
    
 
    
}



function validarProductos(){
    //Inicializacion de componentes
    let parsedId = parseInt(id.value);
    let parsedPrice = parseFloat(precio.value);
    

    // Validación para productShortDescription (descripCorta)
    const valShortDescription = descripCorta =>{     
        if (descripCorta.value.length > 30) {
            console.error("Error: productShortDescription no debe exceder los 30 caracteres.");
            return false;
        }else{
            return true;
        }
    }
 
    // Validación para productShortDescription (descripCorta)
    const valLongDescription = descripLarga =>{
        if (descripCorta.value.length > 70) {
            console.error("Error: productLongDescription no debe exceder los 70 caracteres.");
            return false;
        }else{
            return true;
        }
    }

    // Validación para productPrice (precio)
    const valPrecio = precio =>{
        
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            console.error("Error: productPrice debe ser un valor numérico no negativo.");
            return false;
        }else{
            return true;
        }
    }

    
   
    // Validación para ID (id)
    const valID = id =>{
        
        for(const producto of productos){
            // Verificación de existencia del ID en el array "productos"

            if(parsedId == producto.id){
                console.error("Error: El ID ya existe en la lista de productos.");
                return false;
            }
        }

        if (parsedId < 0) {
            console.error("Error: ID no debe ser un número negativo.");
            return false;
        }else if(isNaN(parsedId)){
            console.error("no se ingreso bien el ID")
            return false;
        }else{
            return true;
        }
    }
    
   
    // Validación para imagen (img)
    const valImg = img =>{
        const extensionsTrues = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];
        const imgFileName = img.value.toLowerCase();
        const imgExtension = imgFileName.substring(imgFileName.lastIndexOf("."));
        if (!extensionsTrues.includes(imgExtension)) {
            console.error("Error: El archivo de imagen debe tener una extensión válida (.jpg, .jpeg, .png, .gif, .bmp, .svg).");
            return false;
        }else{
            return true;
        }
    }
        


   if(valID(parsedId)==true&& valShortDescription(descripCorta)&& valImg(img)&& valLongDescription(descripLarga)&& valPrecio(parsedPrice)){
    return true
   }



}

