import "./BirthdayFinale.css";

// Shown after the video finishes: a little "happy birthday" with a
// hand-drawn pixel-art balloon that bobs on its string.
export default function BirthdayFinale() {
  return (
    <main className="content birthday-finale">
      <div className="balloon" role="img" aria-label="pixel birthday balloon">
        <svg
          className="balloon-svg"
          viewBox="0 0 16 26"
          shapeRendering="crispEdges"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* string */}
          <g fill="#8a8a8a">
            <rect x="8" y="16" width="1" height="2" />
            <rect x="7" y="18" width="1" height="2" />
            <rect x="8" y="20" width="1" height="2" />
            <rect x="7" y="22" width="1" height="3" />
          </g>
          {/* knot */}
          <rect x="7" y="15" width="2" height="1" fill="#c0326a" />
          {/* balloon body */}
          <g fill="#ff4b7a">
            <rect x="4" y="1" width="8" height="1" />
            <rect x="3" y="2" width="10" height="1" />
            <rect x="2" y="3" width="12" height="3" />
            <rect x="2" y="6" width="12" height="3" />
            <rect x="3" y="9" width="10" height="1" />
            <rect x="3" y="10" width="10" height="1" />
            <rect x="4" y="11" width="8" height="1" />
            <rect x="5" y="12" width="6" height="1" />
            <rect x="6" y="13" width="4" height="1" />
            <rect x="7" y="14" width="2" height="1" />
          </g>
          {/* shine highlight */}
          <g fill="#ffd0de">
            <rect x="5" y="3" width="2" height="1" />
            <rect x="4" y="4" width="2" height="2" />
          </g>
        </svg>
      </div>
      <p className="finale-title">happy birthday</p>
      <p className="finale-sub">i love you 🎂</p>
    </main>
  );
}
