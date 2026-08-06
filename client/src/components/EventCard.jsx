import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const dateObj = new Date(event.date);
  const month = dateObj
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const day = dateObj.getDate();
  const spotsLeft =
    event.capacity > 0 ? event.capacity - event.attendees.length : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;
  return (
    <Link to={`/events/${event._id}`} className="ticket-card">
      <div className="ticket-date-badge">
        <span className="ticket-month">{month}</span>
        <span className="ticket-date">{day}</span>
      </div>
      <div className="ticket-perforation" />
      <div className="ticket-body">
        <span className="ticket-category">{event.category}</span>
        <h3>{event.title}</h3>
        <p className="ticket-location">{event.location}</p>
        <p className="ticket-time">{event.time}</p>
        <div className="ticket-footer">
          <span> By {event.organizer?.name} </span>
          <span className={isFull ? "spots-full" : "spots-left"}>
            {spotsLeft === null
              ? "Open entry"
              : isFull
                ? "Sold out"
                : `${spotsLeft} spots left`}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default EventCard;
