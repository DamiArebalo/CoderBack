/*Te recomendamos realizar el siguiente desafío en Visual Studio Code:



1. Crea un algoritmo que a partir de la respuesta del usuario pueda determinar Cuántos mundiales vivió una persona.

Ten en cuenta que se juega un mundial cada 4 años y que se han jugado 22 copas del mundo.

for(i=1;i=(aux);i++){
        if(i==1 || i==4 ||i==8 || i==12 || i==16 || i==20 || i==24 || i==28 || i==32 || i==36 || i==40 || i==44 ||i==48 || i==52 || i==56 || i==60 || i==64 || i==68 ||i==72|| i==76 || i==80 || i==84){

             mundiales++
        }
        console.log(mundiales)
    }
/* recomendamos realizar el siguiente desafío en Visual Studio Code:



1. Crea un algoritmo que a partir de la respuesta del usuario pueda determinar Cuántos mundiales vivió una persona.

Ten en cuenta que se juega un mundial cada 4 años y que se han jugado 22 copas del mundo.

*/


let mundiales = 0; //declaracion de variables
let i=0;
let edad = prompt("ingrese edad del encuestado"); //pregunta al usuario
console.log(edad);
const aux = parseInt(edad); // tambien podria meterlo en la misma variable edad, pero lo pruebo asi para separar 
console.log(aux); 
if(aux<=87){ //condicion menor o igual que 87 años
    
    i=aux/4;
    console.log(i)

    mundiales = parseInt(i)


    
    console.log(mundiales);//muetreo de cuantos mundiales quedo luego del for
}else if(aux<1){
    alert("tomaste la mamadera?"); //por si meten un numero invalido

}else{
        alert("Felicidades usted vivio TODOS LOS MUNDIALES"); //aviso logico por tantos años
        mundiales=22

}

console.log("usted ha visto "+mundiales+" copas del mundo"); //resultado final
alert("usted ha visto "+mundiales+" copas del mundo"); //resultado final