import { CONFIG, client } from './api.js';

// On attache ces variables à window pour qu'elles soient accessibles partout
window.mainMap = null;
window.markers = {};
window.villagesData = {};

export const fetchVillages = async () => {
    const mapEl = document.getElementById('map-villages') || document.getElementById('map');
    if (!mapEl) return;

    try {
        // Initialiser la carte
        window.mainMap = L.map(mapEl.id).setView(CONFIG.coordsYene, 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(window.mainMap);

        const res = await client.getEntries({ content_type: 'village' });

        res.items.forEach(item => {
            const village = item.fields;
            if(!village.coordonnees || !village.identifiant) return;

            const coords = village.coordonnees.split(',').map(Number);
            
            // Stockage global
            window.villagesData[village.identifiant] = { 
                nom: village.nom, 
                coords: coords 
            };

            const marker = L.marker(coords)
                .addTo(window.mainMap)
                .bindPopup(`<b>${village.nom}</b><br>${village.description || ''}`);
            
            window.markers[village.identifiant] = marker;
        });
        console.log("Villages chargés :", window.villagesData);

    } catch (error) {
        console.error('Erreur carte:', error);
    }
};

// Fonction de focus améliorée
export const focusVillage = (id) => {
    console.log("Tentative de focus sur :", id);
    const data = window.villagesData[id];
    
    if (data && window.mainMap) {
        window.mainMap.flyTo(data.coords, 15, {
            animate: true,
            duration: 1.5
        });
        if (window.markers[id]) window.markers[id].openPopup();
    } else {
        console.error(`ID "${id}" introuvable. IDs disponibles :`, Object.keys(window.villagesData));
    }
};

// Exposition globale
window.focusVillage = focusVillage;