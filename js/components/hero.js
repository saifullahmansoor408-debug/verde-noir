/**
 * VERDE NOIR - Hero Component (Rule of 3)
 * Three distinct variations with full functionality
 */

// ============================================
// HERO VARIATION 1: Interactive Lookbook
// ============================================
async function renderHeroV1(state) {
    const { content } = state.section;
    const { title, subtitle, image, hotspots = [] } = content;
    
    const hotspotHTML = hotspots.map((spot, index) => `
        <div class="lookbook-hotspot" 
             style="left: ${spot.x}%; top: ${spot.y}%;" 
             data-product-id="${spot.product_id}"
             data-product-name="${spot.product_name}"
             data-price="${spot.price}"
             tabindex="0">
            <div class="hotspot-dot"></div>
            <div class="hotspot-tooltip">
                <span class="tooltip-product">${spot.product_name}</span>
                <span class="tooltip-price">${spot.price}</span>
            </div>
        </div>
    `).join('');
    
    return `
        <section class="hero-section hero-v1">
            <div class="hero-background" style="background-image: url('${image || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80'}');"></div>
            <div class="hero-overlay"></div>
            
            <div class="hero-content hero-content-v1">
                <h1 class="hero-title">${title || 'Discover Luxury'}</h1>
                <p class="hero-subtitle">${subtitle || 'Elevate Your Style'}</p>
            </div>
            
            <div class="hotspots-container">
                ${hotspotHTML}
            </div>
            
            <div class="scroll-indicator">
                <span>Explore</span>
                <div class="scroll-arrow"></div>
            </div>
        </section>
        
        <style>
            .hero-v1 {
                position: relative;
                height: 100vh;
                min-height: 600px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .hero-background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                z-index: 0;
            }
            .hero-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(4, 13, 9, 0.7) 0%, rgba(10, 38, 24, 0.5) 50%, rgba(4, 13, 9, 0.6) 100%);
                z-index: 1;
            }
            .hero-content-v1 {
                position: relative;
                z-index: 2;
                text-align: center;
                color: var(--color-white);
                max-width: 800px;
                padding: 2rem;
            }
            .hero-title {
                font-family: var(--font-display);
                font-size: clamp(3rem, 8vw, 6rem);
                font-weight: 700;
                letter-spacing: 2px;
                margin-bottom: 1rem;
                text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                animation: fadeInUp 1s ease-out;
            }
            .hero-subtitle {
                font-size: clamp(1.2rem, 3vw, 1.8rem);
                font-weight: 300;
                letter-spacing: 4px;
                color: var(--color-accent-neon);
                text-transform: uppercase;
                animation: fadeInUp 1s ease-out 0.3s backwards;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .hotspots-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3;
                pointer-events: none;
            }
            .lookbook-hotspot {
                position: absolute;
                pointer-events: auto;
                cursor: pointer;
                animation: pulse 2s ease-in-out infinite;
            }
            .hotspot-dot {
                width: 20px;
                height: 20px;
                background: var(--color-accent-neon);
                border-radius: 50%;
                box-shadow: 0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 255, 136, 0.4);
                transition: transform var(--transition-fast);
            }
            .lookbook-hotspot:hover .hotspot-dot {
                transform: scale(1.3);
            }
            .hotspot-tooltip {
                position: absolute;
                bottom: 35px;
                left: 50%;
                transform: translateX(-50%) translateY(10px);
                background: rgba(4, 13, 9, 0.95);
                backdrop-filter: blur(10px);
                border: var(--glossy-border);
                border-radius: 8px;
                padding: 0.8rem 1.2rem;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition-fast);
                box-shadow: var(--glossy-shadow-outer);
            }
            .lookbook-hotspot:hover .hotspot-tooltip,
            .lookbook-hotspot:focus .hotspot-tooltip {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(0);
            }
            .tooltip-product {
                display: block;
                color: var(--color-white);
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 0.3rem;
            }
            .tooltip-price {
                display: block;
                color: var(--color-accent-neon);
                font-size: 0.85rem;
                font-weight: 700;
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
            }
            .scroll-indicator {
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 3;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                color: var(--color-off-white);
                font-size: 0.8rem;
                letter-spacing: 2px;
                text-transform: uppercase;
                animation: bounce 2s ease-in-out infinite;
            }
            .scroll-arrow {
                width: 20px;
                height: 20px;
                border-right: 2px solid var(--color-accent-neon);
                border-bottom: 2px solid var(--color-accent-neon);
                transform: rotate(45deg);
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
                40% { transform: translateX(-50%) translateY(-10px); }
                60% { transform: translateX(-50%) translateY(-5px); }
            }
        </style>
    `;
}

