import StartScreen from "./components/StartScreen";
import LoadingScreen from "./components/LoadingScreen";
import AcceptedScreen from "./components/AcceptedScreen";
import QuestionScreen from "./components/QuestionScreen";
import ShutdownOverlay from "./components/ShutdownOverlay";
import useValentineGame from "./hooks/useValentineGame";

export default function App() {
  const { audioSrc, refs, state, actions } = useValentineGame();

  const {
    hasStarted,
    noPos,
    womphCount,
    isBroken,
    isShake,
    pressMessage,
    isFlying,
    isNoGone,
    isAccepted,
    isLoading,
    isShutdown,
    showJk,
    showHeart,
    showSignature,
    lineOffset,
    counterFrom,
  } = state;

  const { bgAudioRef, noButtonRef, womphFixedRef, womphAcceptedRef, shutdownLineRef } =
    refs;

  const { handleYesPress, handleNoPress, handleStartPress, moveNoButton } = actions;

  return (
    <div
      className={`page${isShake ? " is-shaking" : ""}${
        !hasStarted ? " is-start-screen" : ""
      }`}
    >
      <ShutdownOverlay
        isShutdown={isShutdown}
        showJk={showJk}
        showHeart={showHeart}
        showSignature={showSignature}
        lineOffset={lineOffset}
        shutdownLineRef={shutdownLineRef}
      />

      {isShutdown ? <div className="shutdown-line" /> : null}

      <div className={`screen${isShutdown ? " is-shutdown" : ""}`}>
        {!hasStarted ? (
          <StartScreen onStart={handleStartPress} />
        ) : isLoading ? (
          <LoadingScreen />
        ) : isAccepted ? (
          <AcceptedScreen
            womphCount={womphCount}
            womphAcceptedRef={womphAcceptedRef}
            counterFrom={counterFrom}
          />
        ) : (
          <QuestionScreen
            pressMessage={pressMessage}
            handleYesPress={handleYesPress}
            handleNoPress={handleNoPress}
            moveNoButton={moveNoButton}
            isNoGone={isNoGone}
            isBroken={isBroken}
            isFlying={isFlying}
            noButtonRef={noButtonRef}
            noPos={noPos}
          />
        )}
      </div>

      <audio ref={bgAudioRef} className="audio" src={audioSrc} loop />

      {!hasStarted || isAccepted ? null : (
        <div ref={womphFixedRef} className="womph-counter">
          womph womph counter: {womphCount}
        </div>
      )}
    </div>
  );
}
