//INICIALIZACION DE ARRAY DE PRODUCTOS
const productos = []; 

//INICALIZACION DE VARIABLES GLOBALES
let id 
let nombre
let descripCorta
let descripLarga
let precio 

//FUNCION PARA PEDIR DATOS DEL PRODUCTO
 function pedirDatos(){
    id = parseInt(prompt("INGRESAR ID DEL PRODUCTO"))
    nombre= prompt("INGRESAR NOMBRE DEL PRODUCTO")
    descripCorta= prompt("INGRESAR DESCRIPCION CORTA DEL PRODUCTO")
    descripLarga = prompt("INGRESAR DESCRIPCION LARGA DEL PRODUCTO")
    precio = parseFloat(prompt("INGRESAR PRECIO DEL PRODUCTO"))
    
    // img = prompt("INGRESAR NOMBRE.EXTENCION DE UNA IMGEN")
    
}//Fin pedirDatos()

//FUNCION QUE VALIDA LA ENTRADA DE CADA VARIABLE
function validarProductos(id,precio,descripCorta,descripLarga,nombre){ 

    let parsedId = parseInt(id) // declaracion de variable dentro de la funcion parseando la entrada del usuario

    let parsedPrice = parseFloat(precio);// declaracion de variable dentro de la funcion parseando la entrada del usuario

    // Validación para productShortDescription (descripCorta) -- hasta 20 caracteres
    const valShortDescription = descripCorta =>{     
        if (descripCorta.length > 20) {
            alert("Error: productShortDescription no debe exceder los 20 caracteres."); //Mensaje de error indicativo
            return false;
        }else{
            return true;
        }

    }//Fin valShortDescription()
 
    // Validación para productLongDescription (descripLarga) hasta 70 caracteres
    const valLongDescription = descripLarga =>{
        if (descripLarga.length > 70) {
            alert("Error: productLongDescription no debe exceder los 70 caracteres."); //Mensaje de error indicativo
            return false;
        }else{
            return true;
        }

    }//Fin valLongDescription()

    // Validación para productPrice (precio) -- positivo y numerico
    const valPrecio = parsedPrice =>{
        
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            alert("Error: El Precio debe ser un valor numérico no negativo."); //Mensaje de error indicativo
            return false;
        }else{
            return true;
        }

    }//fin valPrecio()

    
   
    // Validación para ID (id) -- mayor o = a 0 / dato numerico / no debe existir en el array
    const valID = parsedId => {
        if (isNaN(parsedId) || parsedId < 0) {
            alert("Error: ID no debe ser un número negativo."); //Mensaje de error indicativo
            return false;
        }
        for (const producto of productos) {
            if (producto.id == parsedId) {

                console.error("Error: El ID ya existe en la lista de productos."); //Mensaje de error con motivo
                return false;
            }
          }
        
        return true;
              
    }//fin valID()

    //--Solucion de validar exitencia con un metodo mas avanzado--
    // let idExists = productos.some(producto => parsedId == producto.id);
    // if (idExists) {
                
    //     return false;
    // } else {
    //     return true;
    // }

    //VALIDACION DEL NOMBRE --> No debe exitir en el array
    const valNombre = nombre =>{
        
        for (const producto of productos) {

            producto.nombre = producto.nombre.toLowerCase();//normalizacion de entrada
            
            if (producto.nombre == nombre) {

                console.error("Error: El Nombre ya existe en la lista de productos."); //Mensaje de error con motivo
                return false;
            }
          }
        
        return true;


    }//Fin valNombre()
    
    
    //Puesto de control BOOL    
    console.log("Puesto de control:\nid: "+valID(parsedId)+"\ncorta: "+valShortDescription(descripCorta)+"\nlarga: "+valLongDescription(descripLarga)+"\nprecio: "+valPrecio(parsedPrice));


    //CONDICIONAL DE SOLO SI TODOS LAS VALIDACIONES SON POSITIVAS SE APRUEBAN LOS DATOS INGRESADOS
    if(valID(parsedId)&&valNombre(nombre)&&valShortDescription(descripCorta)&& valLongDescription(descripLarga)&& valPrecio(parsedPrice)){

        console.log("✨Validado Correctamente✨"); 
        return true;

    }else{
        console.log("Error De Validacion");
        return false;
   }

} //FIN DE LA VALIDACION DE VARIABLES


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


//Funcion Global para Agregar Productos
function agregarProductos(id1,precio1,descripCorta1,descripLarga1,nombre1){ 
    //Puesto de control
    console.log("inicio agregarProducto()");

    //Inicializacion de objeto
    let producto = { 
        id: id1, 
        nombre: nombre1.toLowerCase(),
        descripCorta: descripCorta1,
        descripLarga: descripLarga1,
        precio: precio1
         
    }

    //Ingresar solo si son datos validos
    if(validarProductos(id1,precio1,descripCorta1,descripLarga1,nombre1)){ 
        productos.push(producto)

        alert("✨PRODUCTO AGREGADO CORRECTAMENTE✨");

    }else{
        alert("❌Error en la carga de Productos❌ \nIntente denuevo mas tarde ");
    }
    
 
    
}//Fin del Agregado de productos


