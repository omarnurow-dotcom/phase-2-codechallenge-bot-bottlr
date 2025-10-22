import React from "react";

function SortBar({ sortBy, setSortBy, filterClasses, setFilterClasses }) {
  const classes = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

  const handleFilterChange = (className) => {
    if (filterClasses.includes(className)) {
      setFilterClasses(filterClasses.filter(c => c !== className));
    } else {
      setFilterClasses([...filterClasses, className]);
    }
  };

  return (
    <div className="sort-bar">
      <div>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="health">Health</option>
          <option value="damage">Damage</option>
          <option value="armor">Armor</option>
        </select>
      </div>
      <div>
        <label>Filter by class: </label>
        {classes.map(cls => (
          <label key={cls}>
            <input
              type="checkbox"
              checked={filterClasses.includes(cls)}
              onChange={() => handleFilterChange(cls)}
            />
            {cls}
          </label>
        ))}
      </div>
    </div>
  );
}

export default SortBar;
