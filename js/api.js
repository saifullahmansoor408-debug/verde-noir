/**
 * VERDE NOIR - Mock API Layer
 * Simulates backend API calls using localStorage
 * Implements Promise-based async/await pattern
 */

const API = {
    STORAGE_KEYS: {
        SITE_CONFIG: 'verde_noir_site_config',
        PAGES: 'verde_noir_pages',
        PRODUCTS: 'verde_noir_products'
    },

    // Default Site Configuration
    defaultSiteConfig: {
        brand: {
            name: "VERDE NOIR",
            logo_url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='10' y='40' fill='%2300FF88' font-family='Georgia, serif' font-size='32' font-weight='bold'%3EVERDE%3C/text%3E%3Ctext x='95' y='40' fill='%23FFFFFF' font-family='Georgia, serif' font-size='32' font-weight='bold'%3ENOIR%3C/text%3E%3C/svg%3E"
        },
        theme: {
            primary_dark: "#040D09",
            secondary_green: "#0A2618",
            accent: "#00FF88",
            text_white: "#FFFFFF",
            text_off_white: "#E8F5E9"
        }
    },

    // Default Pages Structure with Rule of 3 variations
    defaultPages: [
        {
            id: "home",
            title: "Home",
            slug: "/",
            sections: [
                {
                    id: "sec_hero_1",
                    type: "hero",
                    variation: 2,
                    content: {
                        title: "Autumn Collection",
                        subtitle: "Redefining Elegance",
                        images: [
                            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
                            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
                            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
                        ],
                        cta_text: "Explore Collection",
                        cta_link: "/shop"
                    }
                },
                {
                    id: "sec_features_1",
                    type: "features",
                    variation: 1,
                    content: {
                        features: [
                            { icon: "shipping", title: "Free Global Shipping", description: "On orders over $200" },
                            { icon: "returns", title: "Easy Returns", description: "30-day return policy" },
                            { icon: "quality", title: "Premium Quality", description: "Handcrafted materials" },
                            { icon: "support", title: "24/7 Support", description: "Dedicated assistance" }
                        ]
                    }
                },
                {
                    id: "sec_products_1",
                    type: "product_grid",
                    variation: 1,
                    content: {
                        category: "new-arrivals",
                        title: "New Arrivals",
                        limit: 8
                    }
                },
                {
                    id: "sec_testimonials_1",
                    type: "testimonials",
                    variation: 3,
                    content: {
                        title: "What Our Clients Say",
                        reviews: []
                    }
                },
                {
                    id: "sec_newsletter_1",
                    type: "newsletter",
                    variation: 1,
                    content: {
                        title: "Join Our Exclusive List",
                        subtitle: "Get 15% off your first order",
                        placeholder: "Enter your email"
                    }
                }
            ]
        },
        {
            id: "shop",
            title: "Shop",
            slug: "/shop",
            sections: [
                {
                    id: "sec_shop_hero",
                    type: "hero",
                    variation: 3,
                    content: {
                        title: "SALE",
                        subtitle: "Up to 50% Off Selected Items",
                        countdown_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                        cta_text: "Shop Now",
                        cta_link: "/shop/all"
                    }
                },
                {
                    id: "sec_shop_grid",
                    type: "product_grid",
                    variation: 2,
                    content: {
                        category: "all",
                        title: "All Products"
                    }
                }
            ]
        },
        {
            id: "about",
            title: "About",
            slug: "/about",
            sections: [
                {
                    id: "sec_about_hero",
                    type: "hero",
                    variation: 1,
                    content: {
                        title: "Our Story",
                        subtitle: "Crafting Luxury Since 2024",
                        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80",
                        hotspots: [
                            { x: 30, y: 40, product_id: "prod_1", product_name: "Silk Blazer", price: "$450" },
                            { x: 60, y: 55, product_id: "prod_2", product_name: "Leather Bag", price: "$320" }
                        ]
                    }
                }
            ]
        }
    ],

    // Default Products Data
    defaultProducts: [
        {
            id: "prod_1",
            name: "Emerald Silk Blazer",
            price: 450,
            original_price: 550,
            category: "new-arrivals",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
                "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80"
            ],
            description: "Luxurious silk blazer in deep emerald green",
            fabric: "100% Pure Silk",
            fit: "Tailored Fit",
            care: "Dry clean only"
        },
        {
            id: "prod_2",
            name: "Noir Leather Tote",
            price: 320,
            original_price: null,
            category: "new-arrivals",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
            ],
            description: "Premium leather tote bag in classic black",
            fabric: "Genuine Italian Leather",
            fit: "One Size",
            care: "Condition regularly"
        },
        {
            id: "prod_3",
            name: "Verde Maxi Dress",
            price: 280,
            original_price: 350,
            category: "new-arrivals",
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
            ],
            description: "Flowing maxi dress in signature verde green",
            fabric: "Organic Cotton Blend",
            fit: "Relaxed Fit",
            care: "Machine wash cold"
        },
        {
            id: "prod_4",
            name: "Obsidian Heels",
            price: 195,
            original_price: null,
            category: "new-arrivals",
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"
            ],
            description: "Elegant stiletto heels in glossy black",
            fabric: "Patent Leather",
            fit: "True to Size",
            care: "Wipe with damp cloth"
        },
        {
            id: "prod_5",
            name: "Pearl Necklace Set",
            price: 420,
            original_price: null,
            category: "accessories",
            image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=800&q=80"
            ],
            description: "Handcrafted pearl necklace and earring set",
            fabric: "Freshwater Pearls, 18K Gold",
            fit: "Adjustable",
            care: "Store in provided pouch"
        },
        {
            id: "prod_6",
            name: "Cashmere Wrap",
            price: 380,
            original_price: 450,
            category: "new-arrivals",
            image: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1605763240004-7e93b172d754?w=800&q=80"
            ],
            description: "Ultra-soft cashmere wrap in muted green",
            fabric: "100% Mongolian Cashmere",
            fit: "Oversized",
            care: "Dry clean recommended"
        },
        {
            id: "prod_7",
            name: "Structured Blazer",
            price: 520,
            original_price: null,
            category: "bestsellers",
            image: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1550614000-4b9519e02d48?w=800&q=80"
            ],
            description: "Powerfully structured blazer for the modern professional",
            fabric: "Wool Blend",
            fit: "Structured Fit",
            care: "Dry clean only"
        },
        {
            id: "prod_8",
            name: "Silk Scarf",
            price: 125,
            original_price: null,
            category: "accessories",
            image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4faae?w=800&q=80",
            images: [
                "https://images.unsplash.com/photo-1584030373081-f37b7bb4faae?w=800&q=80"
            ],
            description: "Hand-printed silk scarf with botanical motifs",
            fabric: "100% Mulberry Silk",
            fit: "90cm x 90cm",
            care: "Hand wash cold"
        }
    ],

    /**
     * Initialize localStorage with default data if not present
     */
    init() {
        if (!localStorage.getItem(this.STORAGE_KEYS.SITE_CONFIG)) {
            localStorage.setItem(this.STORAGE_KEYS.SITE_CONFIG, JSON.stringify(this.defaultSiteConfig));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.PAGES)) {
            localStorage.setItem(this.STORAGE_KEYS.PAGES, JSON.stringify(this.defaultPages));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.PRODUCTS)) {
            localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(this.defaultProducts));
        }
        console.log('🌿 VERDE NOIR API initialized');
    },

    /**
     * Simulate API delay
     */
    simulateDelay(ms = 300) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * GET Site Config
     */
    async getSiteConfig() {
        await this.simulateDelay();
        const data = localStorage.getItem(this.STORAGE_KEYS.SITE_CONFIG);
        return data ? JSON.parse(data) : this.defaultSiteConfig;
    },

    /**
     * GET All Pages
     */
    async getPages() {
        await this.simulateDelay();
        const data = localStorage.getItem(this.STORAGE_KEYS.PAGES);
        return data ? JSON.parse(data) : this.defaultPages;
    },

    /**
     * GET Single Page by ID
     */
    async getPage(pageId) {
        await this.simulateDelay();
        const pages = await this.getPages();
        return pages.find(page => page.id === pageId) || null;
    },

    /**
     * GET All Products
     */
    async getProducts() {
        await this.simulateDelay();
        const data = localStorage.getItem(this.STORAGE_KEYS.PRODUCTS);
        return data ? JSON.parse(data) : this.defaultProducts;
    },

    /**
     * GET Products by Category
     */
    async getProductsByCategory(category) {
        await this.simulateDelay();
        const products = await this.getProducts();
        if (category === 'all') return products;
        return products.filter(p => p.category === category);
    },

    /**
     * GET Single Product by ID
     */
    async getProduct(productId) {
        await this.simulateDelay();
        const products = await this.getProducts();
        return products.find(p => p.id === productId) || null;
    },

    /**
     * SAVE Site Config
     */
    async saveSiteConfig(config) {
        await this.simulateDelay();
        localStorage.setItem(this.STORAGE_KEYS.SITE_CONFIG, JSON.stringify(config));
        window.dispatchEvent(new CustomEvent('stateChange', { detail: { type: 'site_config', data: config } }));
        return config;
    },

    /**
     * SAVE Pages
     */
    async savePages(pages) {
        await this.simulateDelay();
        localStorage.setItem(this.STORAGE_KEYS.PAGES, JSON.stringify(pages));
        window.dispatchEvent(new CustomEvent('stateChange', { detail: { type: 'pages', data: pages } }));
        return pages;
    },

    /**
     * SAVE Single Page
     */
    async savePage(page) {
        await this.simulateDelay();
        const pages = await this.getPages();
        const index = pages.findIndex(p => p.id === page.id);
        if (index !== -1) {
            pages[index] = page;
        } else {
            pages.push(page);
        }
        await this.savePages(pages);
        return page;
    },

    /**
     * SAVE Products
     */
    async saveProducts(products) {
        await this.simulateDelay();
        localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        window.dispatchEvent(new CustomEvent('stateChange', { detail: { type: 'products', data: products } }));
        return products;
    },

    /**
     * RESET to Default Data
     */
    async resetToDefaults() {
        await this.simulateDelay();
        localStorage.setItem(this.STORAGE_KEYS.SITE_CONFIG, JSON.stringify(this.defaultSiteConfig));
        localStorage.setItem(this.STORAGE_KEYS.PAGES, JSON.stringify(this.defaultPages));
        localStorage.setItem(this.STORAGE_KEYS.PRODUCTS, JSON.stringify(this.defaultProducts));
        window.dispatchEvent(new CustomEvent('stateChange', { detail: { type: 'reset' } }));
        return { success: true };
    }
};

// Auto-initialize on script load
API.init();
