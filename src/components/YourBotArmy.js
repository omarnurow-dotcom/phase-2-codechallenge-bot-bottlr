import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ army, removeFromArmy, deleteBot }) {
  return (
    <div>
      <h2>Your Bot Army</h2>
      <div className="bot-list">
        {army.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            handleClick={removeFromArmy}
            handleDelete={deleteBot}
          />
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;


