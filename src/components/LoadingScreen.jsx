import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <main className="content">
      <p className="question">loading...</p>
      <div className="loading-line">
        <span className="loading-text">sending request...</span>
        <span className="loading-bracket">[</span>
        <span className="loading-bar" aria-hidden="true">
          <span className="loading-block" />
          <span className="loading-block" />
          <span className="loading-block" />
          <span className="loading-block" />
          <span className="loading-block" />
        </span>
        <span className="loading-bracket">]</span>
      </div>
    </main>
  );
}
