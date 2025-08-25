from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from datetime import datetime
from zoneinfo import ZoneInfo

# Import the game-specific logic
import housewarming_game
import poker_game

# --- Initialize App and Configuration ---
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_super_secret_key'

# --- Event Data ---
events = [
    {
        "title": "Housewarming",
        "date": "August 16, 2025",
        "description": "Celebrate our new home with us! Drinks, snacks, and good company await.",
        "image_url": "https://i.guim.co.uk/img/media/908edfd0eb30a60f9cdd73a936b6a36b60d67681/0_130_2150_1290/master/2150.jpg?width=1900&dpr=2&s=none&crop=none",
        "lookup_item": "housewarming",
        "unique_id": "housewarming-2025-08-16"
    },
    {
        "title": "WWM Poker Night",
        "date": "August 23, 2025",
        "description": "An evening of poker, drinks, and conversation. Buy in for $20.",
        "image_url": "https://pgt.pokergomedia.com/cdn-cgi/image/fit=contain,width=1280,quality=65/2019/12/dd51c1dc-3jbevg.jpg",
        "lookup_item": "",
        "unique_id": "poker-2025-08-23" # Unique ID for this specific poker night
    },
]

# --- Main Application Routes ---

@app.route('/')
def home():
    """
    Renders the main home page, sorting events into upcoming and past.
    """
    pacific_tz = ZoneInfo("America/Los_Angeles")
    pacific_time = datetime.now(pacific_tz)
    upcoming_events = []
    past_events = []
    date_format = "%B %d, %Y"

    for event in events:
        try:
            event_date = datetime.strptime(event['date'], date_format)
            if event_date.date() < pacific_time.date():
                past_events.append(event)
            else:
                upcoming_events.append(event)
        except ValueError:
            print(f"Warning: Could not parse date for event '{event['title']}'")
    
    upcoming_events.sort(key=lambda x: datetime.strptime(x['date'], date_format))
    past_events.sort(key=lambda x: datetime.strptime(x['date'], date_format), reverse=True)

    return render_template('video_game_theme_index.html', upcoming_events=upcoming_events, past_events=past_events)


@app.route('/lookup', methods=['POST'])
def lookup():
    """
    Handles the item lookup form for the housewarming event.
    """
    user_input_name = request.form.get('name', '').strip()
    message, category = housewarming_game.handle_guest_checkin(user_input_name)
    flash(message, category)
    return redirect(url_for('home'))

# --- API Routes for Poker Ledger ---

@app.route('/ledger/<event_id>')
def get_ledger(event_id):
    """
    API endpoint to get a specific event's ledger data.
    Calls the logic from the poker_game module.
    """
    ledger_data = poker_game.get_event_ledger(event_id)
    if ledger_data:
        return jsonify(ledger_data)
    return jsonify({"error": "Ledger not found"}), 404

@app.route('/ledger/all')
def get_all_ledgers():
    """
    API endpoint to get the universal ledger.
    Calls the logic from the poker_game module.
    """
    universal_ledger_data = poker_game.get_universal_ledger()
    return jsonify(universal_ledger_data)

# --- Run Application ---
if __name__ == '__main__':
    housewarming_game.initialize_party_status()
    app.run(debug=True)

# from flask import Flask, render_template, request, redirect, url_for, flash
# from datetime import datetime

# # Import the game-specific logic from our new file
# import housewarming_game

# # --- Initialize App and Configuration ---
# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'your_super_secret_key'

# # --- Event Data (Generic) ---
# # This can be expanded for other events in the future.
# events = [
#     {
#         "title": "Housewarming",
#         "date": "August 16, 2025",
#         "description": "Celebrate our new home with us! Drinks, snacks, and good company await.",
#         "image_url": "https://i.guim.co.uk/img/media/908edfd0eb30a60f9cdd73a936b6a36b60d67681/0_130_2150_1290/master/2150.jpg?width=1900&dpr=2&s=none&crop=none",
# #        "image_url": "https://placehold.co/600x400/f472b6/ffffff?text=Housewarming",
#         "lookup_item": "housewarming" # Used to show the lookup button for this event
#     },
#     {
#         "title": "WWM Poker Night",
#         "date": "August 23, 2025",
#         "description": "An evening of poker, drinks, and conversation. Buy in for $20.",
#         "image_url": "https://pgt.pokergomedia.com/cdn-cgi/image/fit=contain,width=1280,quality=65/2019/12/dd51c1dc-3jbevg.jpg",
#         "lookup_item": "" # Used to show the lookup button for this event
#     },
# ]

# # --- Main Application Routes ---

# @app.route('/')
# def home():
#     """
#     Renders the main home page, sorting events into upcoming and past.
#     """
#     today = datetime.now()
#     upcoming_events = []
#     past_events = []
#     date_format = "%B %d, %Y"

#     for event in events:
#         try:
#             event_date = datetime.strptime(event['date'], date_format)
#             if event_date.date() < today.date():
#                 past_events.append(event)
#             else:
#                 upcoming_events.append(event)
#         except ValueError:
#             print(f"Warning: Could not parse date for event '{event['title']}'")
    
#     upcoming_events.sort(key=lambda x: datetime.strptime(x['date'], date_format))
#     past_events.sort(key=lambda x: datetime.strptime(x['date'], date_format), reverse=True)

#     return render_template('video_game_theme_index.html', upcoming_events=upcoming_events, past_events=past_events)


# @app.route('/lookup', methods=['POST'])
# def lookup():
#     """
#     This route now acts as a simple wrapper. It takes the form data
#     and passes it to our dedicated game logic handler.
#     """
#     user_input_name = request.form.get('name', '').strip()
    
#     # Call the handler function from housewarming_game.py
#     message, category = housewarming_game.handle_guest_checkin(user_input_name)
    
#     # Flash the results and redirect
#     flash(message, category)
#     return redirect(url_for('home'))


# # --- Run Application ---
# if __name__ == '__main__':
#     # Initialize the party game state when the server starts
#     housewarming_game.initialize_party_status()
#     app.run(debug=True)

