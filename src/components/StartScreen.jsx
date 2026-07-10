import "./StartScreen.css";

export default function StartScreen({ onStart }) {
  return (
    <main className="content start-screen">
      <p className="question start-title">press start</p>
      <button className="start-btn" type="button" onClick={onStart}>
        start
      </button>
    </main>
  );
}
