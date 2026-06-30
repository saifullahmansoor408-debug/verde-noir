/**
 * VERDE NOIR - Rendering Engine
 * Modular component-based rendering system with Pub/Sub pattern
 * Implements the "Rule of 3" for all components
 */

const Engine = {
    // Component Registry - Maps component type + variation to render function
    registry: {},
    
    // Current application state
    state: {
        siteConfig: null,
        currentPage: null,
        pages: [],
        products: []
    },
    
    // Event subscribers
    subscribers: new Map(),
    
    /**
     * Initialize the engine
     */
    async init() {
        console.log('🎨 VERDE NOIR Engine initializing...');
        
        // Load initial data
        await this.loadState();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Register all component renderers
        this.registerComponents();
        
        // Render the current page
        await this.renderCurrentPage();
        
        console.log('✅ Engine initialized successfully');
    },
    
    /**
     * Load all state from API
     */
    async loadState() {
        try {
            this.state.siteConfig = await API.getSiteConfig();
            this.state.pages = await API.getPages();
            this.state.products = await API.getProducts();
            
            // Determine current page from URL or default to home
            const pageId = this.getCurrentPageId();
            this.state.currentPage = this.state.pages.find(p => p.id === pageId) || this.state.pages[0];
        } catch (error) {
            console.error('Failed to load state:', error);
        }
    },
    
    /**
     * Get current page ID from URL hash or query param
     */
    getCurrentPageId() {
        const hash = window.location.hash.replace('#', '');
        const params = new URLSearchParams(window.location.search);
        return hash || params.get('page') || 'home';
    },
    
    /**
     * Set up global event listeners
     */
    setupEventListeners() {
        // Listen for state changes from Admin panel
        window.addEventListener('stateChange', (e) => this.handleStateChange(e));
        
        // Handle hash changes for navigation
        window.addEventListener('hashchange', () => this.handleNavigation());
        
        // Popstate for browser back/forward
        window.addEventListener('popstate', () => this.handleNavigation());
        
        // Global event delegation on app root
        const appRoot = document.getElementById('app-root');
        if (appRoot) {
            appRoot.addEventListener('click', (e) => this.handleGlobalClick(e));
            appRoot.addEventListener('mouseover', (e) => this.handleGlobalHover(e));
        }
    },
    
    /**
     * Handle state change events
     */
    handleStateChange(event) {
        const { type, data } = event.detail;
        console.log(`📡 State change detected: ${type}`);
        
        switch (type) {
            case 'site_config':
                this.state.siteConfig = data;
                break;
            case 'pages':
                this.state.pages = data;
                this.state.currentPage = data.find(p => p.id === this.state.currentPage?.id) || this.state.currentPage;
                break;
            case 'products':
                this.state.products = data;
                break;
            case 'reset':
                this.loadState().then(() => this.renderCurrentPage());
                return;
        }
        
        // Re-render current page
        this.renderCurrentPage();
    },
    
    /**
     * Handle navigation
     */
    async handleNavigation() {
        const pageId = this.getCurrentPageId();
        const newPage = this.state.pages.find(p => p.id === pageId);
        
        if (newPage && newPage !== this.state.currentPage) {
            this.state.currentPage = newPage;
            await this.renderCurrentPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    /**
     * Handle global click events (event delegation)
     */
    handleGlobalClick(e) {
        // Find closest interactive element
        const target = e.target.closest('[data-action]');
        if (!target) return;
        
        const action = target.dataset.action;
        const params = target.dataset.params || {};
        
        console.log(`🖱️ Action triggered: ${action}`, params);
        
        // Dispatch custom action event
        window.dispatchEvent(new CustomEvent('action', {
            detail: { action, params, originalEvent: e }
        }));
    },
    
    /**
     * Handle global hover events
     */
    handleGlobalHover(e) {
        const target = e.target.closest('[data-hover-effect]');
        if (!target) return;
        
        const effect = target.dataset.hoverEffect;
        // Additional hover logic can be added here
    },
    
    /**
     * Register all component renderers
     */
    registerComponents() {
        // This will be populated by individual component modules
        // Example: this.registerComponent('hero', 1, renderHeroV1);
        console.log('📦 Component registry ready');
    },
    
    /**
     * Register a single component renderer
     */
    registerComponent(type, variation, renderFn) {
        if (!this.registry[type]) {
            this.registry[type] = {};
        }
        this.registry[type][variation] = renderFn;
    },
    
    /**
     * Get renderer for a component type and variation
     */
    getRenderer(type, variation) {
        if (!this.registry[type]) {
            console.warn(`No renderer found for component type: ${type}`);
            return null;
        }
        const renderer = this.registry[type][variation];
        if (!renderer) {
            console.warn(`No renderer found for ${type} variation ${variation}`);
            return this.registry[type][1] || null; // Fallback to variation 1
        }
        return renderer;
    },
    
    /**
     * Render the current page
     */
    async renderCurrentPage() {
        const appRoot = document.getElementById('app-root');
        if (!appRoot || !this.state.currentPage) {
            console.error('Cannot render: app-root or currentPage missing');
            return;
        }
        
        console.log(`📄 Rendering page: ${this.state.currentPage.title}`);
        
        // Clear existing content
        appRoot.innerHTML = '';
        
        // Render header/navigation
        await this.renderHeader(appRoot);
        
        // Render main content sections
        const main = document.createElement('main');
        main.className = 'main-content';
        main.id = 'main-content';
        
        for (const section of this.state.currentPage.sections) {
            const sectionEl = await this.renderSection(section);
            if (sectionEl) {
                main.appendChild(sectionEl);
            }
        }
        
        appRoot.appendChild(main);
        
        // Render footer
        await this.renderFooter(appRoot);
        
        // Trigger post-render events
        window.dispatchEvent(new CustomEvent('pageRendered', { 
            detail: { page: this.state.currentPage } 
        }));
    },
    
    /**
     * Render header/navigation
     */
    async renderHeader(container) {
        const header = document.createElement('header');
        header.className = 'site-header';
        header.id = 'site-header';
        
        // Default to navigation variation 1 if not specified
        const navVariation = 1;
        const renderer = this.getRenderer('navigation', navVariation);
        
        if (renderer) {
            const navContent = await renderer(this.state);
            header.innerHTML = navContent;
        } else {
            // Fallback simple header
            header.innerHTML = `
                <div class="header-container">
                    <div class="logo">${this.state.siteConfig?.brand?.name || 'VERDE NOIR'}</div>
                    <nav class="main-nav">
                        <a href="#home">Home</a>
                        <a href="#shop">Shop</a>
                        <a href="#about">About</a>
                    </nav>
                </div>
            `;
        }
        
        container.appendChild(header);
    },
    
    /**
     * Render a single section
     */
    async renderSection(section) {
        const { type, variation, content, id } = section;
        
        const renderer = this.getRenderer(type, variation);
        
        if (!renderer) {
            console.warn(`No renderer available for ${type} v${variation}`);
            return this.createFallbackSection(section);
        }
        
        try {
            const html = await renderer({ ...this.state, section, content });
            const sectionEl = document.createElement('section');
            sectionEl.className = `section section-${type} section-${type}-v${variation}`;
            sectionEl.id = id;
            sectionEl.innerHTML = html;
            return sectionEl;
        } catch (error) {
            console.error(`Error rendering section ${id}:`, error);
            return this.createFallbackSection(section);
        }
    },
    
    /**
     * Create fallback section when renderer fails
     */
    createFallbackSection(section) {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'section section-fallback';
        sectionEl.id = section.id;
        sectionEl.innerHTML = `
            <div class="fallback-container">
                <h3>Component: ${section.type}</h3>
                <p>Variation: ${section.variation}</p>
                <p class="error-msg">Renderer not available</p>
            </div>
        `;
        return sectionEl;
    },
    
    /**
     * Render footer
     */
    async renderFooter(container) {
        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.id = 'site-footer';
        
        // Default to footer variation 1 if not specified
        const footerVariation = 1;
        const renderer = this.getRenderer('footer', footerVariation);
        
        if (renderer) {
            const footerContent = await renderer(this.state);
            footer.innerHTML = footerContent;
        } else {
            // Fallback simple footer
            footer.innerHTML = `
                <div class="footer-container">
                    <p>&copy; ${new Date().getFullYear()} ${this.state.siteConfig?.brand?.name || 'VERDE NOIR'}. All rights reserved.</p>
                </div>
            `;
        }
        
        container.appendChild(footer);
    },
    
    /**
     * Subscribe to an event
     */
    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    },
    
    /**
     * Unsubscribe from an event
     */
    unsubscribe(event, callback) {
        if (!this.subscribers.has(event)) return;
        const callbacks = this.subscribers.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    },
    
    /**
     * Publish an event
     */
    publish(event, data) {
        if (!this.subscribers.has(event)) return;
        this.subscribers.get(event).forEach(callback => callback(data));
    },
    
    /**
     * Utility: Format price
     */
    formatPrice(price, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(price);
    },
    
    /**
     * Utility: Generate unique ID
     */
    generateId(prefix = 'el') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    /**
     * Utility: Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Utility: Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export for use in other modules
window.Engine = Engine;
