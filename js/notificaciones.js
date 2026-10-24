// notificaciones.js — Notification API
// Pide permiso al usuario con un botón y muestra una notificación.

document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('btn-notificar');
    const mensaje = document.getElementById('notificaciones-mensaje');

    boton.addEventListener('click', () => {
        // No todos los navegadores soportan notificaciones; lo comprobamos primero
        if (!('Notification' in window)) {
            mensaje.textContent = 'Este navegador no soporta notificaciones.';
            return;
        }

        // Abre el diálogo del navegador ("Permitir" / "Bloquear")
        Notification.requestPermission().then((permiso) => {
            if (permiso === 'granted') {
                new Notification('Pizzeria Imperial', {
                    body: '¡Listo! Te avisaremos cuando haya nuevas ofertas.',
                    icon: 'img/pizzamargarita.jpg'
                });
                mensaje.textContent = 'Notificaciones activadas.';
            } else {
                mensaje.textContent = 'No diste permiso para notificaciones.';
            }
        });
    });
});