import { useNavigate } from "react-router-dom";
import GroupSearch from "../../components/GroupSearch";
import GroupTable from "../../components/GroupTable";
import "./Groups.css";
import { useEffect, useState } from "react";
export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "https://checkinbackend.onrender.com/groups/getGroups"
        );
        const data = await response.json();
        setGroups(data.groups);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroups();
  }, []);
  return (
    <div className="groupsPage">
      <h2>Tất cả các nhóm hiện tại</h2>
      <div className="eventsAction">
        <GroupSearch />
        <button
          onClick={() => {
            navigate("/groups/create");
          }}
        >
          Thêm nhóm
        </button>
      </div>
      <GroupTable groups={groups} />
    </div>
  );
}
