import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ eventId, comments, onUpdate }) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await api.post(`/events/${eventId}/comments`, { text });
    onUpdate(data);
    setText("");
  };
  return (
    <div className="comment-section">
      <h3>discussion ({comments.length})</h3>
      {user && (
        <form onSubmit={submit} className="comment-form">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask a question or leave note"
          />
          <button type="submit" className="btn-accent">
            Post
          </button>
        </form>
      )}
      <div className="comments-list">
        {comments.length === 0 && (
          <p className="muted">No comments yet- be the first one.</p>
        )}
        {comments.map((c, i) => (
          <div key={i} className="comment-item">
            <strong>{c.name}</strong>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CommentSection;
