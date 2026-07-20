import "./AcceptedScreen.css";

export default function AcceptedScreen({ womphCount, womphAcceptedRef, counterFrom }) {
  return (
    <main className="content">
      <p className="question">
        your request has been accepted! zak&apos;s secretary will get back to you shortly
      </p>
      <div
        ref={womphAcceptedRef}
        className={`womph-counter womph-counter--accepted${
          counterFrom ? " is-animating" : ""
        }`}
        style={
          counterFrom
            ? {
                "--from-x": `${counterFrom.x}px`,
                "--from-y": `${counterFrom.y}px`,
              }
            : undefined
        }
      >
        womph womph counter: {womphCount}
      </div>
    </main>
  );
}
