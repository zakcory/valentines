import "./QuizScreen.css";

// Render a label, swapping any 😉 for the pixel-art wink sprite so the emoji
// matches the pixel aesthetic (the pixel font has no emoji glyphs).
const renderLabel = (label) =>
  label.split("😉").flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <span key={index} className="pixel-wink" role="img" aria-label="wink" />,
          part,
        ],
  );

export default function QuizScreen({ quiz, teaseMessage, wrongIds, onAnswer }) {
  return (
    <>
      {teaseMessage ? <div className="quiz__tease">{teaseMessage}</div> : null}
      <main className="content quiz">
        <p className="question">{quiz.question}</p>
        <div className="quiz__options">
          {quiz.options.map((option) => {
            const isWrong = wrongIds.includes(option.id);
            return (
              <button
                key={option.id}
                className={`pixel-btn quiz__option${isWrong ? " is-wrong" : ""}`}
                type="button"
                disabled={isWrong}
                onClick={() => onAnswer(option)}
              >
                {renderLabel(option.label)}
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
}
