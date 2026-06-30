/**
 * VERDE NOIR - Main Application Entry Point
 * Initializes the rendering engine and component registry
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌿 VERDE NOIR application starting...');
    
    // Initialize the engine (this also initializes API)
    await Engine.init();
    
    // Component renderers will be auto-registered when their scripts load
    // The engine waits for all components before rendering
    
    console.log('✅ VERDE NOIR application ready');
});

// Handle page visibility changes to refresh data
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('🔄 Page visible - refreshing state');
        Engine.loadState().then(() => Engine.renderCurrentPage());
    }
});
