import "./QuestionScreen.css";

export default function QuestionScreen({
  pressMessage,
  handleYesPress,
  handleNoPress,
  moveNoButton,
  isNoGone,
  isBroken,
  isFlying,
  noButtonRef,
  noPos,
}) {
  return (
    <>
      {pressMessage ? <div className="press-message">{pressMessage}</div> : null}
      <main className="content content--question">
        <p className="question">Princess....</p>
        <p className="question">will you be my valentine?</p>
        <div className="actions">
          <button className="btn btn--yes" type="button" onPointerDown={handleYesPress}>
            <span className="btn__label">yes</span>
          </button>
          <div className={`no-wrap${isNoGone ? " is-collapsing" : ""}`}>
            <button
              className={`btn btn--no${isBroken ? " is-broken" : ""}${
                isFlying ? " is-flying" : ""
              }`}
              type="button"
              ref={noButtonRef}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              onPointerDown={handleNoPress}
              style={
                noPos.dx !== 0 || noPos.dy !== 0
                  ? {
                      "--move-x": `${noPos.dx}px`,
                      "--move-y": `${noPos.dy}px`,
                    }
                  : undefined
              }
            >
              <span className="btn__label">no</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
