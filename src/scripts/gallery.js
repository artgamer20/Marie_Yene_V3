/* ============================================================
   GESTION DE LA GALERIE D'IMAGES
   ============================================================ */

let currentGalleryIndex = 0;
let galleryInterval = null;

export const initGallery = () => {
    const slides = document.querySelectorAll('.slide, .gallery-slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;

    const showSlide = (index) => {
        if (index >= slides.length) currentGalleryIndex = 0;
        else if (index < 0) currentGalleryIndex = slides.length - 1;
        else currentGalleryIndex = index;

        slides.forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none';
        });
        dots.forEach(d => d.classList.remove('active'));

        slides[currentGalleryIndex].classList.add('active');
        slides[currentGalleryIndex].style.display = 'block';
        if (dots[currentGalleryIndex]) dots[currentGalleryIndex].classList.add('active');
    };

    const resetAutoPlay = () => {
        if (galleryInterval) clearInterval(galleryInterval);
        galleryInterval = setInterval(() => moveGallery(1), 5000);
    };

    // Exposer les fonctions au scope global
    window.moveGallery = (step) => {
        showSlide(currentGalleryIndex + step);
        resetAutoPlay();
    };

    window.currentSlide = (index) => {
        showSlide(index);
        resetAutoPlay();
    };

    showSlide(0);
    resetAutoPlay();
};