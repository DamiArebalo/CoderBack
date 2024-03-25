const botonCarrito = document.getElementById("btnCarrito");
const cart = document.getElementById("cart");

botonCarrito.onclick = () => {
    // Añade un producto al carrito como ejemplo
    const cartItems = document.getElementById("cartItems");
    const li = document.createElement("li");
    li.innerHTML = `
        Producto 1
        <button class="delete">🗑️</button>
        <div class="counter">
            <button class="decrease">-</button>
            <span class="count">1</span>
            <button class="increase">+</button>
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
