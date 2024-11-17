import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminTable(props) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const rowsPerPage = 10;

  const sortedEvents = [...props.admins].sort((a, b) => {
    if (!sortColumn) return 0;
    const isAsc = sortDirection === "asc";
    if (a[sortColumn] < b[sortColumn]) return isAsc ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return isAsc ? 1 : -1;
    return 0;
  });
  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;
  const currentAdmins = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(props.admins.length / rowsPerPage);

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
  const deleteUser = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa moderator này chứ?")) {
      try {
        const response = await fetch(
          `https://checkinbackend.onrender.com/auth/deleteUser?id=${id}`
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
              <p>Họ và tên</p> <p>{renderSortCaret("name")}</p>
            </div>
          </th>
          <th>
            <div>
              <p>Username</p>
            </div>
          </th>
          <th onClick={() => handleSort("createAt")}>
            <div>
              <p>Thời điểm khởi tạo</p>
              <p>{renderSortCaret("createAt")}</p>
            </div>
          </th>
          <th>
            <div>
              <p>Hành động</p>
            </div>
          </th>
        </tr>
        {currentAdmins.map((admin, index) => {
          const date = new Date(admin.createdAt);
          return (
            <tr key={index}>
              <td>{admin.name}</td>
              <td>{admin.username}</td>
              <td>{date.toLocaleDateString("en-GB")}</td>
              <td style={{ width: "15%" }}>
                <div style={{ display: "flex" }}>
                  <button
                    className="warningBtn"
                    onClick={() => {
                      navigate(`/manage/createAdmin?id=${admin._id}`);
                    }}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="deleteBtn"
                    style={{ marginLeft: "20px" }}
                    onClick={() => {
                      deleteUser(admin._id);
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
function AdminSearch({ onSearch }) {
  const [searchName, setSearchName] = useState("");
  const [username, setUsername] = useState();

  const handleSearch = () => {
    onSearch(searchName, username);
  };
  return (
    <div className="searchBar">
      <p>Họ và tên:</p>
      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="searchInput"
      />
      <p>Username:</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="searchInput"
        placeholder="Search by username"
      />
      <button onClick={handleSearch} className="searchButton">
        Search
      </button>
    </div>
  );
}
export default function Manage() {
  const navigate = useNavigate();
  const [mods, setMods] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const onSearch = (name, user) => {
    setSearchName(name);
    setSearchUser(user);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://checkinbackend.onrender.com/auth/getUsers"
        );
        const data = await response.json();
        setMods(data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="eventsPage">
      <h2>Danh sách thành viên quản lí:</h2>
      <div className="eventsAction">
        <AdminSearch onSearch={onSearch} />
        <button
          onClick={() => {
            navigate("/manage/createAdmin");
          }}
        >
          Thêm admin
        </button>
      </div>
      <AdminTable
        admins={mods.filter((mod) => {
          return (
            (!searchName ||
              mod.name.toLowerCase().includes(searchName.toLowerCase())) &&
            (!searchUser ||
              mod.username.toLowerCase().includes(searchUser.toLowerCase()))
          );
        })}
      />
    </div>
  );
}
