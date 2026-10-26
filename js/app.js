// app.js — Indicador de conexión de Pizzería Imperial
// Solo muestra si la app está "conectado" o "sin conexión".
// (El registro del Service Worker va en el <script> al final de index.html.)

function actualizarEstadoConexion() {
    const estado = document.getElementById("estado-conexion");
    if (!estado) return;

    if (navigator.onLine) {
        estado.textContent = "conectado";
        estado.classList.remove("offline");
    } else {
        estado.textContent = "sin conexión";
        estado.classList.add("offline");
    }
}

window.addEventListener("online", actualizarEstadoConexion);
window.addEventListener("offline", actualizarEstadoConexion);
document.addEventListener("DOMContentLoaded", actualizarEstadoConexion);
