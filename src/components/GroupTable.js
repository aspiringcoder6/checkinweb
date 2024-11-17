import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function GroupTable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();
  const rowsPerPage = 10;

  const sortedEvents = [...props.groups].sort((a, b) => {
    if (!sortColumn) return 0;
    const isAsc = sortDirection === "asc";
    if (a[sortColumn] < b[sortColumn]) return isAsc ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return isAsc ? 1 : -1;
    return 0;
  });
  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;
  const currentGroups = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(props.groups.length / rowsPerPage);

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
  const deleteGroup = async (id) => {
    if (window.confirm("Bạn chắc chắn?")) {
      try {
        const response = await fetch(
          `https://checkinbackend.onrender.com/groups/delete?id=${id}`
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
    <div style={{ marginTop: "20px" }}>
      <table className="eventsTable nohover">
        <tr>
          <th onClick={() => handleSort("name")}>
            <div>
              <p>Tên nhóm</p> <p>{renderSortCaret("name")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("quantity")}>
            <div>
              <p>Số lượng thành viên</p> <p>{renderSortCaret("quantity")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("startDate")}>
            <div>
              <p>Ngày khởi tạo</p> <p>{renderSortCaret("startDate")}</p>
            </div>
          </th>
          <th onClick={() => handleSort("updateDate")}>
            <div>
              <p>Thời gian update gần nhất</p>{" "}
              <p>{renderSortCaret("updateDate")}</p>
            </div>
          </th>
          <th>
            <div>
              <p>Hành động</p>
            </div>
          </th>
        </tr>
        {currentGroups.map((group, index) => {
          const createDate = new Date(group.createdAt).toLocaleDateString();
          const updateDate = new Date(group.updatedAt).toLocaleDateString();
          return (
            <tr key={index}>
              <td>{group.name}</td>
              <td>{group.participants.length}</td>
              <td>{createDate}</td>
              <td>{updateDate}</td>
              <td style={{ width: "15%" }}>
                <button
                  className="interactBtn"
                  onClick={() => {
                    navigate(`/groups/create?id=${group._id}&watch=1`);
                  }}
                >
                  Xem
                </button>
                <button
                  className="warningBtn"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    navigate(`/groups/create?id=${group._id}`);
                  }}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="deleteBtn"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    deleteGroup(group._id);
                  }}
                >
                  Xóa
                </button>
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
