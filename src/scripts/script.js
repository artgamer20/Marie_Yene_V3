/* ============================================================
   PORTAIL CITOYEN YENE - SCRIPT PRINCIPAL
   Digitalisation par Art Tech - 2025
   ============================================================ */

// 1. Import des modules
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
import { fetchServices, initServiceFilters, initServiceSearch } from './services.js';
import { fetchVillages } from './map-handler.js';
import { initYouTubeModal } from './youtube-modal.js';

// 2. État global (exposé pour la compatibilité avec Leaflet et les onclick HTML)
window.mainMap = null;
window.markers = {};
window.villagesData = {};

/**
 * INITIALISATION PRINCIPALE
 * Gère le chargement séquentiel pour éviter les erreurs de DOM
 */
const initUI = async () => {
    try {
        // --- ÉTAPE A : Chargement des composants structurels ---
        // On charge Header et Footer en parallèle pour plus de rapidité
        await Promise.all([
            initHeader(), 
            initFooter()
        ]);

        // --- ÉTAPE B : Initialisation des composants UI ---
        // Ces fonctions dépendent du HTML injecté juste au-dessus
        initTheme();
        initWeather();
        initMobileMenu();
        initActiveNav();
        initScrollToTop();
        initYouTubeModal();

        // --- ÉTAPE C : Détection et activation des sections spécifiques ---
        
        // Galerie (Slider)
        if (document.querySelector('.slide') || document.querySelector('.gallery-slide')) {
            initGallery();
        }

        // Statistiques animées
        if (document.querySelector('.stat-number')) {
            animateStats();
        }

        // --- ÉTAPE D : Appels API (Contentful) ---
        
        if (!client) {
            console.error("Le client Contentful n'a pas pu être initialisé.");
        } else {
            // Actualités
            if (document.getElementById('news-container-home') || document.getElementById('news-container-full')) {
                fetchNews('all');
                initNewsFilters();
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
        }

        // --- ÉTAPE E : Animations AOS ---
        // On attend un court instant que le contenu API soit rendu
        setTimeout(() => {
            if (typeof AOS !== 'undefined') {
                AOS.init({ duration: 800, once: true });
            } else {
                console.warn("AOS n'est pas chargé.");
            }
        }, 500);

    } catch (error) {
        console.error("Erreur critique lors de l'initialisation :", error);
    }
};

/**
 * FONCTIONS GLOBALES
 * Nécessaires pour les interactions directes dans le HTML (ex: onclick)
 */
window.focusVillage = (id) => {
    if (window.villagesData[id] && window.mainMap) {
        window.mainMap.flyTo(window.villagesData[id].coords, 14);
        if (window.markers[id]) window.markers[id].openPopup();
    }
};

// --- LANCEMENT ---
document.addEventListener("DOMContentLoaded", initUI);