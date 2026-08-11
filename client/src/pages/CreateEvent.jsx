import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const categories = [
  "Music",
  "Sports",
  "Tech",
  "Education",
  "Community",
  "Food",
  "Other",
];
const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Community",
    date: "",
    time: "",
    location: "",
    image: "",
    capacity: 0,
  });
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/events", form);
      navigate(`/events/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create an event");
    }
  };
  return (
    <div className="page form-page">
      <h1>Host an event</h1>
      {error && <p className="error-text">{error}</p>}
      <form className="event-form" onSubmit={submit}>
        <input
          placeholder="Event title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="form-row">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            placeholder="Capacity (0 = unlimited)"
            value={form.capacity}
            onChange={(e) =>
              setForm({ ...form, capacity: Number(e.target.value) })
            }
          />
          <input
            placeholder="Time (e.g. 5:00 pm )"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />
        </div>
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <input
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button className="btn-accent" type="submit">
          Publish event
        </button>
      </form>
    </div>
  );
};
export default CreateEvent;
