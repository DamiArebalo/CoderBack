let nombre = prompt("¿Como te llamas?");
console.log(nombre)
let edad = parseInt(prompt("¿cuantos años tenes?"));
console.log(edad) 
let mensaje= confirm("Mostramos tus datos?");
console.log(mensaje)

if(mensaje){
    console.log("ingreso del usuario "+ nombre + " de " + edad + " años");
}