// ============================================
// HERO VARIATION 2: Cinematic Carousel
// ============================================
async function renderHeroV2(state) {
    const { content } = state.section;
    const { title, subtitle, images = [], cta_text, cta_link } = content;
    
    const slidesHTML = images.map((img, index) => `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${img}');">
            <div class="slide-overlay"></div>
        </div>
    `).join('');
    
    const indicatorsHTML = images.map((_, index) => `
        <button class="carousel-indicator ${index === 0 ? 'active' : ''}" 
                data-slide="${index}" 
                aria-label="Go to slide ${index + 1}"></button>
    `).join('');
    
    return `
        <section class="hero-section hero-v2">
            <div class="carousel-container">
                ${slidesHTML}
            </div>
            
            <div class="hero-content hero-content-v2">
                <h1 class="hero-title cinematic-title">${title || 'Autumn Collection'}</h1>
                <p class="hero-subtitle cinematic-subtitle">${subtitle || 'Redefining Elegance'}</p>
                ${cta_text ? `
                    <a href="${cta_link || '#shop'}" class="hero-cta-btn glossy-btn">
                        ${cta_text}
                    </a>
                ` : ''}
            </div>
            
            <div class="carousel-controls">
                <button class="carousel-nav prev" aria-label="Previous slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div class="carousel-indicators">
                    ${indicatorsHTML}
                </div>
                <button class="carousel-nav next" aria-label="Next slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </section>
        
        <style>
            .hero-v2 {
                position: relative;
                height: 100vh;
                min-height: 600px;
                overflow: hidden;
            }
            .carousel-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .carousel-slide {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                opacity: 0;
                transition: opacity 1.5s ease-in-out;
            }
            .carousel-slide.active { opacity: 1; }
            .slide-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(4, 13, 9, 0.6) 0%, rgba(10, 38, 24, 0.4) 50%, rgba(4, 13, 9, 0.5) 100%);
            }
            .hero-content-v2 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
                text-align: center;
                color: var(--color-white);
                max-width: 900px;
                padding: 2rem;
            }
            .cinematic-title {
                font-family: var(--font-display);
                font-size: clamp(3.5rem, 10vw, 7rem);
                font-weight: 700;
                letter-spacing: 4px;
                margin-bottom: 1rem;
                text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
                animation: titleFade 1.5s ease-out;
            }
            .cinematic-subtitle {
                font-size: clamp(1rem, 2.5vw, 1.5rem);
                font-weight: 300;
                letter-spacing: 6px;
                color: var(--color-off-white);
                text-transform: uppercase;
                margin-bottom: 2rem;
                animation: subtitleFade 1.5s ease-out 0.3s backwards;
            }
            @keyframes titleFade {
                from { opacity: 0; letter-spacing: 8px; }
                to { opacity: 1; letter-spacing: 4px; }
            }
            @keyframes subtitleFade {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .hero-cta-btn.glossy-btn {
                display: inline-block;
                background: linear-gradient(135deg, var(--color-accent-neon) 0%, #00cc6a 100%);
                color: var(--color-primary-dark);
                padding: 1rem 3rem;
                font-size: 1rem;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                text-decoration: none;
                border-radius: 50px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.3);
                transition: all var(--transition-medium);
                animation: buttonGlow 2s ease-in-out infinite;
            }
            .hero-cta-btn.glossy-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 30px rgba(0, 255, 136, 0.6), inset 0 2px 10px rgba(255, 255, 255, 0.5);
            }
            @keyframes buttonGlow {
                0%, 100% { box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.3); }
                50% { box-shadow: 0 4px 25px rgba(0, 255, 136, 0.6), inset 0 2px 15px rgba(255, 255, 255, 0.5); }
            }
            .carousel-controls {
                position: absolute;
                bottom: 3rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 3;
                display: flex;
                align-items: center;
                gap: 2rem;
            }
            .carousel-nav {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: var(--glossy-border);
                color: var(--color-white);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            .carousel-nav:hover {
                background: var(--color-accent-neon);
                color: var(--color-primary-dark);
                transform: scale(1.1);
            }
            .carousel-indicators {
                display: flex;
                gap: 0.8rem;
            }
            .carousel-indicator {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                border: 2px solid transparent;
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            .carousel-indicator.active {
                background: var(--color-accent-neon);
                border-color: var(--color-white);
                transform: scale(1.2);
            }
            .carousel-indicator:hover {
                background: rgba(0, 255, 136, 0.6);
            }
        </style>
        
        <script>
            (function() {
                const section = document.querySelector('.hero-v2');
                if (!section) return;
                
                const slides = section.querySelectorAll('.carousel-slide');
                const indicators = section.querySelectorAll('.carousel-indicator');
                const prevBtn = section.querySelector('.carousel-nav.prev');
                const nextBtn = section.querySelector('.carousel-nav.next');
                
                let currentSlide = 0;
                let autoPlayInterval;
                
                function goToSlide(index) {
                    slides[currentSlide].classList.remove('active');
                    indicators[currentSlide].classList.remove('active');
                    
                    currentSlide = (index + slides.length) % slides.length;
                    
                    slides[currentSlide].classList.add('active');
                    indicators[currentSlide].classList.add('active');
                }
                
                function nextSlide() {
                    goToSlide(currentSlide + 1);
                }
                
                function startAutoPlay() {
                    autoPlayInterval = setInterval(nextSlide, 5000);
                }
                
                function stopAutoPlay() {
                    clearInterval(autoPlayInterval);
                }
                
                // Event listeners
                nextBtn.addEventListener('click', () => {
                    nextSlide();
                    stopAutoPlay();
                    startAutoPlay();
                });
                
                prevBtn.addEventListener('click', () => {
                    goToSlide(currentSlide - 1);
                    stopAutoPlay();
                    startAutoPlay();
                });
                
                indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        goToSlide(index);
                        stopAutoPlay();
                        startAutoPlay();
                    });
                });
                
                // Start autoplay
                startAutoPlay();
                
                // Pause on hover
                section.addEventListener('mouseenter', stopAutoPlay);
                section.addEventListener('mouseleave', startAutoPlay);
            })();
        </script>
    `;
}

