import React, { useEffect, useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import BotSpecs from "./components/BotSpecs";
import SortBar from "./components/SortBar";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterClasses, setFilterClasses] = useState([]);

  // Fetch bots from the local JSON server
  useEffect(() => {
    fetch("http://localhost:8001/bots")
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((err) => console.error("Error fetching bots:", err));
  }, []);

  // Filter and sort bots
  const filteredAndSortedBots = bots
    .filter(bot => filterClasses.length === 0 || filterClasses.includes(bot.bot_class))
    .sort((a, b) => {
      if (!sortBy) return 0;
      return b[sortBy] - a[sortBy];
    });

  // Add bot to army (remove from collection, only one per class)
  const addToArmy = (bot) => {
    if (!army.find((b) => b.bot_class === bot.bot_class)) {
      setArmy([...army, bot]);
      setBots(bots.filter((b) => b.id !== bot.id));
      setSelectedBot(null);
    }
  };

  // Remove bot from army (add back to collection)
  const removeFromArmy = (bot) => {
    setArmy(army.filter((b) => b.id !== bot.id));
    setBots([...bots, bot]);
  };

  // Delete bot completely (from backend and UI)
  const deleteBot = (id) => {
    fetch(`http://localhost:8001/bots/${id}`, { method: "DELETE" })
      .then(() => {
        setBots(bots.filter((b) => b.id !== id));
        setArmy(army.filter((b) => b.id !== id));
      });
  };

  // Show bot specs
  const showBotSpecs = (bot) => {
    setSelectedBot(bot);
  };

  // Back to collection
  const backToCollection = () => {
    setSelectedBot(null);
  };

  return (
    <div className="App">
      <h1>🤖 Bot Battlr</h1>
      <YourBotArmy
        army={army}
        removeFromArmy={removeFromArmy}
        deleteBot={deleteBot}
      />
      <SortBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterClasses={filterClasses}
        setFilterClasses={setFilterClasses}
      />
      {selectedBot ? (
        <BotSpecs
          bot={selectedBot}
          onEnlist={addToArmy}
          onBack={backToCollection}
        />
      ) : (
        <BotCollection bots={filteredAndSortedBots} onBotClick={showBotSpecs} />
      )}
    </div>
  );
}

export default App;
