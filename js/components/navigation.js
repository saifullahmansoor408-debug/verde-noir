/**
 * VERDE NOIR - Navigation Component (Rule of 3)
 * Three distinct variations with full functionality
 */

// ============================================
// NAVIGATION VARIATION 1: Mega Menu
// ============================================
async function renderNavigationV1(state) {
    const { siteConfig, pages } = state;
    const brandName = siteConfig?.brand?.name || 'VERDE NOIR';
    
    return `
        <div class="header-container header-v1">
            <div class="top-marquee">
                <div class="marquee-content">
                    <span>✨ Free Global Shipping on Orders Over $200</span>
                    <span>•</span>
                    <span>Easy 30-Day Returns</span>
                    <span>•</span>
                    <span>Exclusive Member Benefits</span>
                    <span>•</span>
                    <span>✨ Free Global Shipping on Orders Over $200</span>
                    <span>•</span>
                    <span>Easy 30-Day Returns</span>
                    <span>•</span>
                    <span>Exclusive Member Benefits</span>
                </div>
            </div>
            
            <nav class="main-navigation mega-menu">
                <div class="nav-left">
                    <a href="#home" class="logo-link">
                        <img src="${siteConfig?.brand?.logo_url}" alt="${brandName}" class="logo-image" />
                    </a>
                </div>
                
                <div class="nav-center">
                    <ul class="nav-menu">
                        <li class="nav-item has-dropdown">
                            <a href="#shop" class="nav-link">Shop</a>
                            <div class="mega-dropdown">
                                <div class="mega-dropdown-content">
                                    <div class="mega-column">
                                        <h4>Clothing</h4>
                                        <a href="#shop/dresses">Dresses</a>
                                        <a href="#shop/blazers">Blazers</a>
                                        <a href="#shop/tops">Tops</a>
                                        <a href="#shop/bottoms">Bottoms</a>
                                    </div>
                                    <div class="mega-column">
                                        <h4>Accessories</h4>
                                        <a href="#shop/bags">Bags</a>
                                        <a href="#shop/jewelry">Jewelry</a>
                                        <a href="#shop/scarves">Scarves</a>
                                        <a href="#shop/shoes">Shoes</a>
                                    </div>
                                    <div class="mega-column">
                                        <h4>Collections</h4>
                                        <a href="#shop/new-arrivals">New Arrivals</a>
                                        <a href="#shop/bestsellers">Bestsellers</a>
                                        <a href="#shop/sale">Sale</a>
                                    </div>
                                    <div class="mega-column featured">
                                        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" alt="Featured" />
                                        <p>Autumn Collection</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
                        <li class="nav-item"><a href="#about" class="nav-link">About</a></li>
                        <li class="nav-item"><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                </div>
                
                <div class="nav-right">
                    <button class="icon-btn" data-action="search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                    <button class="icon-btn" data-action="account">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                    <button class="icon-btn cart-btn" data-action="cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        <span class="cart-count">0</span>
                    </button>
                </div>
            </nav>
        </div>
        
        <style>
            .header-v1 { background: var(--color-primary-dark); }
            .top-marquee {
                background: var(--color-accent-neon);
                color: var(--color-primary-dark);
                padding: 0.5rem 0;
                overflow: hidden;
                font-size: 0.85rem;
                font-weight: 600;
            }
            .marquee-content {
                display: flex;
                gap: 2rem;
                animation: marquee 20s linear infinite;
                white-space: nowrap;
            }
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .main-navigation.mega-menu {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 2rem;
                background: rgba(4, 13, 9, 0.95);
                backdrop-filter: blur(10px);
                border-bottom: var(--glossy-border);
                position: sticky;
                top: 0;
                z-index: var(--z-sticky);
            }
            .logo-image { height: 35px; width: auto; }
            .nav-menu {
                display: flex;
                list-style: none;
                gap: 2rem;
                margin: 0;
                padding: 0;
            }
            .nav-link {
                color: var(--color-white);
                text-decoration: none;
                font-size: 0.95rem;
                letter-spacing: 0.5px;
                transition: color var(--transition-fast);
                padding: 0.5rem 0;
                position: relative;
            }
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--color-accent-neon);
                transition: width var(--transition-fast);
            }
            .nav-link:hover { color: var(--color-accent-neon); }
            .nav-link:hover::after { width: 100%; }
            .has-dropdown { position: relative; }
            .mega-dropdown {
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(10px);
                background: var(--color-secondary-green);
                border: var(--glossy-border);
                border-radius: 8px;
                padding: 2rem;
                min-width: 800px;
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition-medium);
                box-shadow: var(--glossy-shadow-outer);
            }
            .has-dropdown:hover .mega-dropdown {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(0);
            }
            .mega-dropdown-content {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
            }
            .mega-column h4 {
                color: var(--color-accent-neon);
                margin-bottom: 1rem;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .mega-column a {
                display: block;
                color: var(--color-off-white);
                text-decoration: none;
                padding: 0.5rem 0;
                transition: color var(--transition-fast);
            }
            .mega-column a:hover { color: var(--color-accent-neon); }
            .mega-column.featured img {
                width: 100%;
                border-radius: 8px;
                margin-bottom: 0.5rem;
            }
            .nav-right { display: flex; gap: 1rem; align-items: center; }
            .icon-btn {
                background: transparent;
                border: none;
                color: var(--color-white);
                cursor: pointer;
                padding: 0.5rem;
                transition: color var(--transition-fast);
                position: relative;
            }
            .icon-btn:hover { color: var(--color-accent-neon); }
            .cart-count {
                position: absolute;
                top: -5px;
                right: -5px;
                background: var(--color-accent-neon);
                color: var(--color-primary-dark);
                font-size: 0.7rem;
                font-weight: bold;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
    `;
}

