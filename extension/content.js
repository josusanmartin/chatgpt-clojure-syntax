function highlightClojureCode() {
    const codeBlocks = document.querySelectorAll('code.hljs.language-clojure');
    codeBlocks.forEach((block) => {
        const highlightAndCheck = () => {
            Prism.highlightElement(block, false, () => {
                // Check if the block actually contains highlighted tokens
                if (!block.querySelector('.token')) {
                    console.log("Highlighting failed, retrying:", block);
                    setTimeout(highlightAndCheck, 100); // Retry after a short delay
                } else {
                    block.classList.add('prism-highlighted');
                    console.log("Successfully highlighted:", block);
                }
            });
        };

        if (!block.classList.contains('prism-highlighted')) {
            block.classList.add('language-clojure');
            try {
                highlightAndCheck();
            } catch (error) {
                console.error("Error highlighting block:", error);
            }
        } else if (!block.querySelector('.token')) {
            // If it's marked as highlighted but doesn't contain tokens, try again
            console.log("Block marked as highlighted but not actually highlighted, retrying:", block);
            block.classList.remove('prism-highlighted');
            try {
                highlightAndCheck();
            } catch (error) {
                console.error("Error re-highlighting block:", error);
            }
        }
    });
}

// Function to periodically scan and highlight
function setupPeriodicHighlighting() {
    setInterval(highlightClojureCode, 1000);  // Run every second
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