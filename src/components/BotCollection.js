import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, onBotClick }) {
  return (
    <div>
      <h2>Bot Collection</h2>
      <div className="bot-list">
        {bots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            handleClick={onBotClick}
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;