// ============================================
// NAVIGATION VARIATION 2: Fullscreen Slide-out
// ============================================
async function renderNavigationV2(state) {
    const { siteConfig, pages } = state;
    const brandName = siteConfig?.brand?.name || 'VERDE NOIR';
    
    return `
        <div class="header-container header-v2">
            <nav class="minimal-navigation">
                <div class="nav-left">
                    <a href="#home" class="logo-link">
                        <img src="${siteConfig?.brand?.logo_url}" alt="${brandName}" class="logo-image" />
                    </a>
                </div>
                
                <div class="nav-right">
                    <button class="icon-btn" data-action="search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                    <button class="hamburger-btn" data-action="toggle-menu" aria-label="Menu">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </button>
                </div>
            </nav>
            
            <div class="fullscreen-menu-overlay" id="fullscreen-menu">
                <div class="fullscreen-menu-content">
                    <button class="close-menu-btn" data-action="toggle-menu" aria-label="Close Menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <ul class="fullscreen-nav-list">
                        <li><a href="#home" class="fullscreen-nav-link" data-action="close-menu">Home</a></li>
                        <li><a href="#shop" class="fullscreen-nav-link" data-action="close-menu">Shop</a></li>
                        <li><a href="#shop/new-arrivals" class="fullscreen-nav-link" data-action="close-menu">New Arrivals</a></li>
                        <li><a href="#shop/bestsellers" class="fullscreen-nav-link" data-action="close-menu">Bestsellers</a></li>
                        <li><a href="#shop/sale" class="fullscreen-nav-link" data-action="close-menu">Sale</a></li>
                        <li><a href="#about" class="fullscreen-nav-link" data-action="close-menu">About</a></li>
                        <li><a href="#contact" class="fullscreen-nav-link" data-action="close-menu">Contact</a></li>
                    </ul>
                    
                    <div class="menu-footer">
                        <div class="social-links">
                            <a href="#" class="social-link">Instagram</a>
                            <a href="#" class="social-link">Facebook</a>
                            <a href="#" class="social-link">Pinterest</a>
                        </div>
                        <p class="copyright">&copy; ${new Date().getFullYear()} ${brandName}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .header-v2 { background: transparent; }
            .minimal-navigation {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: var(--z-sticky);
                background: transparent;
                transition: background var(--transition-medium);
            }
            .minimal-navigation.scrolled {
                background: rgba(4, 13, 9, 0.95);
                backdrop-filter: blur(10px);
            }
            .logo-image { height: 40px; width: auto; }
            .nav-right { display: flex; gap: 1rem; align-items: center; }
            .icon-btn {
                background: transparent;
                border: none;
                color: var(--color-white);
                cursor: pointer;
                padding: 0.5rem;
            }
            .hamburger-btn {
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .hamburger-line {
                width: 25px;
                height: 2px;
                background: var(--color-white);
                transition: all var(--transition-fast);
            }
            .fullscreen-menu-overlay {
                position: fixed;
                top: 0;
                right: -100%;
                width: 100%;
                height: 100vh;
                background: var(--color-primary-dark);
                z-index: calc(var(--z-modal) - 1);
                transition: right var(--transition-slow);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .fullscreen-menu-overlay.active { right: 0; }
            .fullscreen-menu-content {
                text-align: center;
                padding: 2rem;
            }
            .close-menu-btn {
                position: absolute;
                top: 2rem;
                right: 2rem;
                background: transparent;
                border: none;
                color: var(--color-white);
                cursor: pointer;
                padding: 0.5rem;
            }
            .fullscreen-nav-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .fullscreen-nav-link {
                display: block;
                color: var(--color-white);
                text-decoration: none;
                font-size: 3rem;
                font-family: var(--font-display);
                padding: 1rem 0;
                transition: color var(--transition-fast);
            }
            .fullscreen-nav-link:hover { color: var(--color-accent-neon); }
            .menu-footer {
                margin-top: 4rem;
                color: var(--color-text-gray);
            }
            .social-links {
                display: flex;
                justify-content: center;
                gap: 2rem;
                margin-bottom: 1rem;
            }
            .social-link {
                color: var(--color-off-white);
                text-decoration: none;
                transition: color var(--transition-fast);
            }
            .social-link:hover { color: var(--color-accent-neon); }
        </style>
        
        <script>
            // Toggle fullscreen menu
            document.addEventListener('click', (e) => {
                if (e.target.closest('[data-action="toggle-menu"]')) {
                    const menu = document.getElementById('fullscreen-menu');
                    menu.classList.toggle('active');
                }
                if (e.target.closest('[data-action="close-menu"]')) {
                    document.getElementById('fullscreen-menu').classList.remove('active');
                }
            });
            
            // Add scroll effect
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('.minimal-navigation');
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        </script>
    `;
}

