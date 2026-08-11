import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then(({ data }) => setForm({ ...data, date: data.data.slice(0, 10) }));
  }, [id]);
  const submit = async (e) => {
    e.prevent.default();
    try {
      await api.put(`/events/${id}`, form);
      navigate(`events/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not update event");
    }
  };
  if (!form) return <p className="muted page"> Loading...</p>;
  return (
    <div className="page form-page">
      <h1>Edit event</h1>
      {error && <p className="error-text">{error}</p>}
      <form className="event-form" onSubmit={submit}>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
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
            value={form.capacity}
            onChange={(e) =>
              setForm({ ...form, capacity: Number(e.target.value) })
            }
          />
        </div>
        <div className="form-row">
          <input
            type="date"
            value={form.data}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />
        </div>
        <input
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button className="btn-accent" type="submit">
          Save changes
        </button>
      </form>
    </div>
  );
};
export default EditEvent;
