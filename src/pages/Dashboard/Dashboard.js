import { useEffect, useState } from "react";
import EventsTable from "../../components/EventsTable";
import "./Dashboard.css";
import Statistic from "./Statistic";
import moment from "moment";
export default function Dashboard() {
  const [nearEvents, setNearEvents] = useState();
  const [pastEvents, setPastEvents] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const [remainTime, setRemainTime] = useState(0);
  useEffect(() => {
    const fetchNear = async () => {
      try {
        const response = await fetch(
          "https://checkinbackend.onrender.com/events/getNearEvents"
        );
        const data = await response.json();
        setNearEvents(data.event);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchPast = async () => {
      try {
        const response = await fetch(
          "https://checkinbackend.onrender.com/events/getPastEvents"
        );
        const data = await response.json();
        setPastEvents(data.event);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCurrent = async () => {
      try {
        const response = await fetch(
          "https://checkinbackend.onrender.com/events/currentEvent"
        );
        const data = await response.json();
        setCurrentEvent(data.event);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPast();
    fetchCurrent();
    fetchNear();
  }, []);
  useEffect(() => {
    const calculateRemainTime = () => {
      const now = moment(); // Current time
      const end = moment(currentEvent.endTime, "HH:mm"); // Parse endTime in HH:mm format

      // If the end time has already passed today, set remainTime to "00:00"
      if (end.isBefore(now)) {
        setRemainTime("00:00");
        return;
      }

      // Calculate the difference in milliseconds
      const diff = end.diff(now);

      // Convert milliseconds to duration
      const duration = moment.duration(diff);

      // Format as HH:mm
      const hours = String(Math.floor(duration.asHours())).padStart(2, "0");
      const minutes = String(duration.minutes()).padStart(2, "0");
      setRemainTime(`${hours}:${minutes}`);
    };
    // Initial calculation
    if (currentEvent) {
      calculateRemainTime();
    }
    const timer = setInterval(calculateRemainTime, 60000);
    return () => clearInterval(timer);
  }, [currentEvent]);
  return (
    <div className="dashboard">
      {currentEvent && (
        <>
          <h2 style={{ color: "red" }}>Sự kiện đang diễn ra</h2>
          <div className="eventInteract">
            <button className="interactBtn">Đến check-in</button>
            <button className="warningBtn">Lấy mã QR check-in</button>
            <button className="deleteBtn">Đóng check-in</button>
          </div>
          <h3>
            Tên sự kiện:{" "}
            <span style={{ fontWeight: "normal" }}>{currentEvent.name}</span>
          </h3>
          <h3>
            Địa điểm:{" "}
            <span style={{ fontWeight: "normal" }}>
              {currentEvent.location}
            </span>
          </h3>
          <h3>
            Thời gian:
            <span style={{ fontWeight: "normal" }}>
              {" "}
              {currentEvent.startTime}-{currentEvent.endTime}
            </span>
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "95%",
            }}
          >
            <Statistic
              name={"NGƯỜI THAM GIA"}
              value={
                currentEvent.participants.filter((par) => {
                  return par.status;
                }).length
              }
              color={"rgb(255,204,204)"}
              iconColor="rgb(230,70,99)"
              icon={"user"}
            />
            <Statistic
              name={"Tổng người tham gia"}
              value={currentEvent.participants.length}
              color={"rgb(248,237,210)"}
              iconColor="rgb(230,194,102)"
              icon={"cart"}
            />
            <Statistic
              name={"Phần trăm tham gia"}
              value={
                currentEvent.participants.filter((par) => {
                  return par.status;
                }).length /
                  currentEvent.participants.length +
                " %"
              }
              color={"rgb(204,230,204)"}
              iconColor="rgb(28,142,28)"
              icon={"money"}
            />
            <Statistic
              name={"Thời gian còn lại checkin"}
              value={remainTime}
              color={"rgb(230,204,230)"}
              iconColor="rgb(153,51,153)"
              icon={"wallet"}
            />
          </div>{" "}
        </>
      )}
      <h2 style={{ color: "black" }}>Sự kiện sắp tới</h2>
      <EventsTable eventsData={nearEvents} />
      <h2 style={{ color: "black" }}>Sự kiện đã diễn ra</h2>
      <EventsTable eventsData={pastEvents} />
    </div>
  );
}
