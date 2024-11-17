import React, { useState } from "react";
import "./EventsSearch.css";
export default function EventsSearch({ onSearch }) {
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    onSearch(searchName, startDate, endDate);
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
      <p>Ngày bắt đầu:</p>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="searchInput"
        placeholder="Start Date"
      />
      <p>Ngày kết thúc:</p>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="searchInput"
        placeholder="End Date"
      />
      <button onClick={handleSearch} className="searchButton">
        Search
      </button>
    </div>
  );
}
