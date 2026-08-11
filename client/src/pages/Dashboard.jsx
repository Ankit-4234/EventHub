import { useEffect, useState } from "react";
import api from "../utils/api";
import EventCard from "../components/EventCard";

const Dashboard = () => {
  const [tab, setTab] = useState("hosting");
  const [hosting, setHosting] = useState([]);
  const [attending, setAttending] = useState([]);

  useEffect(() => {
    api.get("/events/my/hosting").then(({ data }) => setHosting(data));
    api.get("/events/my/attending").then(({ data }) => setAttending(data));
  }, []);
  const list = tab === "hosting" ? hosting : attending;
  return (
    <div className="page">
      <h1>Your dashboard</h1>
      <div className="tab-bar">
        <button
          className={tab === "hosting" ? "tab active" : "tab"}
          onClick={() => setTab("hosting")}
        >
          Hosting ({hosting.length})
        </button>
        <button
          className={tab === "attending" ? "tab-active" : "tab"}
          onClick={() => setTab("attending")}
        >
          Attending ({attending.length})
        </button>
      </div>
      {list.length === 0 ? (
        <p className="muted">
          {tab === "Hosting"
            ? "You haven't hosted any events yet."
            : "You haven't RSVP'd to do anything yet"}
        </p>
      ) : (
        <div className="event-grid">
          {list.map((ev) => (
            <EventCard
              key={ev._id}
              event={{ ...ev, organizer: ev.organizer || { name: "You" } }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
