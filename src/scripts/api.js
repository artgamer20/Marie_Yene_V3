/* ============================================================
   CONFIGURATION API CONTENTFUL (Optimisée pour Vite)
   ============================================================ */

export const CONFIG = {
    // On utilise les noms exacts de ton fichier .env
    space: import.meta.env.VITE_CONTENTFUL_SPACE, 
    accessToken: import.meta.env.VITE_CONTENTFUL_TOKEN,
    coordsYene: [14.6591, -17.1120] // Coordonnées géographiques de Yene
};

/**
 * Initialisation du client.
 * Comme Contentful est chargé via <script> dans index.html, 
 * l'objet 'contentful' est disponible globalement sur l'objet window.
 */
let contentfulClient = null;

try {
    if (typeof contentful !== 'undefined') {
        contentfulClient = contentful.createClient({
            space: CONFIG.space,
            accessToken: CONFIG.accessToken
        });
    } else {
        console.error("Le SDK Contentful n'est pas détecté. Vérifiez la balise script dans index.html");
    }
} catch (error) {
    console.error("Erreur lors de la création du client Contentful:", error);
}

export const client = contentfulClient;