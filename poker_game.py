# poker_game.py

from datetime import datetime

# --- Poker Ledger Data ---
# Storing ledger data in a dictionary. The key is the event's unique_id.
poker_ledgers = {
    "poker-2025-08-23": {
        "title": "WWM Poker Night (Aug 23)",
        "entries": [
            {"player": "dh", "buy_in": 20, "cash_out": 50.50, "net": 30.50},
            {"player": "gk", "buy_in": 40, "cash_out": 49, "net": 9},
            {"player": "vb", "buy_in": 55, "cash_out": 52.25, "net": -2.75},
            {"player": "ad", "buy_in": 30, "cash_out": 0, "net": -30},
            {"player": "ws", "buy_in": 20, "cash_out": 11.50, "net": -8.50},
            {"player": "rg", "buy_in": 20, "cash_out": 18.25, "net": -1.75},
            {"player": "ss", "buy_in": 20, "cash_out": 0, "net": -20},
            {"player": "dn", "buy_in": 20, "cash_out": 43.50, "net": 23.50}
        ]
    },
    "poker-2025-11-15": {
        "title": "WWM Poker Night (Nov 15)",
        "entries": [
            {"player": "cd", "buy_in": 20, "cash_out": 0, "net": -20},
            {"player": "vb", "buy_in": 80, "cash_out": 5, "net": -75},
            {"player": "ws", "buy_in": 20, "cash_out": 32.50, "net": 12.50},
            {"player": "ky", "buy_in": 40, "cash_out": 15.40, "net": -24.60},
            {"player": "dh", "buy_in": 20, "cash_out": 104.80, "net": 84.80},
            {"player": "mc", "buy_in": 40, "cash_out": 62.20, "net": 22.20},
            {"player": "ch", "buy_in": 20, "cash_out": 20.20, "net": 0.20},
            {"player": "bg", "buy_in": 20, "cash_out": 45.20, "net": 25.20},
            {"player": "pka", "buy_in": 60, "cash_out": 34.70, "net": -25.30}
        ]
    },
    "poker-2026-01-10": {
        "title": "WWM Poker Night (Jan 10)",
        "entries": [
            {"player": "ad", "buy_in": 20, "cash_out": 0, "net": -20},
            {"player": "ss", "buy_in": 20, "cash_out": 16.50, "net": -3.50},
            {"player": "vb", "buy_in": 20, "cash_out": 0, "net": -20},
            {"player": "dh", "buy_in": 40, "cash_out": 35.25, "net": -4.75},
            {"player": "cs", "buy_in": 20, "cash_out": 41.75, "net": 21.75},
            {"player": "ky", "buy_in": 20, "cash_out": 39.50, "net": 19.50},
            {"player": "sm", "buy_in": 20, "cash_out": 9, "net": -11},
            {"player": "bm", "buy_in": 20, "cash_out": 20.75, "net": 0.75},
            {"player": "cd", "buy_in": 20, "cash_out": 37.25, "net": 17.25}
        ]
    },
    "poker-2026-02-27": {
        "title": "WWM Poker Night (Feb 27)",
        "entries": [
            {"player": "ws", "buy_in": 40, "cash_out": 0, "net": -40},
            {"player": "rl", "buy_in": 20, "cash_out": 34.70, "net": 14.70},
            {"player": "mc", "buy_in": 20, "cash_out": 43.10, "net": 23.10},
            {"player": "ky", "buy_in": 20, "cash_out": 98.40, "net": 78.40},
            {"player": "pke", "buy_in": 20, "cash_out": 54.90, "net": 34.90},
            {"player": "bm", "buy_in": 40, "cash_out": 0, "net": -40},
            {"player": "vb", "buy_in": 40, "cash_out": 38.60, "net": -1.40},
            {"player": "hc", "buy_in": 20, "cash_out": 0, "net": -20},
            {"player": "bg", "buy_in": 20, "cash_out": 0, "net": -20},
            {"player": "dh", "buy_in": 40, "cash_out": 10.30, "net": -29.70}
        ]
    },
    # --- Add future poker night ledgers here ---
    # "poker-2025-09-20": { ... }
}


def get_event_ledger(event_id):
    """
    Retrieves and sorts the ledger data for a specific event ID.
    """
    ledger = poker_ledgers.get(event_id)
    if ledger and 'entries' in ledger:
        # Sort entries by 'net' value, from highest to lowest
        ledger['entries'] = sorted(ledger['entries'], key=lambda x: x['net'], reverse=True)
    return ledger

def get_universal_ledger(up_to_event_id=None):
    """
    Combines all ledger entries into a single, consolidated universal ledger.
    If up_to_event_id is provided, only includes games up to and including that event.
    """
    all_entries = []
    
    # Sort event IDs to ensure chronological order
    sorted_event_ids = sorted(list(poker_ledgers.keys()))
    
    for event_id in sorted_event_ids:
        data = poker_ledgers[event_id]
        for entry in data.get('entries', []):
            event_date = datetime.strptime(event_id.replace("poker-", ""), "%Y-%m-%d").strftime("%b %d, %Y")
            all_entries.append({**entry, "event": event_date})
            
        if up_to_event_id and event_id == up_to_event_id:
            break

    # Consolidate player stats across all games
    player_summary = {}
    for entry in all_entries:
        player = entry['player']
        if player not in player_summary:
            player_summary[player] = {'buy_in': 0, 'cash_out': 0, 'net': 0}
        player_summary[player]['buy_in'] += entry['buy_in']
        player_summary[player]['cash_out'] += entry['cash_out']
        player_summary[player]['net'] += entry['net']

    # Convert dictionary to a list of entries for easy rendering
    summary_entries = [
        {
            "player": p, 
            "buy_in": round(d['buy_in'], 2), 
            "cash_out": round(d['cash_out'], 2), 
            "net": round(d['net'], 2)
        }
        for p, d in player_summary.items()
    ]

    return {
        "title": "Universal Ledger",
        "entries": sorted(summary_entries, key=lambda x: x['net'], reverse=True)
    }