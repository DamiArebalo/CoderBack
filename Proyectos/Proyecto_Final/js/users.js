class Usuario{
    static id = 0
    constructor(mail,nombre,contraseña,){
        this.id= ++Usuario.id;
        this.mail = mail;
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


//Cerrar popup del login
function cerrarPopupLogin() { 
    document.getElementById("modalBackground").style.display = "none";
    document.getElementById("loginPopup").style.display = "none";
}

//funcion de validacion
function validarUsuario(emailInput,passwordInput,nombreInput) {
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    valNombre = () =>{
        if(isNaN(nombreInput)){
            return false
        }
        else{
            return true
        }
    }

    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("error");
        emailError.textContent = "Ingreso incorrecto, intente otra vez o regístrese";
    } else {
        emailInput.classList.remove("error");
        emailError.textContent = "";
    }

    if (!passwordRegex.test(passwordInput.value)) {
        passwordInput.classList.add("error");
        passwordError.textContent = "Ingreso incorrecto, intente otra vez o regístrese";
    } else {
        passwordInput.classList.remove("error");
        passwordError.textContent = "";
    }

    if(!passwordRegex.test(passwordInput.value)||!emailRegex.test(emailInput.value)||(valNombre()==false)){
        return false
    }else{
        return true
    }





    
}

function validarLogin(emailInput,passwordInput){
    let mailExists = usuarios.some(user => emailInput == usuarios.mail);
    let passwordExists = usuarios.some(user => passwordInput == usuarios.contraseña);


    if (passwordExists && mailExists) {       
         return true;
    } else {
         return false;
    }

}

function agregarUsuario() {

    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let nombreInput = document.getElementById("nombre");
  
  

    //Ingresar solo si son datos validos
    if(validarUsuario(emailInput,passwordInput,nombreInput)==true){ 
        let checkAdmin = document.getElementById('checkAdmin').checked;
        console.log(`Valor de checkAdmin: ${checkAdmin}`);
        
        if(checkAdmin==true){
            const user = new Usuario(mail,nombre,contraseña,)
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