// ============================================
// HERO VARIATION 3: Bold Sale Banner
// ============================================
async function renderHeroV3(state) {
    const { content } = state.section;
    const { title, subtitle, countdown_end, cta_text, cta_link } = content;
    
    return `
        <section class="hero-section hero-v3">
            <div class="sale-background-pattern"></div>
            
            <div class="hero-content hero-content-v3">
                <div class="sale-badge">LIMITED TIME OFFER</div>
                <h1 class="hero-title sale-title">${title || 'MEGA SALE'}</h1>
                <p class="hero-subtitle sale-subtitle">${subtitle || 'Up to 50% Off Selected Items'}</p>
                
                <div class="countdown-container" id="countdown-timer">
                    <div class="countdown-item">
                        <span class="countdown-value" id="days">00</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-separator">:</div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="hours">00</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-separator">:</div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="minutes">00</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-separator">:</div>
                    <div class="countdown-item">
                        <span class="countdown-value" id="seconds">00</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                </div>
                
                ${cta_text ? `
                    <a href="${cta_link || '#shop'}" class="hero-cta-btn sale-cta-btn">
                        <span class="btn-text">${cta_text}</span>
                        <span class="btn-glow"></span>
                    </a>
                ` : ''}
            </div>
            
            <div class="glossy-accent-left"></div>
            <div class="glossy-accent-right"></div>
        </section>
        
        <style>
            .hero-v3 {
                position: relative;
                height: 100vh;
                min-height: 600px;
                overflow: hidden;
                background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary-green) 50%, var(--color-primary-dark) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .sale-background-pattern {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(circle at 20% 30%, rgba(0, 255, 136, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(0, 255, 136, 0.05) 0%, transparent 50%);
                z-index: 0;
            }
            .glossy-accent-left,
            .glossy-accent-right {
                position: absolute;
                top: 0;
                width: 30%;
                height: 100%;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%);
                z-index: 1;
            }
            .glossy-accent-left { left: 0; }
            .glossy-accent-right { right: 0; background: linear-gradient(-90deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%); }
            .hero-content-v3 {
                position: relative;
                z-index: 2;
                text-align: center;
                color: var(--color-white);
                max-width: 900px;
                padding: 3rem 2rem;
            }
            .sale-badge {
                display: inline-block;
                background: var(--color-accent-neon);
                color: var(--color-primary-dark);
                padding: 0.5rem 1.5rem;
                font-size: 0.85rem;
                font-weight: 800;
                letter-spacing: 3px;
                text-transform: uppercase;
                border-radius: 50px;
                margin-bottom: 2rem;
                animation: badgePulse 2s ease-in-out infinite;
            }
            @keyframes badgePulse {
                0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(0, 255, 136, 0.4); }
                50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(0, 255, 136, 0.6); }
            }
            .sale-title {
                font-family: var(--font-display);
                font-size: clamp(4rem, 12vw, 10rem);
                font-weight: 900;
                letter-spacing: 8px;
                line-height: 1;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, var(--color-white) 0%, var(--color-off-white) 50%, var(--color-accent-neon) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: none;
                filter: drop-shadow(0 4px 20px rgba(0, 255, 136, 0.3));
            }
            .sale-subtitle {
                font-size: clamp(1.2rem, 3vw, 2rem);
                font-weight: 400;
                letter-spacing: 4px;
                color: var(--color-off-white);
                margin-bottom: 3rem;
            }
            .countdown-container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                margin-bottom: 3rem;
                flex-wrap: wrap;
            }
            .countdown-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(10px);
                border: var(--glossy-border);
                border-radius: 12px;
                padding: 1rem 1.5rem;
                min-width: 80px;
                box-shadow: var(--glossy-shadow-inner);
            }
            .countdown-value {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--color-accent-neon);
                font-family: var(--font-mono);
                line-height: 1;
            }
            .countdown-label {
                font-size: 0.75rem;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: var(--color-text-gray);
                margin-top: 0.5rem;
            }
            .countdown-separator {
                font-size: 2rem;
                color: var(--color-accent-neon);
                font-weight: 300;
                margin-top: -1rem;
            }
            .sale-cta-btn {
                position: relative;
                display: inline-block;
                background: linear-gradient(135deg, var(--color-accent-neon) 0%, #00cc6a 100%);
                color: var(--color-primary-dark);
                padding: 1.2rem 4rem;
                font-size: 1.1rem;
                font-weight: 800;
                letter-spacing: 3px;
                text-transform: uppercase;
                text-decoration: none;
                border-radius: 60px;
                border: 2px solid rgba(255, 255, 255, 0.4);
                box-shadow: 0 6px 30px rgba(0, 255, 136, 0.5), inset 0 2px 15px rgba(255, 255, 255, 0.4);
                transition: all var(--transition-medium);
                overflow: hidden;
                animation: ctaPulse 1.5s ease-in-out infinite;
            }
            .sale-cta-btn:hover {
                transform: translateY(-5px) scale(1.02);
                box-shadow: 0 10px 40px rgba(0, 255, 136, 0.7), inset 0 2px 20px rgba(255, 255, 255, 0.6);
            }
            .btn-glow {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 150%;
                height: 150%;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.6s ease-out;
            }
            .sale-cta-btn:hover .btn-glow {
                transform: translate(-50%, -50%) scale(1);
            }
            @keyframes ctaPulse {
                0%, 100% { box-shadow: 0 6px 30px rgba(0, 255, 136, 0.5), inset 0 2px 15px rgba(255, 255, 255, 0.4); }
                50% { box-shadow: 0 6px 35px rgba(0, 255, 136, 0.7), inset 0 2px 20px rgba(255, 255, 255, 0.6); }
            }
        </style>
        
        <script>
            (function() {
                const endDate = '${countdown_end || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}';
                const targetDate = new Date(endDate).getTime();
                
                function updateCountdown() {
                    const now = new Date().getTime();
                    const distance = targetDate - now;
                    
                    if (distance < 0) {
                        document.getElementById('days').textContent = '00';
                        document.getElementById('hours').textContent = '00';
                        document.getElementById('minutes').textContent = '00';
                        document.getElementById('seconds').textContent = '00';
                        return;
                    }
                    
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    
                    document.getElementById('days').textContent = String(days).padStart(2, '0');
                    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
                    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
                    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
                }
                
                updateCountdown();
                setInterval(updateCountdown, 1000);
            })();
        </script>
    `;
}

// Register hero component with Engine
if (typeof Engine !== 'undefined') {
    Engine.registerComponent('hero', 1, renderHeroV1);
    Engine.registerComponent('hero', 2, renderHeroV2);
    Engine.registerComponent('hero', 3, renderHeroV3);
    console.log('✅ Hero component registered (3 variations)');
}
