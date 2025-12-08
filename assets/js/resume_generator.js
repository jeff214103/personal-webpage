/**
 * resume_generator.js
 * 
 * This script provides functionality to generate a resume generation link
 * based on the text content of the current page.
 * 
 * Dependencies: pako (https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js)
 */

(function (window) {
    /**
     * Generates the resume generation link.
     * 
     * @param {string} [baseUrl] - Optional base URL for the Flutter app.
     * @param {string} [name] - Optional name of the resume owner.
     * @returns {string|null} The generated URL or null on error.
     */
    function generateResumeLink(baseUrl, name) {
        try {
            // 1. Get raw text content from the page
            const rawText = document.body.innerText;

            // 2. GZip Compress using pako
            if (typeof pako === 'undefined') {
                console.error("pako library is not loaded.");
                return null;
            }
            const compressed = pako.gzip(rawText);

            // 3. Base64 Encode
            let binary = '';
            const len = compressed.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(compressed[i]);
            }
            const base64 = btoa(binary);

            // 4. Construct URL
            if (!baseUrl) {
                baseUrl = window.location.origin;
            }

            if (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.slice(0, -1);
            }

            let url = `${baseUrl}/#/generate?data=${encodeURIComponent(base64)}`;

            if (name) {
                url += `&name=${encodeURIComponent(name)}`;
            }

            return url;

        } catch (e) {
            console.error("Error generating resume link:", e);
            return null;
        }
    }

    /**
     * Sets up a button or link to open the resume generator.
     * 
     * @param {string} elementId - The ID of the HTML element (button or a) to update.
     * @param {string} [baseUrl] - Optional base URL for the Flutter app. Defaults to current origin.
     * @param {string} [name] - Optional name of the resume owner.
     */
    function setupResumeButton(elementId, name) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID '${elementId}' not found.`);
            return;
        }

        const url = generateResumeLink("https://resume.itdogtics.com", name);
        if (url) {
            if (element.tagName === 'A') {
                element.href = url;
            } else {
                element.onclick = function () {
                    window.location.href = url;
                };
            }
            element.disabled = false;
        } else {
            console.error("Failed to generate URL.");
            const errorDiv = document.getElementById('error-message');
            if (errorDiv) {
                errorDiv.textContent = "Failed to generate resume link. Check console.";
            }
        }
    }

    // Expose functions to global scope
    window.ResumeGenerator = {
        setupButton: setupResumeButton,
        generateLink: generateResumeLink
    };

})(window);
