import { useState } from "react";
export default function Participantstable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const rowsPerPage = 10;

  const sortedEvents = [...props.participants].sort((a, b) => {
    if (!sortColumn) return 0;
    const isAsc = sortDirection === "asc";
    if (a[sortColumn] < b[sortColumn]) return isAsc ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return isAsc ? 1 : -1;
    return 0;
  });
  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;
  const currentParticipants = sortedEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(props.participants.length / rowsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  const renderSortCaret = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? " ▲" : " ▼";
    }
    return "";
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <table className="eventsTable nohover">
        <tr>
          <th onClick={() => handleSort("STT")}>
            <div>
              <p>STT</p> <p>{renderSortCaret("STT")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("Name")}>
            <div>
              <p>Họ và tên</p> <p>{renderSortCaret("Name")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("MSSV")}>
            <div>
              <p>MSSV</p> <p>{renderSortCaret("MSSV")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("status")}>
            <div>
              <p>Tình trạng check-in</p> <p>{renderSortCaret("status")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("checkInTime")}>
            <div>
              <p>Thời gian check-in</p> <p>{renderSortCaret("checkInTime")}</p>
            </div>
          </th>
          <th>
            <div>
              <p>Hành động</p>
            </div>
          </th>
        </tr>
        {currentParticipants.map((participant, index) => (
          <tr key={index}>
            <td>{participant.STT}</td>
            <td>{participant.Name}</td>
            <td>{participant.MSSV}</td>
            <td>{participant.status ? "Đã check-in" : "Chưa check-in"}</td>
            <td>{participant.checkinTime}</td>
            <td style={{ width: "15%" }}>
              <button className="warningBtn">Check-in</button>
              <button className="deleteBtn" style={{ marginLeft: "20px" }}>
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </table>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pageButton ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
