import { useEffect, useState } from "react";
import api from "../utils/api";
import EventCard from "../components/EventCard";
const categories = [
  "All",
  "Music",
  "Sports",
  "Tech",
  "Education",
  "Food",
  "Community",
  "Other",
];
const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [when, setWhen] = useState("all");
  const [loading, setLoading] = useState(true);
  const fetchEvents = async () => {
    setLoading(true);
    const { data } = await api.get("/events", {
      params: { search, category, when },
    });
    setEvents(data);
    setLoading(false);
  };
  useEffect(() => {
    const delay = setTimeout(fetchEvents, 300);
    return () => clearTimeout(delay);
  }, [search, category, when]);
  return (
    <div className="page">
      <section className="hero">
        <h1> Find what's happening near you</h1>
        <p>
          Local events, hosted by people areound you. Ticket-free, sign-up easy
        </p>
      </section>
      <section className="filter-bar">
        <input
          className="search-input"
          placeholder="search events,place and keywords"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={when} onChange={(e) => setWhen(e.target.value)}>
          <option value="all">Any time</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </section>
      {loading ? (
        <p className="muted">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="muted">No events match your search</p>
      ) : (
        <div className="event-grid">
          {events.map((ev) => (
            <EventCard key={ev._id} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
