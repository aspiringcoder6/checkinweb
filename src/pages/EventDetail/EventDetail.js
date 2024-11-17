import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./EventDetail.css";
import Participantstable from "../../components/ParticipantsTable";
export default function EventDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [eventData, setEventData] = useState();
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
    eventData && (
      <div className="eventDetail">
        <h2 style={{ color: "red" }}>Chi tiết sự kiện:</h2>
        <div className="eventInteract">
          <button className="interactBtn">Đến check-in </button>
          <button className="warningBtn">Lấy mã QR check-in</button>
          <button className="deleteBtn">Đóng check-in</button>
        </div>
        <h3>
          Tên sự kiện:{" "}
          <span style={{ fontWeight: "normal" }}>{eventData.name}</span>
        </h3>
        <h3>Mô tả sự kiện:</h3>
        <p>{eventData.desc}</p>
        <h3>
          Địa điểm:{" "}
          <span style={{ fontWeight: "normal" }}>{eventData.location}</span>
        </h3>
        <h3>
          Ngày tổ chức:{" "}
          <span style={{ fontWeight: "normal" }}>{eventData.date}</span>
        </h3>
        <h3>
          Thời gian:{" "}
          <span style={{ fontWeight: "normal" }}>
            {eventData.startTime} - {eventData.endTime}
          </span>
        </h3>
        <h3>Danh sách người tham gia:</h3>
        <Participantstable participants={eventData.participants} />
      </div>
    )
  );
}
