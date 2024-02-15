/*let cantidad = parseInt(prompt('INGRESE CANTIDAD DE REPETICIONES'));
let texto = prompt('INGRESE TEXTO A REPETIR');
for (let index = 0; index < cantidad; index++) {
console.log(texto);
}*/

/* Este codigo deberia repetir el texto de la variable 
texto las veces exacta a la variable cantidad.

pero el codigo da error porque la variable cantidad
no fue expecificada como un numero, si no que como string
*/

let lados =  parseInt(prompt('INGRESE CANTIDAD DE LADOS'));
for (let index = 0; index < lados; index++) {
if (index > 3) {
}
alert("lado "+(index+1));
}

/* 
¿Qué tiene que hacer este código?
¿Por qué no cumple con su función?
¿Qué propuesta podrías hacer para que tenga sentido su uso?

Este codigo tendria que el numero de cada lado que proporcione el usuario

no cumple su funcion porque la variable lados esta contenida 
por un string y no un entero para que tenga funcionalidad el for 
y porque en el alert no se anida la variable de incremento

agregando un parseint en la variable de entrada, se solucionaria el error


*/