// Cargar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito_pizzeria_imperial')) || [];

// Guardar en localStorage y actualizar la vista
function guardarCarrito() {
    localStorage.setItem('carrito_pizzeria_imperial', JSON.stringify(carrito));
    renderizarCarrito();
}

// 1. Agregar producto
function agregarAlCarrito(producto) {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
}

// 2. Sumar o Restar cantidad
function cambiarCantidad(id, cambio) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            quitarDelCarrito(id);
            return;
        }
    }
    guardarCarrito();
}

// 3. Quitar producto
function quitarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
}

// 4. Calcular Total
function obtenerTotal() {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

// Renderizar en el HTML
function renderizarCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total-carrito');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            contenedor.innerHTML += `
        <div class="item-carrito" style="margin-bottom: 8px;">
          <span><strong>${item.nombre}</strong> (x${item.cantidad}) - $${item.precio * item.cantidad}</span>
          <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
          <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <button onclick="quitarDelCarrito(${item.id})">❌</button>
        </div>
      `;
        });
    }

    if (totalElemento) {
        totalElemento.textContent = `$${obtenerTotal()}`;
    }
}

// Renderizar apenas cargue la página
document.addEventListener('DOMContentLoaded', renderizarCarrito);

function sincronizarCarrito() {
    const mensaje = document.getElementById("carrito-mensaje");

    if (!navigator.onLine) {
        // navigator.onLine: propiedad del navegador que dice si hay conexión
        mensaje.textContent = "Sin conexión: el carrito se sincronizará cuando vuelva el internet.";
        return;
    }

    // Aquí iría: fetch("https://mi-api.com/carrito", { method: "POST", body: ... })
    mensaje.textContent = "Carrito sincronizado con el servidor (simulado). ✓";
}

// Conectar el botón y los eventos de conexión (paso 14)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-sincronizar').addEventListener('click', sincronizarCarrito);

    // Estos dos eventos del navegador avisan cuando regresa o se pierde la conexión
    window.addEventListener('online', sincronizarCarrito);
    window.addEventListener('offline', () => {
        document.getElementById('carrito-mensaje').textContent = 'Se perdió la conexión.';
    });
});