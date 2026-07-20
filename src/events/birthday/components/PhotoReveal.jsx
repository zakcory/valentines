import { useEffect, useRef, useState } from "react";
import photo197 from "../../../assets/197.jpg";
import photo215 from "../../../assets/215.jpg";
import { BoyBuddy, GirlBuddy } from "./PixelBuddy";
import "./PhotoReveal.css";

const HEARTS = [0, 1, 2, 3, 4];

function UsArrow({ side }) {
  return (
    <svg
      className={`us-arrow us-arrow--${side}`}
      viewBox="0 0 8 26"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="#ff3a6a">
        <rect x="3" y="0" width="2" height="1" />
        <rect x="2" y="1" width="4" height="1" />
        <rect x="1" y="2" width="6" height="1" />
        <rect x="3" y="3" width="2" height="23" />
      </g>
    </svg>
  );
}

export default function PhotoReveal({ onFinish }) {
  const rootRef = useRef(null);
  const timersRef = useRef([]);
  const [revealing, setRevealing] = useState(false);
  const [kissed, setKissed] = useState(false);
  const [boyStyle, setBoyStyle] = useState(undefined);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const handleReveal = () => {
    if (revealing) return;
    const root = rootRef.current;
    if (!root) return;

    // Measure the current gap between the two kids so the boy lands right
    // beside the girl regardless of screen size.
    const girl = root.querySelector(".buddy--girl").getBoundingClientRect();
    const boy = root.querySelector(".buddy--boy").getBoundingClientRect();
    const dx = girl.left + girl.width / 2 + 46 - (boy.left + boy.width / 2);

    setRevealing(true);
    setBoyStyle({ transform: `translateX(${dx}px)` });

    // When the boy arrives, lean him in for the cheek kiss + release hearts.
    timersRef.current.push(
      setTimeout(() => {
        setBoyStyle({ transform: `translateX(${dx - 12}px) rotate(-12deg)` });
        setKissed(true);
      }, 1100),
    );
    // Once the kiss has settled, hand off to the birthday video.
    timersRef.current.push(setTimeout(() => onFinish?.(), 3500));
  };

  return (
    <main
      ref={rootRef}
      className={`content photo-reveal${revealing ? " is-revealing" : ""}${
        kissed ? " is-kissed" : ""
      }`}
    >
      <div className="photo-row">
        <div className="photo-column">
          <div className="photo-fade">
            <figure className="photo-card photo-card--left">
              <img src={photo197} alt="197 points" />
            </figure>
          </div>
          <div className="buddy-slot">
            <GirlBuddy />
            {kissed ? (
              <div className="kiss-hearts" aria-hidden="true">
                {HEARTS.map((i) => (
                  <span key={i} className={`kiss-heart kiss-heart--${i}`} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="photo-column photo-column--boy" style={boyStyle}>
          <div className="photo-fade">
            <figure className="photo-card photo-card--right">
              <img src={photo215} alt="215 points" />
            </figure>
          </div>
          <BoyBuddy />
        </div>
      </div>

      <div className="fade-out">
        <div className="us-annotation">
          <div className="us-arrows">
            <UsArrow side="left" />
            <UsArrow side="right" />
          </div>
          <span className="us-word">us</span>
        </div>
      </div>

      <div className="fade-out">
        <button className="reveal-btn pixel-btn" type="button" onClick={handleReveal}>
          to reveal the present
        </button>
      </div>
    </main>
  );
}
