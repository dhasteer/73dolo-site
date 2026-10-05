// static/js/main.js
// Client-side application logic and static data for 73 DOLO Website

document.addEventListener('DOMContentLoaded', () => {

    // --- EVENT DATA ---
    const EVENTS = [
        {
            unique_id: "housewarming-2025-08-16",
            title: "Housewarming",
            date: "August 16, 2025",
            description: "Celebrate our new home with us! Drinks, snacks, and good company await.",
            image_url: "https://i.guim.co.uk/img/media/908edfd0eb30a60f9cdd73a936b6a36b60d67681/0_130_2150_1290/master/2150.jpg?width=1900&dpr=2&s=none&crop=none",
            lookup_item: "housewarming"
        },
        {
            unique_id: "poker-2025-08-23",
            title: "WWM Poker Night",
            date: "August 23, 2025",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://pgt.pokergomedia.com/cdn-cgi/image/fit=contain,width=1280,quality=65/2019/12/dd51c1dc-3jbevg.jpg",
            lookup_item: ""
        },
        {
            unique_id: "halloween-2025-10-31",
            title: "Halloween Party",
            date: "October 31, 2025",
            description: "Spirits and spirits! Costume contest! Piñata!",
            image_url: "https://64.media.tumblr.com/87cd5aac1ef068677755ce2e1eb1481a/tumblr_ph3cu7jAyc1ty7o9q_540.jpg",
            lookup_item: "halloween"
        },
        {
            unique_id: "poker-2025-11-15",
            title: "WWM Poker Night",
            date: "November 15, 2025",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://cdn-origin.pokerstrategy.com/2021/09/29/6u699mz6nhp71.jpeg",
            lookup_item: ""
        },
        {
            unique_id: "poker-2026-01-10",
            title: "WWM Poker Night",
            date: "January 10, 2026",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://media1.tenor.com/m/DdAeHGzMtIYAAAAC/all-in-poker.gif",
            lookup_item: ""
        },
        {
            unique_id: "poker-2026-02-27",
            title: "WWM Poker Night",
            date: "February 27, 2026",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWt5cmZlOHB3eW94ams4OTdzcTRzdnJjZnE0YXQ0cG12Y2RsbGhtOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4RveNe6mauoBW/giphy.gif",
            lookup_item: ""
        },
        {
            unique_id: "poker-2026-04-25",
            title: "WWM Poker Night",
            date: "April 25, 2026",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://media1.tenor.com/m/aiHuleZkUYMAAAAd/poker-cards.gif",
            lookup_item: ""
        },
        {
            unique_id: "poker-2026-06-06",
            title: "WWM Poker Night",
            date: "June 06, 2026",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://media1.tenor.com/m/9nVvCPYBwe4AAAAC/snoopy-poker.gif",
            lookup_item: ""
        },
        {
            unique_id: "poker-2026-07-31",
            title: "WWM Poker Night",
            date: "July 31, 2026",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://media1.tenor.com/m/mMZn6A2aYsQAAAAC/%D0%B1%D0%BB%D0%B5%D0%BA%D0%B4%D0%B6%D0%B5%D0%BA-blackjack.gif",
            lookup_item: ""
        },
        {
            unique_id: "mosaic-coasters-2026-04-04",
            title: "Mosaic Coaster Craft Night",
            date: "April 4, 2026",
            description: "A creative evening making mosaic coasters together, with homemade dessert and record player tunes setting the vibe.",
            image_url: "https://www.artwithaheart.net/wp-content/uploads/2023/10/Mosaic-Coaster.png",
            lookup_item: "",
            photos: ["static/images/mosaic_1.jpg", "static/images/mosaic_2.jpg"]
        },
        {
            unique_id: "spritzes-slices-2026-05-16",
            title: "Spritzes & Slices",
            date: "May 16, 2026",
            description: "An afternoon on the rooftop featuring wood-fired pizza slices, chilled spritzes, and city views.",
            image_url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
            lookup_item: "",
            photos: ["static/images/spritzes_1.jpg", "static/images/spritzes_2.jpg"]
        },
        {
            unique_id: "poker-2026-08-28",
            title: "WWM Poker Night",
            date: "August 28, 2026",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://i.pinimg.com/originals/80/01/21/8001216bc4b14ef5f9446e5cb7a2ab89.gif",
            lookup_item: ""
        },
        {
            unique_id: "poker-2026-10-02",
            title: "WWM Poker Night",
            date: "October 2, 2026",
            description: "An evening of poker, drinks, and conversation. Buy in for $20.",
            image_url: "https://gamblerwins.wordpress.com/wp-content/uploads/2018/03/giphy-1.gif",
            lookup_item: ""
        }
    ];

    // --- POKER LEDGERS DATA ---
    const POKER_LEDGERS = {
        "poker-2025-08-23": {
            title: "WWM Poker Night (Aug 23)",
            entries: [
                { player: "dh", buy_in: 20, cash_out: 50.50, net: 30.50 },
                { player: "gk", buy_in: 40, cash_out: 49, net: 9 },
                { player: "vb", buy_in: 55, cash_out: 52.25, net: -2.75 },
                { player: "ad", buy_in: 30, cash_out: 0, net: -30 },
                { player: "ws", buy_in: 20, cash_out: 11.50, net: -8.50 },
                { player: "rg", buy_in: 20, cash_out: 18.25, net: -1.75 },
                { player: "ss", buy_in: 20, cash_out: 0, net: -20 },
                { player: "dn", buy_in: 20, cash_out: 43.50, net: 23.50 }
            ]
        },
        "poker-2025-11-15": {
            title: "WWM Poker Night (Nov 15)",
            entries: [
                { player: "cd", buy_in: 20, cash_out: 0, net: -20 },
                { player: "vb", buy_in: 80, cash_out: 5, net: -75 },
                { player: "ws", buy_in: 20, cash_out: 32.50, net: 12.50 },
                { player: "ky", buy_in: 40, cash_out: 15.40, net: -24.60 },
                { player: "dh", buy_in: 20, cash_out: 104.80, net: 84.80 },
                { player: "mc", buy_in: 40, cash_out: 62.20, net: 22.20 },
                { player: "ch", buy_in: 20, cash_out: 20.20, net: 0.20 },
                { player: "bg", buy_in: 20, cash_out: 45.20, net: 25.20 },
                { player: "pka", buy_in: 60, cash_out: 34.70, net: -25.30 }
            ]
        },
        "poker-2026-01-10": {
            title: "WWM Poker Night (Jan 10)",
            entries: [
                { player: "ad", buy_in: 20, cash_out: 0, net: -20 },
                { player: "ss", buy_in: 20, cash_out: 16.50, net: -3.50 },
                { player: "vb", buy_in: 20, cash_out: 0, net: -20 },
                { player: "dh", buy_in: 40, cash_out: 35.25, net: -4.75 },
                { player: "cs", buy_in: 20, cash_out: 41.75, net: 21.75 },
                { player: "ky", buy_in: 20, cash_out: 39.50, net: 19.50 },
                { player: "sm", buy_in: 20, cash_out: 9, net: -11 },
                { player: "bm", buy_in: 20, cash_out: 20.75, net: 0.75 },
                { player: "cd", buy_in: 20, cash_out: 37.25, net: 17.25 }
            ]
        },
        "poker-2026-02-27": {
            title: "WWM Poker Night (Feb 27)",
            entries: [
                { player: "ws", buy_in: 40, cash_out: 0, net: -40 },
                { player: "rl", buy_in: 20, cash_out: 34.70, net: 14.70 },
                { player: "mc", buy_in: 20, cash_out: 43.10, net: 23.10 },
                { player: "ky", buy_in: 20, cash_out: 98.40, net: 78.40 },
                { player: "pke", buy_in: 20, cash_out: 54.90, net: 34.90 },
                { player: "bm", buy_in: 40, cash_out: 0, net: -40 },
                { player: "vb", buy_in: 40, cash_out: 38.60, net: -1.40 },
                { player: "hc", buy_in: 20, cash_out: 0, net: -20 },
                { player: "bg", buy_in: 20, cash_out: 0, net: -20 },
                { player: "dh", buy_in: 40, cash_out: 10.30, net: -29.70 }
            ]
        },
        "poker-2026-04-25": {
            title: "WWM Poker Night (Apr 25)",
            entries: [
                { player: "dh", buy_in: 20, cash_out: 82.40, net: 62.40 },
                { player: "rl", buy_in: 20, cash_out: 78.20, net: 58.20 },
                { player: "mc", buy_in: 20, cash_out: 51.80, net: 31.80 },
                { player: "bm", buy_in: 20, cash_out: 47.60, net: 27.60 },
                { player: "gb", buy_in: 20, cash_out: 0, net: -20.00 },
                { player: "el", buy_in: 20, cash_out: 0, net: -20.00 },
                { player: "ch", buy_in: 40, cash_out: 0, net: -40.00 },
                { player: "bg", buy_in: 100, cash_out: 0, net: -100.00 }
            ]
        },
        "poker-2026-06-06": {
            title: "WWM Poker Night (Jun 6)",
            entries: [
                { player: "ky", buy_in: 20, cash_out: 68.20, net: 48.20 },
                { player: "mc", buy_in: 20, cash_out: 32.30, net: 12.30 },
                { player: "dh", buy_in: 20, cash_out: 23.30, net: 3.30 },
                { player: "cd", buy_in: 20, cash_out: 23.00, net: 3.00 },
                { player: "br", buy_in: 20, cash_out: 16.40, net: -3.60 },
                { player: "bm", buy_in: 40, cash_out: 29.20, net: -10.80 },
                { player: "vb", buy_in: 60, cash_out: 47.60, net: -12.40 },
                { player: "cq", buy_in: 40, cash_out: 0, net: -40.00 }
            ]
        },
        "poker-2026-07-31": {
            title: "WWM Poker Night (Jul 31)",
            entries: [
                { player: "as", buy_in: 20, cash_out: 73.30, net: 53.30 },
                { player: "gb", buy_in: 20, cash_out: 30.00, net: 10.00 },
                { player: "dh", buy_in: 20, cash_out: 30.00, net: 10.00 },
                { player: "ky", buy_in: 40, cash_out: 26.70, net: -13.30 },
                { player: "bm", buy_in: 60, cash_out: 0.00, net: -60.00 }
            ]
        },
        "poker-2026-08-28": {
            title: "WWM Poker Night (Aug 28)",
            entries: [
                { player: "bm", buy_in: 20, cash_out: 56.70, net: 36.70 },
                { player: "ctv", buy_in: 40, cash_out: 49.90, net: 9.90 },
                { player: "dh", buy_in: 20, cash_out: 32.70, net: 12.70 },
                { player: "mz", buy_in: 20, cash_out: 30.70, net: 10.70 },
                { player: "ws", buy_in: 20, cash_out: 0.00, net: -20.00 },
                { player: "jr", buy_in: 20, cash_out: 0.00, net: -20.00 },
                { player: "ss", buy_in: 30, cash_out: 0.00, net: -30.00 }
            ]
        },
        "poker-2026-10-02": {
            title: "WWM Poker Night (Oct 2)",
            entries: [
                { player: "vb", buy_in: 20, cash_out: 93.70, net: 73.70 },
                { player: "dh", buy_in: 20, cash_out: 28.30, net: 8.30 },
                { player: "am", buy_in: 20, cash_out: 21.10, net: 1.10 },
                { player: "mz", buy_in: 20, cash_out: 16.90, net: -3.10 },
                { player: "bg", buy_in: 20, cash_out: 0.00, net: -20.00 },
                { player: "al", buy_in: 20, cash_out: 0.00, net: -20.00 },
                { player: "bm", buy_in: 40, cash_out: 0.00, net: -40.00 }
            ]
        }
    };

    // --- HOUSEWARMING GUEST ASSIGNMENTS DATA ---
    const HOUSEWARMING_ASSIGNMENTS = [
        { name: "Ben Mathew", item: "Salt" },
        { name: "Raj", item: "Pepper" },
        { name: "Michael", item: "Peanut Butter" },
        { name: "Vamshi", item: "Jelly" },
        { name: "Archika Dogra", item: "Macaroni" },
        { name: "Connor", item: "Cheese" },
        { name: "Jason P", item: "Fish" },
        { name: "Brian Yu", item: "Chips" },
        { name: "gina", item: "Bacon" },
        { name: "Abby", item: "Eggs" },
        { name: "Patrick Liu", item: "Romeo" },
        { name: "Rohun Baxi", item: "Juliet" },
        { name: "Hanson", item: "Batman" },
        { name: "Erwin", item: "Robin" },
        { name: "Yash Dani", item: "Sherlock" },
        { name: "luca", item: "Watson" },
        { name: "Vikram Kaushik", item: "Ketchup" },
        { name: "ansh", item: "Mustard" },
        { name: "Nick M", item: "Bonnie" },
        { name: "Samyu", item: "Clyde" },
        { name: "Vivek Vijaykumar", item: "Yin" },
        { name: "Anthony", item: "Yang" },
        { name: "diya hasteer", item: "Pen" },
        { name: "Nimisha", item: "Paper" },
        { name: "Stephen Ip", item: "Lock" },
        { name: "Allison Hartley", item: "Key" },
        { name: "Shrishti Roy", item: "Hammer" },
        { name: "Omnia", item: "Nail" },
        { name: "Elliot", item: "Bow" },
        { name: "Nick Tallis", item: "Arrow" },
        { name: "Christina", item: "Cup" },
        { name: "Joseph Tobin", item: "Saucer" },
        { name: "Timmy Dang", item: "Fork" },
        { name: "Luv Goyal", item: "Spoon" },
        { name: "Vedang Lad", item: "Shoes (you're in a group of 3)" },
        { name: "Tia Chang", item: "Feet (you're in a group of 3)" },
        { name: "Anjali", item: "Socks (you're in a group of 3)" },
        { name: "ashwit", item: "Rock" },
        { name: "galen", item: "Roll" },
        { name: "Sadena Rishindran", item: "Black" },
        { name: "Zora", item: "White" },
        { name: "Chloe Chan", item: "Day" },
        { name: "Jack Muraika", item: "Night" },
        { name: "Samrit Mathur", item: "War" },
        { name: "Somya", item: "Peace" },
        { name: "Natasha Cheung", item: "Right" },
        { name: "Dhruv Vaish", item: "Left" },
        { name: "Shreya Shekhar", item: "Up" },
        { name: "Allen", item: "Down" },
        { name: "Ali", item: "Hot" },
        { name: "Paul", item: "Cold" },
        { name: "Tarun", item: "Bread" },
        { name: "Zachary Zhang", item: "Butter" },
        { name: "Rachel Lau", item: "Gin" },
        { name: "Alexandra Li", item: "Tonic" },
        { name: "Jared", item: "Nuts" },
        { name: "Ashwat", item: "Bolts" },
        { name: "hope marie", item: "King" },
        { name: "Oliver", item: "Queen" }
    ];

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
                setTimeout(typeHeaderText, 80);
            } else {
                headerTextElement.innerHTML += '<span class="cursor"></span>';
            }
        }
        typeHeaderText();
    }

    function createCardHTML(event, isPast = false) {
        let actionButtonHTML = '';
        if (event.lookup_item === 'housewarming') {
            actionButtonHTML = `
                <button data-modal-toggle="lookup-modal" class="game-button w-full">
                    Item Lookup
                </button>
            `;
        } else if (event.lookup_item === 'halloween') {
            actionButtonHTML = `
                <button data-modal-toggle="halloween-modal" class="game-button w-full">
                    Vote for Costume
                </button>
            `;
        } else if (event.unique_id && event.unique_id.startsWith('poker-')) {
            actionButtonHTML = `
                <button data-modal-toggle="ledger-modal" data-event-id="${event.unique_id}" class="game-button w-full">
                    View Ledger
                </button>
            `;
        }
        if (event.photos && event.photos.length > 0) {
            actionButtonHTML += `
                <button data-modal-toggle="photos-modal" data-event-photos='${JSON.stringify(event.photos)}' data-event-title="${event.title}" class="game-button w-full" style="margin-top: 0.5rem;">
                    View Photos
                </button>
            `;
        }

        return `
            <div class="game-card ${isPast ? 'past' : ''}">
                <div class="game-card-image" style="background-image: url('${event.image_url}');"></div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-lg mb-2 ${isPast ? '' : 'text-yellow-300'}">${event.title}</h3>
                    <p class="text-xs ${isPast ? '' : 'text-cyan-300'} mb-3">[ ${event.date} ]</p>
                    <p class="text-sm leading-relaxed">${event.description}</p>
                
                    <div class="mt-auto pt-4">
                        ${actionButtonHTML}
                    </div>
                </div>
            </div>
        `;
    }

    const allEvents = [...EVENTS];
    allEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    const pastGrid = document.getElementById('past-events-grid');
    if (pastGrid) {
        if (allEvents.length > 0) {
            pastGrid.innerHTML = allEvents.map(e => createCardHTML(e, true)).join('');
        } else {
            pastGrid.innerHTML = '<p class="text-center col-span-full">NO SAVED DATA.</p>';
        }
    }

    // --- Modal Handling Logic ---
    const setupModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const closeButtons = modal.querySelectorAll(`[data-modal-hide="${modalId}"]`);

        const showModal = () => modal.classList.remove('hidden');
        const hideModal = () => modal.classList.add('hidden');

        // Delegate open clicks for dynamically created elements
        document.body.addEventListener('click', (event) => {
            const targetButton = event.target.closest(`[data-modal-toggle="${modalId}"]`);
            if (targetButton && modalId !== 'ledger-modal' && modalId !== 'photos-modal') {
                showModal();
            }
        });

        closeButtons.forEach(button => button.addEventListener('click', hideModal));

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                hideModal();
            }
        });
    };

    setupModal('lookup-modal');
    setupModal('ledger-modal');
    setupModal('halloween-modal');
    setupModal('photos-modal');

    // --- PHOTO GALLERY LOGIC ---
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-modal-toggle="photos-modal"]');
        if (btn) {
            const photos = JSON.parse(btn.dataset.eventPhotos);
            const title = btn.dataset.eventTitle;
            const track = document.getElementById('photos-track');
            const photosTitle = document.getElementById('photos-modal-title');
            const counter = document.getElementById('photos-counter');

            photosTitle.textContent = title;
            track.innerHTML = photos.map(src => `
                <img src="${src}" class="photos-slide" alt="Event photo">
            `).join('');

            let current = 0;
            const total = photos.length;

            function goTo(index) {
                current = (index + total) % total;
                track.style.transform = `translateX(-${current * 100}%)`;
                counter.textContent = `${current + 1} / ${total}`;
            }

            goTo(0);

            document.getElementById('photos-prev').onclick = () => goTo(current - 1);
            document.getElementById('photos-next').onclick = () => goTo(current + 1);

            document.getElementById('photos-modal').classList.remove('hidden');
        }
    });

    // --- ITEM LOOKUP LOGIC ---
    const lookupForm = document.getElementById('lookup-form');
    const lookupResult = document.getElementById('lookup-result');

    if (lookupForm && lookupResult) {
        lookupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name').value.trim().toLowerCase();
            if (!nameInput) return;

            const inputParts = nameInput.split(/\s+/);
            const matches = [];

            HOUSEWARMING_ASSIGNMENTS.forEach(entry => {
                const fullNameLower = entry.name.toLowerCase();
                const fullNameParts = fullNameLower.split(/\s+/);

                let isMatch = false;
                if (inputParts.length <= fullNameParts.length) {
                    if (inputParts.length === 1) {
                        if (inputParts[0] === fullNameParts[0]) {
                            isMatch = true;
                        }
                    } else {
                        if (inputParts[0] === fullNameParts[0]) {
                            let matchAll = true;
                            for (let i = 1; i < inputParts.length; i++) {
                                if (!fullNameParts[i].startsWith(inputParts[i])) {
                                    matchAll = false;
                                    break;
                                }
                            }
                            if (matchAll) isMatch = true;
                        }
                    }
                }
                if (isMatch) matches.push(entry);
            });

            lookupResult.classList.remove('hidden', 'text-green-400', 'text-yellow-300', 'text-red-400');
            if (matches.length === 1) {
                lookupResult.classList.add('text-green-400');
                lookupResult.innerHTML = `Hi <strong>${matches[0].name}</strong>!<br>Your item is: <strong>${matches[0].item}</strong>`;
            } else if (matches.length > 1) {
                lookupResult.classList.add('text-yellow-300');
                lookupResult.innerHTML = `Multiple matches found for '${nameInput}'. Please enter full name.`;
            } else {
                lookupResult.classList.add('text-red-400');
                lookupResult.innerHTML = `Name '${nameInput}' not found on assignment list.`;
            }
        });
    }

    // --- POKER LEDGER COMPUTATION & RENDER ---
    const ledgerModal = document.getElementById('ledger-modal');
    const ledgerTitle = document.getElementById('ledger-title');

    function populateTable(tableBodyId, entries, isUniversal = false) {
        const tableBody = document.getElementById(tableBodyId);
        if (!tableBody) return;

        tableBody.innerHTML = '';
        if (entries && entries.length > 0) {
            entries.forEach(entry => {
                const buyIn = Number(entry.buy_in).toFixed(2);
                const cashOut = Number(entry.cash_out).toFixed(2);
                const net = Number(entry.net).toFixed(2);
                const netSign = entry.net > 0 ? '+' : '';
                const netClass = entry.net >= 0 ? 'text-green-400' : 'text-red-400';
                
                let roiTd = '';
                if (isUniversal) {
                    const roiVal = entry.buy_in > 0 ? ((entry.net / entry.buy_in) * 100).toFixed(1) : '0.0';
                    const roiSign = roiVal > 0 ? '+' : '';
                    const roiClass = roiVal >= 0 ? 'text-green-400' : 'text-red-400';
                    roiTd = `<td class="${roiClass}">${roiSign}${roiVal}%</td>`;
                }

                const row = `
                    <tr>
                        <td>${entry.player}</td>
                        <td>$${buyIn}</td>
                        <td>$${cashOut}</td>
                        <td class="${netClass}">${netSign}$${net}</td>
                        ${roiTd}
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
        } else {
            const colSpan = isUniversal ? 5 : 4;
            tableBody.innerHTML = `<tr><td colspan="${colSpan}" class="text-center">NO LEDGER DATA FOUND.</td></tr>`;
        }
    }

    function getUniversalLedger(upToEventId) {
        const sortedEventIds = Object.keys(POKER_LEDGERS).sort();
        const playerSummary = {};

        for (const eventId of sortedEventIds) {
            const ledger = POKER_LEDGERS[eventId];
            if (!ledger || !ledger.entries) continue;

            for (const entry of ledger.entries) {
                const p = entry.player;
                if (!playerSummary[p]) {
                    playerSummary[p] = { buy_in: 0, cash_out: 0, net: 0 };
                }
                playerSummary[p].buy_in += entry.buy_in;
                playerSummary[p].cash_out += entry.cash_out;
                playerSummary[p].net += entry.net;
            }

            if (upToEventId && eventId === upToEventId) break;
        }

        const summaryEntries = Object.keys(playerSummary).map(p => ({
            player: p,
            buy_in: Math.round(playerSummary[p].buy_in * 100) / 100,
            cash_out: Math.round(playerSummary[p].cash_out * 100) / 100,
            net: Math.round(playerSummary[p].net * 100) / 100
        }));

        summaryEntries.sort((a, b) => b.net - a.net);
        return summaryEntries;
    }

    function openLedgerModal(eventId) {
        const eventLedger = POKER_LEDGERS[eventId];
        if (!eventLedger) return;

        ledgerTitle.textContent = eventLedger.title || 'Poker Ledger';

        const eventEntries = [...eventLedger.entries].sort((a, b) => b.net - a.net);
        populateTable('event-ledger-table-body', eventEntries);

        const universalEntries = getUniversalLedger(eventId);
        populateTable('universal-ledger-table-body', universalEntries, true);

        // Reset to first tab
        const activeTab = document.querySelector('.ledger-tab.active');
        const activeContent = document.querySelector('.ledger-tab-content.active');
        if (activeTab) activeTab.classList.remove('active');
        if (activeContent) activeContent.classList.remove('active');

        const defaultTab = document.querySelector('.ledger-tab[data-tab="event-ledger-content"]');
        const defaultContent = document.getElementById('event-ledger-content');
        if (defaultTab) defaultTab.classList.add('active');
        if (defaultContent) defaultContent.classList.add('active');

        ledgerModal.classList.remove('hidden');
    }

    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-modal-toggle="ledger-modal"]');
        if (btn) {
            const eventId = btn.dataset.eventId;
            if (eventId) openLedgerModal(eventId);
        }
    });

    // --- Tab Switching Logic ---
    const tabContainer = document.querySelector('.ledger-tab-nav');
    if (tabContainer) {
        tabContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('ledger-tab')) {
                const targetTabId = event.target.dataset.tab;

                tabContainer.querySelectorAll('.ledger-tab').forEach(tab => tab.classList.remove('active'));
                event.target.classList.add('active');

                document.querySelectorAll('.ledger-tab-content').forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTabId) {
                        content.classList.add('active');
                    }
                });
            }
        });
    }

    // --- Halloween Voting Logic ---
    const halloweenVoteForm = document.getElementById('halloween-vote-form');
    const halloweenResults = document.getElementById('halloween-results');

    function showThankYouMessage() {
        if (halloweenResults) {
            halloweenResults.innerHTML = '<p class="text-lg text-yellow-300">Thank you for voting!</p>';
        }
    }

    if (halloweenVoteForm) {
        if (localStorage.getItem('hasVoted') === 'true') {
            halloweenVoteForm.style.display = 'none';
            showThankYouMessage();
        }

        halloweenVoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const costumeInput = document.getElementById('costume-name');
            if (costumeInput && costumeInput.value.trim()) {
                localStorage.setItem('hasVoted', 'true');
                halloweenVoteForm.style.display = 'none';
                showThankYouMessage();
            }
        });
    }

    // Global listener for Escape key
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
