/* ============================================================
   MODAL YOUTUBE
   ============================================================ */

export const initYouTubeModal = () => {
    // Créer la modal si elle n'existe pas
    let modal = document.getElementById('youtube-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'youtube-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 999999;
            display: none;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div class="modal-container">
                <button class="close-modal" aria-label="Fermer">
                    <i class="fas fa-times"></i>
                </button>
                <div class="video-wrapper">
                    <iframe id="youtube-iframe" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <h3 id="video-title"></h3>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Style CSS
        const style = document.createElement('style');
        style.textContent = `
            .modal-container {
                position: relative;
                animation: modalSlideIn 0.3s ease;
                width: 90%;
                max-width: 1000px;
            }
            .close-modal {
                position: absolute;
                top: -45px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                z-index: 10;
                transition: color 0.3s;
            }
            .close-modal:hover {
                color: var(--yene-red);
            }
            .video-wrapper {
                position: relative;
                padding-bottom: 56.25%;
                height: 0;
                overflow: hidden;
                border-radius: 8px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            }
            #youtube-iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 8px;
            }
            #video-title {
                color: white;
                margin-top: 20px;
                padding: 0 15px;
                font-size: 1.3rem;
                text-align: center;
            }
            @keyframes modalSlideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Événements
        modal.querySelector('.close-modal').addEventListener('click', () => closeYouTubeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeYouTubeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeYouTubeModal();
        });
    }
    
    // Fonction globale
    window.openYouTubeModal = (videoId, title) => {
        const modal = document.getElementById('youtube-modal');
        const iframe = modal.querySelector('#youtube-iframe');
        const titleEl = modal.querySelector('#video-title');
        
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        titleEl.textContent = title;
        
        modal.style.display = 'flex';
        setTimeout(() => modal.style.opacity = '1', 10);
    };
};

const closeYouTubeModal = () => {
    const modal = document.getElementById('youtube-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            const iframe = modal.querySelector('#youtube-iframe');
            iframe.src = '';
        }, 300);
    }
};