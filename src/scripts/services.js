/* ============================================================
   GESTION DES SERVICES ADMINISTRATIFS
   ============================================================ */

import { client } from './api.js';

export const fetchServices = async (category = 'all') => {
    const grid = document.getElementById('servicesGrid') || document.getElementById('services-container');
    if (!grid) return;

    grid.innerHTML = '<div class="text-center p-30"><i class="fas fa-spinner fa-spin fa-2x"></i> Chargement...</div>';

    try {
        const res = await client.getEntries({ 
            content_type: 'service', 
            order: 'fields.titre' 
        });

        if (!res.items || res.items.length === 0) {
            grid.innerHTML = "<p>Aucun service trouvé dans Contentful.</p>";
            return;
        }

        const filteredItems = category === 'all' 
            ? res.items 
            : res.items.filter(item => {
                const itemCat = item.fields?.categorie ? item.fields.categorie.toLowerCase() : "";
                return itemCat === category.toLowerCase();
            });

        if (filteredItems.length === 0) {
            grid.innerHTML = `<div class="glass p-30 text-center" style="grid-column: 1/-1"><p>Aucun service pour cette catégorie.</p></div>`;
            return;
        }

        grid.innerHTML = filteredItems.map((item, index) => {
            const s = item.fields;
            if (!s) return ''; // Sécurité

            let piecesHtml = "<li>Contactez la mairie.</li>";
            if (s.piecesAFournir) {
                const pieces = Array.isArray(s.piecesAFournir) ? s.piecesAFournir : [s.piecesAFournir];
                piecesHtml = pieces.map(p => `<li><i class="fas fa-check-circle"></i> ${p}</li>`).join('');
            }

            return `
            <div class="service-card glass animate-in" style="animation-delay: ${index * 100}ms">
                <div class="card-header-row">
                    <div class="card-icon"><i class="${s.icone || 'fas fa-file-invoice'}"></i></div>
                    <h3>${s.titre}</h3>
                </div>
                <p>${s.description || ''}</p>
                <div class="pieces-box">
                    <ul class="req-list">${piecesHtml}</ul>
                </div>
            </div>`;
        }).join('');

    } catch (error) {
        console.error("❌ Erreur critique:", error);
        grid.innerHTML = `<div class="glass p-30 text-center"><p>Erreur technique : Vérifiez la console.</p></div>`;
    }
};

// Initialiser les filtres
export const initServiceFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            fetchServices(category);
        });
    });
};
export const initServiceSearch = () => {
    const searchInput = document.getElementById('serviceFilter');
    // On récupère le container qui contient toutes les cartes
    const grid = document.getElementById('servicesGrid') || document.getElementById('services-container');
    
    if (!searchInput || !grid) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        // CORRECTION ICI : On cherche les CARTES (.service-card) et non la grille
        const cards = grid.querySelectorAll('.service-card');
        let hasResults = false;

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(term) || desc.includes(term)) {
                card.style.display = 'block'; // On affiche si ça correspond
                hasResults = true;
            } else {
                card.style.display = 'none'; // On cache si ça ne correspond pas
            }
        });

        // Gestion du message "Aucun résultat"
        let noResMsg = document.getElementById('no-search-results');

        if (!hasResults && term !== "") {
            if (!noResMsg) {
                noResMsg = document.createElement('div');
                noResMsg.id = 'no-search-results';
                noResMsg.className = 'glass p-30 text-center';
                noResMsg.style.gridColumn = '1/-1';
                noResMsg.innerHTML = `<i class="fas fa-search fa-2x mb-15"></i><p>Aucun service ne correspond à "<strong>${e.target.value}</strong>"</p>`;
                grid.appendChild(noResMsg);
            }
        } else if (noResMsg) {
            noResMsg.remove();
        }
    });
};