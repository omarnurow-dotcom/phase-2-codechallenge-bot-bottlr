# 🤖 Bot Battlr

## Author
Omar Edin Nurow

## Description
A React app that allows users to build their own bot army by viewing, selecting, and deleting bots. Users can browse through a list of robots, view their details, enlist them into their army (only one per class, removes from collection), release them from the army, or discharge them forever from the backend. Includes advanced features like sorting, filtering, and detailed bot specs view.

## Features
### Core Features
- View profiles of all bots rendered in BotCollection
- Add an individual bot to my army by clicking on it (enlisted only once per class, removes from collection)
- Release a bot from my army by clicking on it (adds back to collection)
- Discharge a bot from their service forever by clicking the red "x" button (deletes from backend and frontend)

### Advanced Features
- View detailed bot specs by clicking on a bot card (shows catchphrase and full details)
- Enlist bot from specs view with dedicated button
- Sort bots by health, damage, or armor
- Filter bots by class (multiple selections allowed)
- Only one bot per class can be enlisted in the army

## Setup
1. Clone this repo
2. Run `npm install`
3. Start the backend server:
   ```bash
   npx json-server --watch db.json --port 8001
   ```
4. In a new terminal, start the React app:
   ```bash
   npm start
   ```
5. Open http://localhost:3000 in your browser

## Technologies Used
- React
- JSON Server (for backend)
- CSS for styling

## License
MIT License

