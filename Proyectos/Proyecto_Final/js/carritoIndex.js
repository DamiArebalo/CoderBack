


//-----CARRITO------



const botonCarrito = document.getElementById("btnCarrito");
const cart = document.getElementById("cart");

botonCarrito.onclick = () => {
    
    let elegido = "productos[0]" //algoritmo que tome el nombre de la card producto y devuelva la posicion en el array


    // Añade un producto al carrito como ejemplo
    const cartItems = document.getElementById("cartItems");
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="card-carrito">
            <section class="nombre-carrito">${elegido.nombre}</section>
            <button class="delete">🗑️</button>
            <div class="counter">
                <button class="decrease">-</button>
                <span class="count" id="cantidad">1</span>
                <button class="increase">+</button>
            </div>
        </div>
    `;
    //cartItems.appendChild(li);

    // Agrega funcionalidad al botón de eliminar
    li.querySelector(".delete").onclick = function() {
        cartItems.removeChild(li);
    };

    // Agrega funcionalidad a los botones de incrementar y decrementar
    const countSpan = li.querySelector(".count");
    li.querySelector(".increase").onclick = function() {
        countSpan.textContent = Number(countSpan.textContent) + 1;
    };
    li.querySelector(".decrease").onclick = function() {
        if (Number(countSpan.textContent) > 1) {
            countSpan.textContent = Number(countSpan.textContent) - 1;
        }
    };

    // Muestra el carrito
    cart.style.transform = "translateX(0)";
};


const closeCart = document.getElementById("closeCart");

closeCart.onclick = () => {
    // Oculta el carrito
    cart.style.transform = "translateX(100%)";
};





class Micompra{
    constructor( ){

    }
}