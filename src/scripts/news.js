/* ============================================================
   GESTION DES ACTUALITÉS
   ============================================================ */

import { client } from './api.js';
import { truncateText, extractYouTubeId, formatDate, getCategoryColor } from './ui-helpers.js';

let youtubeModal = null;

// Récupérer les actualités
export const fetchNews = async (filterType = 'all') => {
    const container = document.getElementById('news-container-full') || document.getElementById('news-container-home');
    if (!container) return;

    try {
        const query = { content_type: 'actualite', order: '-sys.createdAt' };
        const res = await client.getEntries(query);
        
        let items = res.items;
        
        // Filtrage côté client
        if (filterType !== 'all') {
            items = items.filter(item => {
                const category = item.fields.categorie?.toLowerCase() || '';
                return category.includes(filterType.toLowerCase());
            });
        }

        // Aucun résultat
        if (items.length === 0) {
            container.innerHTML = `
                <div class="no-results" style="text-align:center; padding:60px; color:var(--gray);">
                    <i class="fas fa-newspaper" style="font-size:3rem; margin-bottom:20px; opacity:0.5;"></i>
                    <h3 style="margin-bottom:10px;">Aucune actualité dans cette catégorie</h3>
                    <p>Essayez une autre catégorie ou revenez plus tard.</p>
                </div>
            `;
            return;
        }

        // Générer le HTML
        container.innerHTML = items.map((item, index) => {
            const fields = item.fields;
            const hasYoutube = fields.youtubeUrl && fields.youtubeUrl.includes('youtube.com');
            const youtubeId = hasYoutube ? extractYouTubeId(fields.youtubeUrl) : null;
            const fullDescription = fields.description || fields.extrait || '';
            const shortDescription = truncateText(fullDescription, 150);
            
            return `
                <article class="news-card glass news-card-compact" data-id="${item.sys.id}" id="article-${index}" data-category="${fields.categorie?.toLowerCase() || ''}">
                    <div class="news-media-wrapper" 
                         ${hasYoutube ? `onclick="openYouTubeModal('${youtubeId}', '${fields.titre.replace(/'/g, "\\'")}')"` : ''}>
                        
                        ${hasYoutube ? `
                            <div class="news-img youtube-thumbnail">
                                <div class="youtube-play-btn">
                                    <i class="fas fa-play"></i>
                                </div>
                                <div class="video-duration">
                                    <i class="fas fa-video"></i> Vidéo
                                </div>
                            </div>
                            <style>
                                #article-${index} .youtube-thumbnail {
                                    background-image: url('https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg');
                                }
                            </style>
                        ` : `
                            <div class="news-img" style="background-image: url('https:${fields.image?.fields.file.url || '//via.placeholder.com/300x200?text=Yene'}')">
                                ${fields.categorie ? `<span class="news-date">${fields.categorie}</span>` : ''}
                            </div>
                        `}
                    </div>
                    
                    <div class="news-content p-30">
                        <div class="meta-info">
                            <span class="badge category-badge" style="background-color: ${getCategoryColor(fields.categorie)};">
                                ${fields.categorie || 'Actualité'}
                            </span>
                            <small>
                                <i class="far fa-calendar"></i> ${formatDate(fields.datePublication || item.sys.createdAt)}
                            </small>
                        </div>
                        
                        <h3>${fields.titre}</h3>
                        
                        <div class="description-wrapper">
                            <div class="description-container">
                                <p class="description-text description-short">
                                    ${shortDescription}
                                    ${fullDescription.length > 150 ? '...' : ''}
                                </p>
                                <div class="description-text description-full" style="display:none;">
                                    ${fullDescription}
                                </div>
                            </div>
                            
                            ${fullDescription.length > 150 ? `
                                <button class="read-more-toggle" onclick="toggleSingleDescription(${index}, this)" 
                                        data-expanded="false">
                                    <span class="toggle-text">Lire la suite</span>
                                    <i class="fas fa-chevron-down toggle-icon"></i>
                                </button>
                            ` : ''}
                        </div>
                        
                        ${hasYoutube ? `
                            <button class="watch-video-btn" 
                                onclick="openYouTubeModal('${youtubeId}', '${fields.titre.replace(/'/g, "\\'")}')">
                                <i class="fab fa-youtube"></i> Regarder la vidéo
                            </button>
                        ` : ''}
                    </div>
                </article>
            `;
        }).join('');

    } catch (e) { 
        console.error("Erreur lors du chargement des actualités:", e);
        container.innerHTML = "<p class='error-message'>Erreur de chargement des actualités.</p>";
    }
};

// Initialiser les filtres
export const initNewsFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach((btn, index) => {
        if (!btn.hasAttribute('data-filter')) {
            const text = btn.textContent.trim();
            if (text === 'Tout') btn.setAttribute('data-filter', 'all');
            else if (text === 'Santé') btn.setAttribute('data-filter', 'santé');
            else if (text === 'Conseil Municipal') btn.setAttribute('data-filter', 'conseil');
            else if (text === 'Culture') btn.setAttribute('data-filter', 'culture');
            else btn.setAttribute('data-filter', text.toLowerCase());
        }
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            fetchNews(filter);
        });
    });
};