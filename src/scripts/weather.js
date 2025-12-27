/* ============================================================
   WIDGET MÉTÉO
   ============================================================ */

import { CONFIG } from './api.js';

export const initWeather = async () => {
    const el = document.getElementById('weatherTemp');
    if (!el) return;
    
    try {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${CONFIG.coordsYene[0]}&longitude=${CONFIG.coordsYene[1]}&current_weather=true`
        );
        const data = await res.json();
        el.textContent = `${Math.round(data.current_weather.temperature)}°C`;
    } catch (e) { 
        el.textContent = "28°C";
    }
};