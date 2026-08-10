import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";
const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [msg, setMsg] = useState("");
  const load = async () => {
    const { data } = await api.get(`/events/${id}`);
    setEvent(data);
  };
  useEffect(() => {
    load();
  }, [id]);
  if (!event) return <p className="muted page">Loading...</p>;
  const isAttending =
    user && event.attendees.some((a) => a._id === user.id || a === user.id);
  const isOwner = user && event.organizer._id === user.id;
  const soptsLeft =
    event.capacity > 0 ? event.capacity - event.attendees.length : null;
  const isFull = soptsLeft !== null && soptsLeft <= 0;
  const handleRSVP = async () => {
    try {
      if (isAttending) {
        await api.delete(`/events/${id}/rsvp`);
      } else {
        await api.post(`/events/${id}/rsvp`);
      }
      load();
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };
  const handleDelete = async () => {
    if (!confirm("Delete this event permanently?")) return;
    await api.delete(`/events/${id}`);
    navigate("/dashboard");
  };
  return (
    <div className="page details-page">
      <span className="ticket-category">{event.category}</span>
      <h1>{event.title}</h1>
      <p className="muted">
        {new Date(event.data).toDateString()} · {event.time} · {event.location}
      </p>
      <p className="hosted-by">Hosted by {event.organizer.name}</p>
      {event.image && (
        <img src={event.image} alt={event.title} className="event-image" />
      )}
      <p className="event-description">{event.description}</p>
      {msg && <p className="error-text">{msg}</p>}
      <div className="details-action">
        {isOwner ? (
          <>
            <button
              className="btn-accent"
              onClick={() => navigate(`/edit/${id}`)}
            >
              Edit event
            </button>
            <button className="btn-ghost" onClick={handleDelete}>
              Delete
            </button>
          </>
        ) : user ? (
          <button
            className={isFull && isAttending ? "btn-disabled" : "btn-accent"}
            disabled={isFull && !isAttending}
            onClick={handleRSVP}
          >
            {isAttending
              ? "Cancel RSVP"
              : isFull
                ? "Event full"
                : "RSVP to attend"}
          </button>
        ) : (
          <button className="btn-accent" onClick={() => navigate("login")}>
            Login to RSVP
          </button>
        )}
        <span className="muted">
          {soptsLeft === null
            ? "Open entry"
            : `${event.attendees.length}/${event.capacity} registered`}
        </span>
      </div>
      <CommentSection eventId={id} comments={event.comments} onUpdate={load} />
    </div>
  );
};
export default EventDetails;
