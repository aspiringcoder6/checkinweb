import React, { useState } from "react";
export default function GroupSearch({ onSearch }) {
  const [searchName, setSearchName] = useState("");
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const handleSearch = () => {
    onSearch(searchName, min, max);
  };

  return (
    <div className="searchBar">
      <p>Tên sự kiện:</p>
      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="searchInput"
      />
      <p>Thành viên tối thiểu:</p>
      <input
        type="number"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="searchInput"
        placeholder="Minimum participants"
      />
      <p>Thành viên tối đa:</p>
      <input
        type="number"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        className="searchInput"
        placeholder="Maximum participants"
      />
      <button onClick={handleSearch} className="searchButton">
        Search
      </button>
    </div>
  );
}
