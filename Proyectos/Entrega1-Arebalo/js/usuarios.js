class Usuario{
    static id = 0
    constructor(email,nombre,contraseña,){
        this.id= ++Usuario.id;
        this.mail = email;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.admin = false;


    }

    agregarAdmin = () =>{

        this.admin = true

        if (this.admin) {
            console.log(`Usuario ${this.nombre} ahora es administrador.`);
        } else {
            console.log(`Usuario ${this.nombre} ya no es administrador.`);
        }


    }


}

const usuarios = []

const admins = []


let checkAdmin = false

//FUNCION PARA PEDIR DATOS DEL USUARIO
function pedirDatosRegister(){
    
    nombre= prompt("INGRESAR NOMBRE DE USUARIO").toLowerCase()
    email= prompt("INGRESAR CORREO ELECTRONICO").toLowerCase()
    password = prompt("INGRESAR cCONTRASEÑA")
    
    
}//Fin pedirDatosRegister()

//funcion de validacion
function validarUsuario(email,password,nombre) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    console.log(nombre)
    

    if (!emailRegex.test(email)) {
        
        console.log("Ingreso incorrecto, intente otra vez o regístrese");
    } 

    if (!passwordRegex.test(password)) {
       
        console.warn("Ingreso incorrecto, intente otra vez o regístrese");
    } 

    console.log("nombre: "+nombre+" email: "+emailRegex.test(email)+" contraseña: "+passwordRegex.test(password))

    if(!passwordRegex.test(password)||!emailRegex.test(email)){
        return false
    }else{
        return true
    }

    
}

function agregarUsuario(email,password,nombre) {

   
    //Ingresar solo si son datos validos
    if(validarUsuario(email,password,nombre)==true){ 
        checkAdmin = confirm("Eres Administrador?")
        console.log(`Valor de checkAdmin: ${checkAdmin}`);
        
        if(checkAdmin){
            const user = new Usuario(email,nombre,password,)
            usuarios.push(user)
            agregarAdmin();

            
        }else{
            const user = new Usuario(mail,nombre,contraseña,)
            usuarios.push(user)

        }
            

        alert("✨PRODUCTO AGREGADO CORRECTAMENTE✨");

    }else{
        alert("❌Error en la carga de Usuario❌ \nIntente denuevo mas tarde ");
    }

}

const inicioRegister =() =>{
    let iniciar = confirm("Empezamos a Registrar?")
    return iniciar
}

while(inicioRegister()==true){

    let menuUser = parseInt(prompt("REGISTRO DE USUARIO NUEVO\n 1-Ingresar nuevo usuario \n 2-Ver tabla de usuarios \n 3- Ver Tabla de admins\n 0<--Atras \n pulsa otra cosa pa salir"));

    switch(menuUser){
        case 1:
            pedirDatosRegister();
            agregarUsuario(email,password,nombre)

        break
        case 2:
            console.table(usuarios)
        break
        case 3:
            console.table(admins)
        break
    }

}