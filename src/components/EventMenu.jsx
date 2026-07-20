import "./EventMenu.css";

export default function EventMenu({ events, onSelect }) {
  return (
    <div className="page page--ambient">
      <div className="screen">
        <main className="content event-menu">
          <p className="question">pick a memory</p>
          <div className="event-menu__list">
            {events.map((event) => (
              <button
                key={event.id}
                className="pixel-btn event-menu__item"
                type="button"
                onClick={() => onSelect(event)}
              >
                {event.name} ({event.date})
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
