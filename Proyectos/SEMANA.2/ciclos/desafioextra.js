let pares = 0;
let impares = 0;
let entrada = 0;

function pruebaPar(numEntrada){
   let prueba = (numEntrada % 2) ;
   return(prueba)
}

function pedirNumero(){
    entrada = parseInt(prompt("Ingrese un numero entero"));
    return(entrada)
    
}

function muestra(numEntrada){
    entrada = pruebaPar(numEntrada) 
    if(entrada==0){
        alert("el numero "+numEntrada+" es PAR");
    }else{
        alert("el numero "+numEntrada+" es impar");
    }
}

function contadorPar(numEntrada){
    let prueba = pruebaPar(numEntrada);
    if(prueba==0){pares++};
    
}

function contadorImpar(numEntrada){
    let prueba = pruebaPar(numEntrada);
    if(prueba!=0){impares++;}
    

}
let ciclo =confirm("Evaluamos un numero?");
while(ciclo){
    let entrada = pedirNumero();
    muestra(entrada);
    pares = pares + contadorPar(entrada); 
    impares = impares + contadorImpar(entrada);
    console.log(pares+" "+impares)
    ciclo = confirm("¿Evaluamos otro numero?");
    

}

alert("Ingresaste "+pares+" N° Pares y "+impares+" N° Impares");







