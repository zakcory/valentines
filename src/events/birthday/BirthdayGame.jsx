import { useEffect, useRef, useState } from "react";
import fahh1 from "../../assets/fahh-1.mp3";
import fahh2 from "../../assets/fahh-2.mp3";
import fahh3 from "../../assets/fahh-3.mp3";
import QuizScreen from "./components/QuizScreen";
import PhotoReveal from "./components/PhotoReveal";
import VideoScreen from "./components/VideoScreen";
import { QUIZ, TIMINGS, WRONG_MESSAGES } from "./config";
import "./BirthdayGame.css";

// Escalating "fahh" per wrong press; there are exactly three wrong options.
const FAHH_SOUNDS = [fahh1, fahh2, fahh3];

export default function BirthdayGame() {
  // "quiz" -> "correct" -> "photos" -> (after the kiss) "video"
  const [phase, setPhase] = useState("quiz");
  const [wrongIds, setWrongIds] = useState([]);
  const [teaseMessage, setTeaseMessage] = useState("");
  const [isShake, setIsShake] = useState(false);
  const wrongCountRef = useRef(0);
  const shakeTimeoutRef = useRef(null);
  const photosTimeoutRef = useRef(null);
  const fahhAudioRef = useRef(null);

  useEffect(
    () => () => {
      clearTimeout(shakeTimeoutRef.current);
      clearTimeout(photosTimeoutRef.current);
      fahhAudioRef.current?.pause();
    },
    [],
  );

  const handleAnswer = (option) => {
    if (option.correct) {
      setPhase("correct");
      photosTimeoutRef.current = setTimeout(
        () => setPhase("photos"),
        TIMINGS.CORRECT_HOLD_MS,
      );
      return;
    }
    wrongCountRef.current += 1;
    fahhAudioRef.current?.pause();
    const fahh = new Audio(FAHH_SOUNDS[(wrongCountRef.current - 1) % FAHH_SOUNDS.length]);
    fahhAudioRef.current = fahh;
    fahh.play().catch(() => {});
    setTeaseMessage(WRONG_MESSAGES[(wrongCountRef.current - 1) % WRONG_MESSAGES.length]);
    setWrongIds((ids) => (ids.includes(option.id) ? ids : [...ids, option.id]));
    setIsShake(true);
    clearTimeout(shakeTimeoutRef.current);
    shakeTimeoutRef.current = setTimeout(() => setIsShake(false), TIMINGS.SHAKE_MS);
  };

  return (
    <div className={`page page--ambient${isShake ? " is-shaking" : ""}`}>
      <div className="screen">
        {phase === "video" ? (
          <VideoScreen />
        ) : phase === "photos" ? (
          <PhotoReveal onFinish={() => setPhase("video")} />
        ) : phase === "correct" ? (
          <main className="content">
            <p className="question question--celebrate">correct!</p>
          </main>
        ) : (
          <QuizScreen
            quiz={QUIZ}
            teaseMessage={teaseMessage}
            wrongIds={wrongIds}
            onAnswer={handleAnswer}
          />
        )}
      </div>
    </div>
  );
}
