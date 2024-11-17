import { useLocation, useNavigate } from "react-router-dom";
import ParticipantUpload from "../../components/ParticipantUpload";
import "./CreateEvent.css";
import { useEffect, useState } from "react";
export default function CreateEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [eventData, setEventData] = useState({
    name: "",
    desc: "",
    type: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    limited: false,
    maximumNumber: 9999,
    participants: [],
    info: {
      name: "",
      contact: "",
    },
    checkInLink: "",
    sheetLink: "",
  });
  const changeData = (key, value) => {
    setEventData((prevData) => {
      return { ...prevData, [key]: value };
    });
  };
  const addEvent = async () => {
    try {
      const response = await fetch(
        "https://checkinbackend.onrender.com/events/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventData: eventData }),
        }
      );
      const data = await response.json();
      alert(data.message);
      navigate("/events");
    } catch (err) {
      console.log(err);
    }
  };
  const editEvent = async () => {
    try {
      const response = await fetch(
        "https://checkinbackend.onrender.com/events/editEvent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventData: eventData, id: id }),
        }
      );
      const data = await response.json();
      alert(data.message);
      navigate("/events");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://checkinbackend.onrender.com/events/getEvent?id=${id}`
        );
        const data = await response.json();
        setEventData(data.event);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, []);
  return (
    <div className="createEventPage">
      <h2>Thêm sự kiện mới:</h2>
      <h3>Thông tin cơ bản</h3>
      <div className="inputGroup">
        <label>Tên sự kiện:</label>
        <input
          type="text"
          value={eventData.name}
          onChange={(e) => {
            changeData("name", e.target.value);
          }}
        />
      </div>
      <div className="inputGroup">
        <label>Mô tả sự kiện:</label>
        <textarea
          type="text"
          value={eventData.desc}
          onChange={(e) => {
            changeData("desc", e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "40px", width: "96%" }}>
        <div className="inputGroup">
          <label>Địa điểm sự kiện:</label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => {
              changeData("location", e.target.value);
            }}
          />
        </div>
        <div className="inputGroup">
          <label>Loại hình sự kiện:</label>
          <input
            type="text"
            value={eventData.type}
            onChange={(e) => {
              changeData("type", e.target.value);
            }}
          />
        </div>
      </div>
      <h3>Thời gian sự kiện:</h3>
      <div className="inputGroup">
        <label>Ngày tổ chức:</label>
        <input
          type="date"
          value={eventData.date}
          onChange={(e) => {
            changeData("date", e.target.value);
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "40px", width: "96%" }}>
        <div className="inputGroup">
          <label>Thời gian bắt đầu:</label>
          <input
            type="time"
            value={eventData.startTime}
            onChange={(e) => {
              changeData("startTime", e.target.value);
            }}
          />
        </div>
        <div className="inputGroup">
          <label>Thời gian kết thúc:</label>
          <input
            type="time"
            value={eventData.endTime}
            onChange={(e) => {
              changeData("endTime", e.target.value);
            }}
          />
        </div>
      </div>
      <h3>Tham gia sự kiện:</h3>
      <div className="inputGroup">
        <label>Sự kiện giới hạn người tham gia không?</label>
        <div
          style={{
            display: "flex",
            gap: "40px",
            width: "96%",
            alignItems: "baseline",
          }}
        >
          <input
            type="radio"
            name="limitParticipation"
            value={true}
            id="yes"
            onChange={(e) => {
              changeData("limited", e.target.value == "true");
            }}
            defaultChecked={!eventData.limited}
          />
          <label htmlFor="yes">Có</label>
          <input
            type="radio"
            name="limitParticipation"
            value={false}
            id="no"
            onChange={(e) => {
              changeData("limited", e.target.value == "true");
            }}
            defaultChecked={eventData.limited}
          />
          <label htmlFor="no">Không</label>
        </div>
      </div>
      <div className="inputGroup">
        <label>Tối đa người tham gia</label>
        <input
          type="number"
          value={eventData.maximumNumber}
          onChange={(e) => {
            changeData("maximumNumber", e.target.value);
          }}
        />
      </div>
      {eventData.limited == true && (
        <>
          <ParticipantUpload
            participants={eventData.participants}
            onChange={(newParticipants) => {
              changeData("participants", newParticipants);
            }}
          />
        </>
      )}
      <h3>Thông tin về ban tổ chức:</h3>
      <div className="inputGroup">
        <label>Tên người liên hệ:</label>
        <input
          type="text"
          value={eventData.info.name}
          onChange={(e) => {
            changeData("info", {
              ...eventData.info,
              name: e.target.value,
            });
          }}
        />
      </div>
      <div className="inputGroup">
        <label>Phương thức liên hệ của ban tổ chức:</label>
        <input
          type="text"
          value={eventData.info.contact}
          onChange={(e) => {
            changeData("info", {
              ...eventData.info,
              contact: e.target.value,
            });
          }}
        />
      </div>
      <h3>Phương thức check-in:</h3>
      <div className="inputGroup">
        <label>Link đến google form check in (nếu có):</label>
        <input
          type="text"
          value={eventData.checkInLink}
          onChange={(e) => {
            changeData("checkInLink", e.target.value);
          }}
        />
      </div>
      <div className="inputGroup">
        <label>Link đến spreadsheet link với google form check in:</label>
        <input
          type="text"
          value={eventData.sheetLink}
          onChange={(e) => {
            changeData("sheetLink", e.target.value);
          }}
        />
      </div>
      <div className="createInteractions">
        <button
          className="warningBtn"
          onClick={() => {
            navigate(-1);
          }}
        >
          Hủy bỏ
        </button>
        <button
          className="interactBtn"
          onClick={() => {
            if (id) {
              editEvent();
            } else {
              addEvent();
            }
          }}
        >
          {id ? "Edit event" : "Tạo event"}
        </button>
      </div>
    </div>
  );
}
