// static/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Typing Animation for Header ---
    const headerTextElement = document.getElementById('header-text');
    if (headerTextElement) {
        const textToType = `OUR HOME EVENTS\n\nPLAYER 1 PRESS START`;
        let charIndex = 0;

        function typeHeaderText() {
            if (charIndex < textToType.length) {
                let currentText = headerTextElement.innerHTML.replace(/<span class="cursor".*?<\/span>/, '');
                const char = textToType.charAt(charIndex) === '\n' ? '<br>' : textToType.charAt(charIndex);
                headerTextElement.innerHTML = currentText + char;
                charIndex++;
                setTimeout(typeHeaderText, 80); // Typing speed
            } else {
                headerTextElement.innerHTML += '<span class="cursor"></span>';
            }
        }
        typeHeaderText();
    }

    // --- Modal Handling Logic ---
    const setupModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const openButtons = document.querySelectorAll(`[data-modal-toggle="${modalId}"]`);
        const closeButtons = document.querySelectorAll(`[data-modal-hide="${modalId}"]`);

        const showModal = () => {
            modal.classList.remove('hidden');
        };

        const hideModal = () => {
            modal.classList.add('hidden');
        };

        openButtons.forEach(button => button.addEventListener('click', showModal));
        closeButtons.forEach(button => button.addEventListener('click', hideModal));

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                hideModal();
            }
        });
    };

    // Initialize all modals
    setupModal('lookup-modal');
    
    // Global listener for the Escape key to close any open modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.querySelectorAll('.fixed.z-50').forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                }
            });
        }
    });
});