//------------ARRANCA EL ALGORITMO PRINCIPAL-----------------

let inicio = confirm("Empezamos a Trabajar?") //CONTROL DE CICLO


while(inicio){ //INCIO DEL CICLO PRINCIPAL

    //BIENVENIDA Y MENU DE ACCIONES

    let accion = parseInt(prompt("Bienvenid@ a Rity-Just\n\n ---MENU DE ADMINISTRADOR---\n 1-Agregar Productos\n 2-Eliminar Productos\n 3-Ver tabla de productos \n Pulse otra letra para salir"));

    //INICIO SWITCH
    switch(accion){

        //ACCION 1 --> AGREGAR OBJETO
        case 1:
            pedirDatos(); //Declaracion del Objeto
            agregarProductos(id,precio,descripCorta,descripLarga,nombre);//Agregar Objeto
            
            inicio = confirm("Seguimos trabajando?");//Validacion de Ciclo
        
        break; //CIERRE ACCION 1

        //ACCION 2 --> ELIMINAR PRODUCTOS
        case 2:

            //---MENU DE ELIMINACION ---
            let menu = parseInt(prompt("---Menu de Eliminacion---\n 1-Eliminar ultimo Producto Añadido\n 2-Eliminar Un producto especifico\n 3-Eliminar el primer producto de la tabla\n 0-Atras <---")); 
            
            
            switch(menu){
                //OPCION 1 --> ELIMINAR EL ULTIMO PRODUCTO
                case  1: 
                    if(arrayVacio()==true){//confirmacion de tabla

                        productos.pop() //Elimina el ultimo producto añadido
                        console.log("Ultimo Producto eliminado correctamente");//confirmacion de operacion

                        inicio = confirm("Seguimos trabajando?");//Validacion de Ciclo

                    }else{
                        arrayVacio()//Mensaje de array vacio

                        inicio = confirm("Seguimos trabajando?");//Validacion de Ciclo
                    }
                
                break;
                
                //OPCION 2 --> PRODUCTO ESPECIFICO
                case 2:
                    if(arrayVacio()==true){//confirmacion de tabla    

                        let busqueda = prompt("Ingrese el nombre del producto a eliminar"); //Producto a Encontrar
                        let aux = 0; //Auxiliar de mucha ayuda
    
                        for(const producto of productos){ // busqueda de producto especifico
                            aux=0 //control auxiliar
                            producto.nombre = producto.nombre.toLowerCase();//normalizacion de entrada
                            
                            if(busqueda.toLowerCase() == producto.nombre){//Si encuentra ese nombre
    
                                productos.splice((productos.indexOf(producto.nombre)-1),1)//elimino ese elemento
                                console.log("Producto : "+producto.nombre+" eliminado correctamente");//confirmacion de la operacion
                                aux = 1;
                                break;//quiebre de la busqueda
                            }
                        }
                        if(aux==0){
                            console.log("No se encontro el producto "+busqueda+" intente otra vez"); // Mensaje error de motivo
                        }
    
                        inicio = confirm("Seguimos trabajando?");//Validacion de Ciclo
                        
    
                    }else{
                        arrayVacio()
                        inicio = confirm("Seguimos trabajando?");//Validacion de Ciclo
                    }

                break;
                    

                case 3:
                    if(arrayVacio()==true){//confirmacion de tabla

                        productos.shift() //Elimina el primer producto añadido
                        console.log("Primer Producto eliminado correctamente");//confirmacion de operacion

                        inicio = confirm("Seguimos trabajando?");//Validacion de Ciclo

                    }else{
                        arrayVacio()//Mensaje de array vacio

                        inicio = confirm("Seguimos trabajando?");//Validacion de Ciclo
                    }
                
                break;
                
                //ATRAS <---
                case 0:
                    inicio = confirm("Seguimos trabajando?");//Validacion de Ciclo
                break;

                //ERROR    
                default:
                    menu = parseInt(prompt("---OPCION INCORRECTA---\n 1-Eliminar ultimo Producto Añadido\n 2-Eliminar Un prodcuto especifico \n 0-Atras <---")); 
                break

            }
          
        break;//CIERRE ACCION 2

        //ACCION 3 --> MOSTRAR TABLA
        case 3 :
            if(arrayVacio()==true){
                console.table(productos)
                inicio = confirm("Seguimos trabajando?");
            }else{
                arrayVacio()
                inicio = confirm("Seguimos trabajando?");
            }
        break//CIERRE ACCION 3
        
        //ERROR
        default:
            inicio = confirm("Seguimos trabajando?");
        break;
            
    }

    

}



