/* ============================================================
   FONCTIONS UTILITAIRES UI
   ============================================================ */

// Tronquer un texte
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(' ', maxLength));
};

// Extraire l'ID YouTube d'une URL
export const extractYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Formater une date au format français
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
};

// Obtenir la couleur d'une catégorie
export const getCategoryColor = (category) => {
    const colors = {
        'Santé': '#10b981',
        'Conseil Municipal': '#3b82f6', 
        'Culture': '#8b5cf6',
        'Événement': '#ef4444',
        'Travaux': '#f59e0b',
        'default': 'var(--yene-green)'
    };
    return colors[category] || colors.default;
};