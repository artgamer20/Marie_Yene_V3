/* ============================================================
   CHARGEMENT DYNAMIQUE DU HEADER ET FOOTER (SÉCURISÉ)
   ============================================================ */

export const initHeader = () => {
    const header = document.getElementById('global-header');
    if (!header) return;
    
    // SÉCURITÉ : Si le header a déjà des enfants (déjà injecté), on arrête.
    if (header.children.length > 0) return;

    header.innerHTML = `
        <nav class="navbar glass">
            <div class="logo">
                <img src="/src/assets/log.webp" alt="Logo Mairie de Yene" onerror="this.src='https://via.placeholder.com/40'">
                <span>Mairie de <strong>Yene</strong></span>
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="/index.html" data-page="index">Accueil</a></li>
                <li><a href="/actualites.html" data-page="actualites">Actualités</a></li>
                <li><a href="/services.html" data-page="services">Démarches</a></li>
                <li><a href="/apropos.html" data-page="apropos">A Propos</a></li>
                <li><a href="/maire.html" data-page="maire">Le Maire</a></li>
                <li><a href="/villages.html" data-page="villages">Nos Villages</a></li>
                <li><a href="/contact.html" class="btn-contact" data-page="contact">Contact</a></li>
            </ul>
            <div class="header-tools">
                <div id="weatherWidget" class="weather-badge">
                    <i class="fas fa-cloud-sun"></i> <span id="weatherTemp">--°C</span>
                </div>
                <button id="themeToggle" class="theme-btn" aria-label="Thème"><i class="fas fa-moon"></i></button>
            </div>
            <button class="hamburger" id="hamBtn"><i class="fas fa-bars\"></i></button>
        </nav>`;
};

export const initFooter = () => {
    const footer = document.getElementById('global-footer');
    if (!footer) return;

    // SÉCURITÉ : Évite la duplication du footer
    if (footer.children.length > 0) return;

    footer.innerHTML = `
        <footer>
            <div class="container">
                <p>&copy; ${new Date().getFullYear()} Commune de Yene. Digitalisation par <a href="https://art-tech-officielle.vercel.app/" target="_blank" class="art-tech-link">ART TECH Studio</a>.</p>
            </div>
        </footer>`;
};

export const initActiveNav = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
};