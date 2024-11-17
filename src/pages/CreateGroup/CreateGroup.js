import { useEffect, useState } from "react";
import ParticipantUpload from "../../components/ParticipantUpload";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateGroup() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const watch = queryParams.get("watch");
  const [groupData, setGroupData] = useState({
    name: "",
    desc: "",
    participants: [],
  });
  const changeData = (key, value) => {
    setGroupData((prevData) => {
      return { ...prevData, [key]: value };
    });
  };
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(
          `https://checkinbackend.onrender.com/groups/getGroup?id=${id}`
        );
        const data = await response.json();
        setGroupData(data.group);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGroup();
  }, []);
  const createGroup = async () => {
    try {
      const response = await fetch(
        "https://checkinbackend.onrender.com/groups/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupData: groupData,
          }),
        }
      );
      const data = await response.json();
      alert(data.message);
      navigate("/groups");
    } catch (err) {
      console.log(err);
    }
  };
  const editGroup = async () => {
    try {
      const response = await fetch(
        "https://checkinbackend.onrender.com/groups/editGroup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupData: groupData,
            id: id,
          }),
        }
      );
      const data = await response.json();
      alert(data.message);
      navigate("/groups");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="createEventPage">
      <h2>Tạo nhóm check-in mới:</h2>
      <h3>Thông tin cơ bản</h3>
      <div className="inputGroup">
        <label>Tên nhóm:</label>
        <input
          type="text"
          value={groupData.name}
          onChange={(e) => {
            changeData("name", e.target.value);
          }}
          disabled={watch}
        />
      </div>
      <div className="inputGroup">
        <label>Mô tả nhóm:</label>
        <textarea
          type="text"
          value={groupData.desc}
          onChange={(e) => {
            changeData("desc", e.target.value);
          }}
          disabled={watch}
        />
      </div>
      <ParticipantUpload
        participants={groupData.participants}
        onChange={(newParticipants) => {
          changeData("participants", newParticipants);
        }}
        watch={watch}
      />
      <div className="createInteractions">
        <button
          className="warningBtn"
          onClick={() => {
            navigate(-1);
          }}
        >
          {watch ? "Quay về" : "Hủy bỏ"}
        </button>
        {!watch && (
          <button
            className="interactBtn"
            onClick={() => {
              if (id) {
                editGroup();
              } else {
                createGroup();
              }
            }}
          >
            {id ? "Edit nhóm" : "Tạo nhóm"}
          </button>
        )}
      </div>
    </div>
  );
}
