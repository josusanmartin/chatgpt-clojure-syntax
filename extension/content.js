// Function to highlight Clojure code blocks
function highlightClojureCode() {
    const codeBlocks = document.querySelectorAll('code.hljs.language-clojure');
    console.log("Found code blocks:", codeBlocks.length);
    codeBlocks.forEach((block, index) => {
        console.log(`Processing block ${index}:`, block.textContent);
        Prism.highlightElement(block);
        console.log(`Highlighted block ${index}`);
    });
}

// Function to observe for changes in the DOM
function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
        let shouldHighlight = false;
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE && node.querySelectorAll('code.hljs.language-clojure').length > 0) {
                    shouldHighlight = true;
                }
            });
        });
        if (shouldHighlight) {
            // Wait a brief moment to ensure the <pre> content is fully loaded
            setTimeout(() => {
                highlightClojureCode();
            }, 100);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Periodically check for new code blocks to highlight
function setupPeriodicHighlighting() {
    setInterval(highlightClojureCode, 5000);  // Check every second
}

// Function to initialize the script
function initialize() {
    observeDOMChanges();
    setupPeriodicHighlighting();
    highlightClojureCode();  // Initial highlighting
}

// Ensure the initialization in case the document is already fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
