import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventsTable({ eventsData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();
  const rowsPerPage = 5;

  const sortedEvents = !eventsData
    ? []
    : [...eventsData].sort((a, b) => {
        if (!sortColumn) return 0;
        const isAsc = sortDirection === "asc";
        if (a[sortColumn] < b[sortColumn]) return isAsc ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return isAsc ? 1 : -1;
        return 0;
      });
  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = !eventsData
    ? 0
    : Math.ceil(eventsData.length / rowsPerPage);

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
  const deleteEvent = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa event này?")) {
      try {
        const response = await fetch(
          `https://checkinbackend.onrender.com/events/deleteEvent?id=${id}`
        );
        const data = await response.json();
        alert(data.message);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <table className="eventsTable">
        <tr>
          <th onClick={() => handleSort("name")}>
            <div>
              <p>Tên sự kiện</p> <p>{renderSortCaret("name")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("location")}>
            <div>
              <p>Địa điểm</p> <p>{renderSortCaret("location")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("date")}>
            <div>
              <p>Ngày tổ chức</p> <p>{renderSortCaret("date")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("startTime")}>
            <div>
              <p>Thời gian bắt đầu</p> <p>{renderSortCaret("startTime")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("endTime")}>
            <div>
              <p>Thời gian kết thúc</p> <p>{renderSortCaret("endTime")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("participationRate")}>
            <div>
              <p>Tỉ lệ tham gia</p>{" "}
              <p>{renderSortCaret("participationRate")}</p>
            </div>
          </th>
          <th>
            <p>Hành động</p>
          </th>
        </tr>
        {currentEvents.map((event, index) => {
          const participationRate =
            event.participants.filter((par) => {
              return par.status == true;
            }).length / event.participants.length;
          const date = new Date(event.date).toLocaleDateString();
          return (
            <tr key={index}>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{date}</td>
              <td>{event.startTime}</td>
              <td>{event.endTime}</td>
              <td>{participationRate}</td>
              <td style={{ width: "20%" }}>
                <div>
                  <button
                    className="interactBtn"
                    onClick={() => {
                      navigate(`/events/eventDetail?id=${event._id}`);
                    }}
                  >
                    Xem event
                  </button>
                  <button
                    className="warningBtn"
                    onClick={() => {
                      navigate(`/events/createEvent?id=${event._id}`);
                    }}
                    style={{ marginLeft: "20px" }}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="deleteBtn"
                    style={{ marginLeft: "20px" }}
                    onClick={() => {
                      deleteEvent(event._id);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
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
