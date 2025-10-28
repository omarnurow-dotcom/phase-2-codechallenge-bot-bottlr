import React from "react";

function BotCard({ bot, handleClick, handleDelete, addToArmy, isEnlisted }) {
  return (
    <div className="bot-card" onClick={() => handleClick(bot)}>
      <div className="avatar-wrap">
        <img src={bot.avatar_url} alt={bot.name} width="120" />
        {isEnlisted ? <span className="badge">Enlisted</span> : null}
      </div>
      <h3>{bot.name}</h3>
      <p className="muted">Class: {bot.bot_class}</p>
      <div className="stats">
        <span>❤️ {bot.health}</span>
        <span>⚔️ {bot.damage}</span>
        <span>🛡️ {bot.armor}</span>
      </div>

      <div className="card-actions">
        {addToArmy ? (
          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToArmy(bot);
            }}
          >
            ➕ Add
          </button>
        ) : null}

        {handleDelete ? (
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(bot);
            }}
          >
            ❌
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default BotCard;
