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
};
