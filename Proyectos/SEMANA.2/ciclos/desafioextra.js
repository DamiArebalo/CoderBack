let ciclo =confirm("Evaluamos un numero?");
let pares = 0;
let impares = 0;
while(ciclo){
    let entrada = parseInt(prompt("Ingrese un numero entero"));
    let prueba = (entrada % 2) ;
    if(prueba == 0){
        alert("el numero "+entrada+" es PAR");
        pares++
    }else{
        alert("el numero "+entrada+" es impar");
        impares ++
    }
    console.log("Pares Parciales: "+pares+" Impares Parciales: "+impares);
    ciclo = confirm("¿Evaluamos otro numero?");

}

alert("Ingresaste "+pares+" N° Pares y "+impares+" N° Impares");





