/* ============================================================
   PORTAIL CITOYEN YENE - SCRIPT PRINCIPAL
   Digitalisation par Art Tech - 2025
   ============================================================ */

// Import des modules
import { client, CONFIG } from './api.js';
import { 
    initHeader, 
    initFooter, 
    initActiveNav 
} from './ui-loader.js';

import { 
    initTheme, 
    animateStats, 
    initMobileMenu, 
    initScrollToTop 
} from './ui-components.js';

import { initGallery } from './gallery.js';
import { initWeather } from './weather.js';
import { fetchNews, initNewsFilters } from './news.js';
import { fetchServices, initServiceFilters, initServiceSearch} from './services.js';
import { fetchVillages } from './map-handler.js';
import { initYouTubeModal } from './youtube-modal.js';

// État global (exposé pour compatibilité)
window.mainMap = null;
window.markers = {};
window.villagesData = {};

// Initialisation principale
const initUI = () => {
    // Composants UI de base
    initHeader();
    initFooter();
    initTheme();
    initWeather();
    initMobileMenu();
    initActiveNav();
    initScrollToTop();
    initYouTubeModal();
    
    // Détection des sections présentes
    if (document.querySelector('.slide') || document.querySelector('.gallery-slide')) initGallery();
    if (document.querySelector('.stat-number')) animateStats();
    
    // Actualités
    if (document.getElementById('news-container-home') || document.getElementById('news-container-full')) {
        fetchNews('all');
        initNewsFilters();
    }
    //Vérification du client avant les appels API
    if (!client) {
        console.error("Le client Contentful n'a pas pu être initialisé.");
        return;
    }
    // Services
    if (document.getElementById('services-container')) {
        fetchServices('all');
        initServiceFilters();
        initServiceSearch();   
    }
    
    // Carte des villages
    if (document.getElementById('map-villages') || document.getElementById('map')) {
        fetchVillages();
    }
    
    // Initialiser AOS après injection
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 800, once: true });
        } else {
            console.warn("AOS n'est pas chargé, les animations seront ignorées.");
        }
    }, 500);
};

// Exposer les fonctions globales pour compatibilité
window.focusVillage = (id) => {
    if (window.villagesData[id] && window.mainMap) {
        window.mainMap.flyTo(window.villagesData[id].coords, 14);
        if (window.markers[id]) window.markers[id].openPopup();
    }
};

// Lancer l'application
document.addEventListener("DOMContentLoaded", initUI);