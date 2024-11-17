import { useState } from "react";
export default function ParticipantSearch({ onSearch }) {
  const [searchName, setSearchName] = useState("");
  const [MSSV, setMSSV] = useState("");
  const [status, setStatus] = useState(false);

  const handleSearch = () => {
    onSearch(searchName, MSSV, status);
  };

  return (
    <div className="searchBar" style={{ marginTop: "40px" }}>
      <p>Họ và tên:</p>
      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="searchInput"
      />
      <p>Mã số sinh viên:</p>
      <input
        type="text"
        value={MSSV}
        onChange={(e) => setMSSV(e.target.value)}
        className="searchInput"
        placeholder="Mã số sinh viên"
      />
      <p>Tình trạng check-in</p>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value === "true")}
        className="searchInput"
      >
        <option value={"true"}>Đã check-in</option>
        <option value={"false"}>Chưa check-in</option>
      </select>
      <button onClick={handleSearch} className="searchButton">
        Search
      </button>
    </div>
  );
}
