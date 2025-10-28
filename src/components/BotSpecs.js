import React from "react";

function BotSpecs({ bot, onEnlist, onBack }) {
  return (
    <div className="bot-specs">
      <h2>{bot.name} Specs</h2>
      <img src={bot.avatar_url} alt={bot.name} width="200" />
      <p><strong>Class:</strong> {bot.bot_class}</p>
      <p><strong>Health:</strong> {bot.health}</p>
      <p><strong>Damage:</strong> {bot.damage}</p>
      <p><strong>Armor:</strong> {bot.armor}</p>
      <p><strong>Catchphrase:</strong> {bot.catchphrase}</p>
      <div className="spec-actions">
        <button className="enlist-btn" onClick={() => onEnlist(bot)}>Enlist</button>
        <button className="back-btn" onClick={onBack}>Back to Collection</button>
      </div>
    </div>
  );
}

export default BotSpecs;
