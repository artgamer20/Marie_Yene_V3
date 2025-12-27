// src/scripts/api.js
import * as contentful from 'contentful'; 

export const CONFIG = {
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    coordsYene: [14.630, -17.170]
};

// SYNTAXE CORRIGÉE : on utilise .createClient
export const client = contentful.createClient({ 
    space: CONFIG.space, 
    accessToken: CONFIG.accessToken 
});