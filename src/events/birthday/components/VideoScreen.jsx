import { useEffect, useRef } from "react";
import videoSrc from "../../../assets/happy-birthday.mp4";
import "./VideoScreen.css";

export default function VideoScreen() {
  const videoRef = useRef(null);

  // The reveal button click counts as a user gesture, so playing with sound
  // is allowed; fall back silently if the browser still blocks it (controls
  // let her press play).
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <main className="content video-screen">
      <video
        ref={videoRef}
        className="birthday-video"
        src={videoSrc}
        playsInline
        controls
        autoPlay
      />
    </main>
  );
}
