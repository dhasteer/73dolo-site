// static/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Typing Animation for Header ---
    const headerTextElement = document.getElementById('header-text');
    if (headerTextElement) {
        const textToType = `73 DOLO EVENTS`;
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
        
        // Ledger modal opening is handled by a separate, more complex function
        if (modalId !== 'ledger-modal') {
            openButtons.forEach(button => button.addEventListener('click', showModal));
        }
        closeButtons.forEach(button => button.addEventListener('click', hideModal));

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                hideModal();
            }
        });
    };

    // Initialize all modals
    setupModal('lookup-modal');
    setupModal('ledger-modal');
    setupModal('halloween-modal');

    // --- Poker Ledger Modal Logic ---
    const ledgerModal = document.getElementById('ledger-modal');
    const ledgerTitle = document.getElementById('ledger-title');

    // Helper to populate a table body with ledger data
    const populateTable = (tableBodyId, data) => {
        const tableBody = document.getElementById(tableBodyId);
        if (!tableBody) return;

        // Clear previous entries
        tableBody.innerHTML = '';
        
        if (data.entries && data.entries.length > 0) {
            data.entries.forEach(entry => {
                const net = entry.net;
                const netSign = net > 0 ? '+' : '';
                const row = `
                    <tr>
                        <td>${entry.player}</td>
                        <td>$${entry.buy_in}</td>
                        <td>$${entry.cash_out}</td>
                        <td>${netSign}$${net}</td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="4" class="text-center">NO LEDGER DATA FOUND.</td></tr>';
        }
    };

    // Main function to open the ledger modal and fetch all data
    const openLedgerModal = async (eventId) => {
        // Set loading states
        document.getElementById('event-ledger-table-body').innerHTML = '<tr><td colspan="4" class="text-center">LOADING...</td></tr>';
        document.getElementById('universal-ledger-table-body').innerHTML = '<tr><td colspan="4" class="text-center">LOADING...</td></tr>';
        
        // Fetch both event and universal ledgers simultaneously
        const eventLedgerPromise = fetch(`/ledger/${eventId}`).then(res => res.json());
        const universalLedgerPromise = fetch('/ledger/all').then(res => res.json());

        try {
            const [eventData, universalData] = await Promise.all([eventLedgerPromise, universalLedgerPromise]);
            
            // Update modal title with specific event name
            ledgerTitle.textContent = eventData.title || 'Poker Ledger';

            // Populate both tables
            populateTable('event-ledger-table-body', eventData);
            populateTable('universal-ledger-table-body', universalData);

            // Reset to the first tab
            document.querySelector('.ledger-tab.active').classList.remove('active');
            document.querySelector('.ledger-tab-content.active').classList.remove('active');
            document.querySelector('.ledger-tab[data-tab="event-ledger-content"]').classList.add('active');
            document.getElementById('event-ledger-content').classList.add('active');

            // Show the modal
            ledgerModal.classList.remove('hidden');

        } catch (error) {
            console.error('Failed to fetch ledger data:', error);
            document.getElementById('event-ledger-table-body').innerHTML = '<tr><td colspan="4" class="text-center text-red-500">ERROR LOADING DATA.</td></tr>';
        }
    };

    // Attach event listener to all "View Ledger" buttons
    document.querySelectorAll('[data-modal-toggle="ledger-modal"]').forEach(button => {
        button.addEventListener('click', () => {
            const eventId = button.dataset.eventId;
            if (eventId) {
                openLedgerModal(eventId);
            }
        });
    });

    // --- Tab Switching Logic ---
    const tabContainer = document.querySelector('.ledger-tab-nav');
    if (tabContainer) {
        tabContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('ledger-tab')) {
                const targetTabId = event.target.dataset.tab;

                // Update tab buttons
                tabContainer.querySelectorAll('.ledger-tab').forEach(tab => tab.classList.remove('active'));
                event.target.classList.add('active');

                // Update tab content
                document.querySelectorAll('.ledger-tab-content').forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTabId) {
                        content.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Global listener for the Escape key
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
