import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, onBotClick, addToArmy, army }) {
  return (
    <div>
      <h2>Bot Collection</h2>
      <div className="bot-list">
        {bots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            handleClick={onBotClick}
            addToArmy={addToArmy}
            isEnlisted={army.some((b) => b.id === bot.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;




