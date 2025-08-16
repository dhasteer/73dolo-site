# game_logic.py
# Contains all business logic for the housewarming check-in game.

import os
import csv
import json

# --- Game-Specific Configuration ---
# Get the absolute path of the directory this script is in
APP_DIR = os.path.dirname(os.path.abspath(__file__))
# Build absolute paths to your data files
ASSIGNMENTS_FILE = os.path.join(APP_DIR, 'assignments.csv')
STATUS_FILE = os.path.join(APP_DIR, 'party_status.json')
HOSTS = ['Divija', 'Claire', 'Rhea']

# --- Core Game Functions ---

def initialize_party_status():
    """
    Reads the master assignments.csv and creates a live status file.
    This distributes items for pending guests among the hosts.
    This function should be called once when the main app starts.
    """
    if os.path.exists(STATUS_FILE):
        print("Party status file already exists. Skipping initialization.")
        return

    try:
        with open(ASSIGNMENTS_FILE, mode='r', newline='', encoding='utf-8') as csvfile:
            assignments = list(csv.DictReader(csvfile))
    except FileNotFoundError:
        print(f"ERROR: Cannot initialize party. {ASSIGNMENTS_FILE} not found.")
        return

    # Base structure for the live status
    status = {
        "hosts": {host: [] for host in HOSTS},
        "arrived_guests": {},
        "pending_guests": {}
    }

    # Add hosts to the 'arrived' list by default with their own items
    # host_assignments = {row['Name']: row['Item'] for row in assignments if row['Name'] in HOSTS}
    # for host in HOSTS:
    #     status['arrived_guests'][host] = host_assignments.get(host, "N/A - Hosting Duty")

    # Get all non-host guests
    guest_assignments = [row for row in assignments if row['Name'] not in HOSTS]
    
    # Distribute items for pending guests to hosts in a round-robin fashion
    for i, guest in enumerate(guest_assignments):
        host_for_item = HOSTS[i % len(HOSTS)]
        status['hosts'][host_for_item].append(guest['Item'])
        status['pending_guests'][guest['Name']] = guest['Item']
    
    # Write the initial state to the status file
    with open(STATUS_FILE, 'w') as f:
        json.dump(status, f, indent=4)
    print("Party status initialized successfully.")


def handle_guest_checkin(user_input_name):
    """
    Processes a guest check-in with specific, flexible name matching.
    - A single word must match a first name exactly.
    - Multiple words can match a first name + the start of a last name.
    Returns a tuple: (message_to_flash, category)
    """
    if not user_input_name:
        return ("Please enter a name.", "error")

    try:
        # with open(ASSIGNMENTS_FILE, 'r') as f_assign:
        #     all_assignments = list(csv.DictReader(f_assign))
        with open(STATUS_FILE, 'r') as f_status:
            status = json.load(f_status)
    except FileNotFoundError:
        return ("SYSTEM ERROR: Cannot find data files. Please contact a host.", "error")

    user_input_lower = user_input_name.lower()

    for host in HOSTS:
        if user_input_lower == host.lower():
            # This is an explicit host lookup.
            items_held = status['hosts'][host]
            if items_held:
                item_list_str = "\n- " + "\n- ".join(sorted(items_held))
                message = f"Hi {host}! You currently are assigned to {len(items_held)} item(s):{item_list_str}"
            else:
                message = f"Hi {host}! You are not currently assigned to any items for guests."
            return (message, 'success')

    # --- If not a host, proceed with guest matching logic ---
    matches = []
    input_parts = user_input_lower.split()

    all_assignments = status['arrived_guests'].copy()
    all_assignments.update(status['pending_guests'])
    for person in all_assignments:
        # Skip matching against hosts in the general guest lookup
        if person in HOSTS:
            continue

        full_name_lower = person.lower()
        full_name_parts = full_name_lower.split()
        
        is_a_match = False

        if len(input_parts) > len(full_name_parts):
            continue

        if len(input_parts) == 1:
            if user_input_lower == full_name_parts[0]:
                is_a_match = True
        else:
            if input_parts[0] == full_name_parts[0]:
                all_subsequent_parts_match = True
                for i in range(1, len(input_parts)):
                    if not full_name_parts[i].startswith(input_parts[i]):
                        all_subsequent_parts_match = False
                        break
                if all_subsequent_parts_match:
                    is_a_match = True

        if is_a_match:
            matches.append((person, all_assignments[person]))

    if len(matches) == 0:
        return (f"'{user_input_name}' not found on the guest list. Please check your spelling.", "error")
    
    if len(matches) > 1:
        return (f"Multiple people found for '{user_input_name}'. Please be more specific (e.g., 'Rob J').", "warning")

    match = matches[0]
    found_name, found_item = match
    
    # --- Guest Check-in Logic ---
    if found_name in status['arrived_guests']:
        message = f"Welcome back, {found_name}! Your item is {status['arrived_guests'][found_name]}."
        return (message, 'success')
    
    elif found_name in status['pending_guests']:
        for host, items in status['hosts'].items():
            if found_item in items:
                status['hosts'][host].remove(found_item)
                break
        
        del status['pending_guests'][found_name]
        status['arrived_guests'][found_name] = found_item

        with open(STATUS_FILE, 'w') as f:
            json.dump(status, f, indent=4)
        
        message = f"Welcome, {found_name}! Your item is {found_item}."
        return (message, 'success')
    
    return ("An unexpected error occurred. Please see a host.", "error")