// ============================================
// NAVIGATION VARIATION 3: Sticky Marquee
// ============================================
async function renderNavigationV3(state) {
    const { siteConfig, pages } = state;
    const brandName = siteConfig?.brand?.name || 'VERDE NOIR';
    
    return `
        <div class="header-container header-v3">
            <div class="sticky-marquee-bar">
                <div class="marquee-track">
                    <span class="marquee-item">🚚 Free Global Shipping</span>
                    <span class="marquee-divider">|</span>
                    <span class="marquee-item">💎 Premium Quality</span>
                    <span class="marquee-divider">|</span>
                    <span class="marquee-item">↩️ Easy Returns</span>
                    <span class="marquee-divider">|</span>
                    <span class="marquee-item">🌿 Sustainable Fashion</span>
                    <span class="marquee-divider">|</span>
                    <span class="marquee-item">🚚 Free Global Shipping</span>
                    <span class="marquee-divider">|</span>
                    <span class="marquee-item">💎 Premium Quality</span>
                    <span class="marquee-divider">|</span>
                    <span class="marquee-item">↩️ Easy Returns</span>
                    <span class="marquee-divider">|</span>
                    <span class="marquee-item">🌿 Sustainable Fashion</span>
                </div>
            </div>
            
            <nav class="clean-navigation">
                <div class="nav-wrapper">
                    <a href="#home" class="logo-link">
                        <img src="${siteConfig?.brand?.logo_url}" alt="${brandName}" class="logo-image" />
                    </a>
                    
                    <ul class="simple-nav-menu">
                        <li><a href="#shop" class="simple-nav-link">Shop</a></li>
                        <li><a href="#home" class="simple-nav-link">Home</a></li>
                        <li><a href="#about" class="simple-nav-link">About</a></li>
                        <li><a href="#contact" class="simple-nav-link">Contact</a></li>
                    </ul>
                    
                    <div class="nav-actions">
                        <button class="icon-btn" data-action="search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                        <button class="icon-btn cart-btn" data-action="cart">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <span class="cart-count">0</span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
        
        <style>
            .header-v3 { background: transparent; }
            .sticky-marquee-bar {
                position: sticky;
                top: 0;
                background: var(--color-accent-neon);
                color: var(--color-primary-dark);
                padding: 0.6rem 0;
                overflow: hidden;
                z-index: var(--z-sticky);
            }
            .marquee-track {
                display: flex;
                gap: 3rem;
                animation: marquee-reverse 25s linear infinite;
                white-space: nowrap;
                font-size: 0.8rem;
                font-weight: 600;
                letter-spacing: 0.5px;
            }
            @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
            }
            .marquee-divider { color: rgba(4, 13, 9, 0.5); }
            .clean-navigation {
                background: var(--color-white);
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                position: sticky;
                top: 40px;
                z-index: calc(var(--z-sticky) - 1);
            }
            .nav-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 2rem;
                max-width: 1400px;
                margin: 0 auto;
            }
            .logo-image { height: 32px; width: auto; filter: brightness(0); }
            .simple-nav-menu {
                display: flex;
                list-style: none;
                gap: 2.5rem;
                margin: 0;
                padding: 0;
            }
            .simple-nav-link {
                color: var(--color-primary-dark);
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 500;
                letter-spacing: 1px;
                text-transform: uppercase;
                transition: color var(--transition-fast);
            }
            .simple-nav-link:hover { color: var(--color-secondary-green); }
            .nav-actions { display: flex; gap: 1rem; align-items: center; }
            .icon-btn {
                background: transparent;
                border: none;
                color: var(--color-primary-dark);
                cursor: pointer;
                padding: 0.5rem;
                transition: color var(--transition-fast);
            }
            .icon-btn:hover { color: var(--color-secondary-green); }
            .cart-count {
                position: absolute;
                top: -5px;
                right: -5px;
                background: var(--color-accent-neon);
                color: var(--color-primary-dark);
                font-size: 0.7rem;
                font-weight: bold;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
    `;
}

// Register navigation component with Engine
if (typeof Engine !== 'undefined') {
    Engine.registerComponent('navigation', 1, renderNavigationV1);
    Engine.registerComponent('navigation', 2, renderNavigationV2);
    Engine.registerComponent('navigation', 3, renderNavigationV3);
    console.log('✅ Navigation component registered (3 variations)');
}
