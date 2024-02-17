let pares = 0;
let impares = 0;

function pruebaPar(numEntrada){
   let prueba = (numEntrada % 2) ;
   return(prueba)
}

function pedirNumero(){
    let entrada = parseInt(prompt("Ingrese un numero entero"));
    return(entrada)
    
}

function muestra(numEntrada){
    let entrada = pruebaPar(numEntrada) 
    if(entrada==0){
        alert("el numero "+numEntrada+" es PAR");
    }else{
        alert("el numero "+numEntrada+" es impar");
    }
}

let ciclo =confirm("Evaluamos un numero?");
while(ciclo){
   let entrada = pedirNumero();
    muestra(entrada);
    let prueba = pruebaPar(entrada) 
    if(prueba==0){

        pares++;
    }else{
        impares++;
    }
    ciclo = confirm("¿Evaluamos otro numero?");
    console.log(pares+" "+impares)

}

alert("Ingresaste "+pares+" N° Pares y "+impares+" N° Impares");







