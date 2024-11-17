import { useNavigate } from "react-router-dom";
import EventsSearch from "../../components/EventsSearch";
import EventsTable from "../../components/EventsTable";
import "./Events.css";
import { useEffect, useState } from "react";
export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://checkinbackend.onrender.com/events/getEvents"
        );
        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="eventsPage">
      <h2>Tất cả sự kiện</h2>
      <div className="eventsAction">
        <EventsSearch />
        <button
          onClick={() => {
            navigate("/events/createEvent");
          }}
        >
          Thêm sự kiện
        </button>
      </div>
      <EventsTable eventsData={events} />
    </div>
  );
}
