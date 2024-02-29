const productos = [];

function validarProductos(){
    const id = document.getElementById("productId");
    const nombre= document.getElementById("productName");
    const descripLarga = document.getElementById("productLongDescription");
    const descripCorta= document.getElementById("productShortDescription");
    const precio = document.getElementById("productPrice");
    const img = document.getElementById("productImg");

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
        }
    }

    // Validación para productPrice (precio)
    const valPrecio = precio =>{
        const parsedPrice = parseFloat(precio.value);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            console.error("Error: productPrice debe ser un valor numérico no negativo.");
            return false;
        }
    }
   
    // Validación para ID (id)
    const valID = id =>{
        const parsedId = parseInt(id.value);
        if (isNaN(parsedId) || parsedId < 0) {
            console.error("Error: ID debe ser un número no negativo.");
            return false;
        }

        // Verificación de existencia del ID en el array "productos"
        if (productos.includes(parsedId)) {
            console.error("Error: El ID ya existe en la lista de productos.");
            return false;
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
        }
    }
        


   if(valID(id)&& valShortDescription(descripCorta)&& valImg(img)&& valLongDescription(descripLarga)&& valPrecio(precio)){
    return true
   }



}

const addProduct = () => {

    if(validarProductos()){
        const id = document.getElementById("productId");
        let nombre= document.getElementById("productName");
        let descripLarga = document.getElementById("productLongDescription");
        let descripCorta= document.getElementById("productShortDescription");
        let precio = document.getElementById("productPrice");
        let img = document.getElementById("productImg");


        const producto = {
            id: id , 
            nombre: nombre,
            descripCorta: descripCorta,
            descripLarga: descriplarga,
            precio: precio,
            img: img
        }

        productos.push(producto)

        console.log("producto agregado correctamente");

        closePopupProduct();

    }
    
 
    
}
