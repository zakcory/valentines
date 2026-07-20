import { useState } from "react";
import EventMenu from "./components/EventMenu";
import { EVENTS } from "./events";

export default function App() {
  const [activeEventId, setActiveEventId] = useState(null);
  const activeEvent = EVENTS.find((event) => event.id === activeEventId);

  if (activeEvent?.Component) {
    const ActiveEvent = activeEvent.Component;
    return (
      <>
        <button
          className="pixel-btn back-btn"
          type="button"
          onClick={() => setActiveEventId(null)}
        >
          &lt; back
        </button>
        <ActiveEvent />
      </>
    );
  }

  return (
    <EventMenu
      events={EVENTS}
      onSelect={(event) => {
        if (event.Component) {
          setActiveEventId(event.id);
        }
      }}
    />
  );
}
