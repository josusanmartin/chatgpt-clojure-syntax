// Function to highlight Clojure code blocks
function highlightClojureCode() {
    const codeBlocks = document.querySelectorAll('code.hljs.language-clojure:not(.prism-highlighted)');
    codeBlocks.forEach((block) => {
        block.classList.add('language-clojure');
        Prism.highlightElement(block);
        block.classList.add('prism-highlighted');
        console.log("Highlighted:", block);
    });
}

// Function to periodically scan and highlight
function setupPeriodicHighlighting() {
    setInterval(highlightClojureCode, 5000);  // Run every 5 seconds
}

// Function to initialize the script
function initialize() {
    highlightClojureCode();  // Initial highlighting
    setupPeriodicHighlighting();
}

// Ensure the initialization in case the document is already fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}