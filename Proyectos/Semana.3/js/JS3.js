// const sumar5=(num1,num2) =>{
//     let resultado = (num1+5)*num2;

//     return(resultado)
// }

// let ingreso=parseInt(prompt("ingresa un numero"));
// let ingreso2=parseInt(prompt("ingresa un numero"));

// console.log(sumar5(ingreso,ingreso2));



const iva = 21;



//sacar la diferencia de aumento 

const aumentoAprox=(factura,lista,aumento,descuento) =>{
    let nuevoPrecio = lista + (lista*aumento/100);
    let resultadoFinal= nuevoPrecio - (nuevoPrecio*descuento/100);

    return(resultadoFinal-factura);
}



//sacar el monto sin IVA para realizar ajuste
const ajuste =(factura)=>{
    let precioNuevo = parseInt(prompt("Cuanto le tiene que quedar"));
    let parcial = factura - precioNuevo;
    let resultado = parcial -(parcial*iva/100);

    return(resultado)

}



let accion = confirm("Nueva gestion?") 
do{
   let tarea = confirm("aceptar=Ajuste  Cancelar = AumentoAprox");

    if(tarea==false){
        let factura = parseInt(prompt("Ultima Factura- Sin adicionales"));

        let lista = parseInt(prompt("precio lista actual"))

        let aumento = parseInt(prompt("Porcentaje de Aumento"));

        let descuento = parseInt(prompt("descuento"));

       alert("Diferencia de Aumento : "+ aumentoAprox(factura,lista,aumento,descuento))
    }else{

        let factura = parseInt(prompt("Ultima Factura- Sin adicionales"));

        

        alert("Ajuste : "+ajuste(factura));
    }

    accion = confirm("Nueva gestion?")

}while(accion)





