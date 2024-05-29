document.addEventListener("DOMContentLoaded", function () {
    const banner = document.querySelector('.banner');
    const images = document.querySelectorAll('.banner img');

    let index = 0;

    function showImage() {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
        index = (index + 1) % images.length;
        setTimeout(showImage, 3000); // Cambia la imagen cada 3 segundos (3000 milisegundos)
    }

    showImage(); // Inicia la función para mostrar las imágenes automáticamente
});