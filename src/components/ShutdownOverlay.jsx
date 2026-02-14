import React from "react";

export default function ShutdownOverlay({
  isShutdown,
  showJk,
  showHeart,
  showSignature,
  lineOffset,
  shutdownLineRef,
}) {
  if (!isShutdown) return null;

  return (
    <div className="shutdown-overlay">
      <div
        ref={shutdownLineRef}
        className={`shutdown-message${showJk ? " is-visible" : ""}${
          showHeart ? " has-heart" : ""
        }`}
        style={{ "--line-offset": `${lineOffset}px` }}
      >
        <span className="shutdown-row">
          <span className="shutdown-text">just kidding</span>
          {showHeart ? <span className="shutdown-heart" /> : null}
        </span>
        {showSignature ? <span className="shutdown-signature">zak</span> : null}
      </div>
    </div>
  );
}
