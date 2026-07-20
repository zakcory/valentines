// Tiny hand-drawn pixel-art kids that pop in and wave under the photos.
// Each is an inline SVG of 1x1 "pixel" rects; animation lives in PhotoReveal.css.

export function GirlBuddy() {
  return (
    <div className="buddy buddy--girl" role="img" aria-label="pixel girl waving">
      <svg
        className="buddy-svg"
        viewBox="0 0 16 22"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* hair / afro puffs */}
        <g fill="#241a15">
          <rect x="2" y="1" width="4" height="4" />
          <rect x="10" y="1" width="4" height="4" />
          <rect x="4" y="3" width="8" height="2" />
          <rect x="4" y="5" width="1" height="2" />
          <rect x="11" y="5" width="1" height="2" />
        </g>
        {/* skin */}
        <g fill="#7a4a2c">
          <rect x="5" y="5" width="6" height="5" />
          <rect x="4" y="6" width="1" height="2" />
          <rect x="11" y="6" width="1" height="2" />
          <rect x="7" y="10" width="2" height="1" />
          <rect x="3" y="11" width="1" height="4" />
          <rect x="3" y="15" width="1" height="1" />
          <rect x="6" y="17" width="1" height="3" />
          <rect x="9" y="17" width="1" height="3" />
        </g>
        {/* eyes + mouth */}
        <g fill="#1c1c1c">
          <rect x="6" y="7" width="1" height="1" />
          <rect x="9" y="7" width="1" height="1" />
        </g>
        <rect x="7" y="8" width="2" height="1" fill="#b92a57" />
        {/* dress */}
        <g fill="#ff6b94">
          <rect x="5" y="11" width="6" height="3" />
          <rect x="4" y="14" width="8" height="3" />
        </g>
        {/* waving arm */}
        <g className="buddy-wave" fill="#7a4a2c">
          <rect x="12" y="8" width="1" height="4" />
          <rect x="12" y="7" width="1" height="1" />
        </g>
        {/* shoes */}
        <g fill="#3a2a1a">
          <rect x="5" y="20" width="2" height="1" />
          <rect x="9" y="20" width="2" height="1" />
        </g>
      </svg>
    </div>
  );
}

export function BoyBuddy() {
  return (
    <div className="buddy buddy--boy" role="img" aria-label="pixel boy waving">
      <svg
        className="buddy-svg"
        viewBox="0 0 16 22"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* skin */}
        <g fill="#d69a63">
          <rect x="5" y="4" width="6" height="5" />
          <rect x="4" y="5" width="1" height="2" />
          <rect x="11" y="5" width="1" height="2" />
          <rect x="7" y="9" width="2" height="1" />
          <rect x="3" y="10" width="1" height="4" />
          <rect x="3" y="14" width="1" height="1" />
          <rect x="6" y="17" width="1" height="3" />
          <rect x="9" y="17" width="1" height="3" />
        </g>
        {/* hair */}
        <g fill="#3a2a1a">
          <rect x="4" y="2" width="8" height="2" />
          <rect x="4" y="4" width="1" height="2" />
          <rect x="11" y="4" width="1" height="2" />
          <rect x="5" y="4" width="6" height="1" />
        </g>
        {/* eyes + mouth */}
        <g fill="#1c1c1c">
          <rect x="6" y="6" width="1" height="1" />
          <rect x="9" y="6" width="1" height="1" />
        </g>
        <rect x="7" y="8" width="2" height="1" fill="#8a4b2e" />
        {/* shirt */}
        <rect x="4" y="10" width="8" height="4" fill="#4a90d9" />
        {/* shorts */}
        <rect x="5" y="14" width="6" height="3" fill="#2b3a55" />
        {/* waving arm */}
        <g className="buddy-wave" fill="#d69a63">
          <rect x="12" y="8" width="1" height="4" />
          <rect x="12" y="7" width="1" height="1" />
        </g>
        {/* shoes */}
        <g fill="#222222">
          <rect x="5" y="20" width="2" height="1" />
          <rect x="9" y="20" width="2" height="1" />
        </g>
      </svg>
    </div>
  );
}
