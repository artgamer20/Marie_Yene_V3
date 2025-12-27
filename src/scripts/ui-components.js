/* ============================================================
   COMPOSANTS UI GÉNÉRAUX
   ============================================================ */

// Gestion du thème
export const initTheme = () => {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
};

// Animation des statistiques
export const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent.replace(/\D/g,''));
                let count = 0;
                const timer = setInterval(() => {
                    count += Math.ceil(target / 50);
                    if (count >= target) {
                        el.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else el.textContent = count.toLocaleString();
                }, 30);
                observer.unobserve(el);
            }
        });
    });
    stats.forEach(s => observer.observe(s));
};

// Menu mobile
export const initMobileMenu = () => {
    const ham = document.getElementById('hamBtn');
    const nav = document.getElementById('navLinks');
    if (ham && nav) {
        ham.addEventListener('click', () => nav.classList.toggle('nav-active'));
    }
};

// Bouton "retour en haut"
export const initScrollToTop = () => {
    const btn = document.createElement('button');
    btn.innerHTML = "↑";
    btn.className = "scroll-top-btn";
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Gestion des descriptions dépliables (actualités)
const openCard = (article, button) => {
    const shortDesc = article.querySelector('.description-short');
    const fullDesc = article.querySelector('.description-full');
    const toggleText = button.querySelector('.toggle-text');
    const toggleIcon = button.querySelector('.toggle-icon');
    
    shortDesc.style.display = 'none';
    fullDesc.style.display = 'block';
    
    toggleText.textContent = 'Voir moins';
    toggleIcon.className = 'fas fa-chevron-up toggle-icon';
    button.setAttribute('data-expanded', 'true');
    
    article.classList.remove('news-card-compact');
    article.classList.add('news-card-expanded');
    
    article.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

const closeCard = (article, button = null) => {
    const shortDesc = article.querySelector('.description-short');
    const fullDesc = article.querySelector('.description-full');
    
    shortDesc.style.display = 'block';
    fullDesc.style.display = 'none';
    
    if (button) {
        const toggleText = button.querySelector('.toggle-text');
        const toggleIcon = button.querySelector('.toggle-icon');
        
        toggleText.textContent = 'Lire la suite';
        toggleIcon.className = 'fas fa-chevron-down toggle-icon';
        button.setAttribute('data-expanded', 'false');
    }
    
    article.classList.remove('news-card-expanded');
    article.classList.add('news-card-compact');
};

// Fonction globale pour basculer une description
window.toggleSingleDescription = (index, button) => {
    const article = document.getElementById(`article-${index}`);
    const isExpanded = button.getAttribute('data-expanded') === 'true';
    
    // Ferme toutes les autres cartes ouvertes
    document.querySelectorAll('.news-card-expanded').forEach(card => {
        if (card !== article && card.classList.contains('news-card-expanded')) {
            closeCard(card);
        }
    });
    
    if (!isExpanded) {
        openCard(article, button);
    } else {
        closeCard(article, button);
    }
};

// Fermer les cartes en cliquant ailleurs
document.addEventListener('click', (e) => {
    if (!e.target.closest('.read-more-toggle') && !e.target.closest('.news-card-expanded')) {
        document.querySelectorAll('.news-card-expanded').forEach(card => {
            const button = card.querySelector('.read-more-toggle');
            if (button) closeCard(card, button);
        });
    }
});