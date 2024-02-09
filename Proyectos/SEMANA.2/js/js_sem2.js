/*Te recomendamos realizar el siguiente desafío en Visual Studio Code:



1. Crea un algoritmo que a partir de la respuesta del usuario pueda determinar Cuántos mundiales vivió una persona.

Ten en cuenta que se juega un mundial cada 4 años y que se han jugado 22 copas del mundo.*/

let edad = parseInt(prompt("ingrese su edad"));
console.log(edad)
let mundiales = 0;
let i;
if(edad>=88){
    alert("Felicidades usted vivio TODOS LOS MUNDIALES")
}else if(edad<1){
    alert("tomaste la mamadera?");

}else{
    for(i=1;i=edad;i++){
        if(i==1 || i==4 ||i==8 || i==12 || i==16 || i==20 || i==24 
            || i==28 || i==32 || i==36 || i==40 || i==44 ||i==48
            || i==52 || i==56 || i==60 || i==64 || i==68 ||i==72
            || i==76 || i==80 || i==84){

                mundiales++
        }else{
            continue;
        }

        console.log(mundiales)
    }
   alert("Usted ha vivido "+mundiales+" copas del mundo")
}