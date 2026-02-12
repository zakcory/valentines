import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import valentinesTrack from "./assets/valentines.mp3";

export default function App() {
  const bgAudioRef = useRef(null);
  const noButtonRef = useRef(null);
  const basePosRef = useRef({ left: 0, top: 0 });
  const [noPos, setNoPos] = useState({ dx: 0, dy: 0 });
  const [womphCount, setWomphCount] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [pressCount, setPressCount] = useState(0);
  const [pressMessage, setPressMessage] = useState("");
  const [isFlying, setIsFlying] = useState(false);
  const [isNoGone, setIsNoGone] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [showJk, setShowJk] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [lineOffset, setLineOffset] = useState(0);
  const [counterFrom, setCounterFrom] = useState(null);
  const shakeTimeoutRef = useRef(null);
  const brokenTimeoutRef = useRef(null);
  const flyTimeoutRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const shutdownTimeoutRef = useRef(null);
  const jkTimeoutRef = useRef(null);
  const heartTimeoutRef = useRef(null);
  const signatureTimeoutRef = useRef(null);
  const womphFixedRef = useRef(null);
  const womphAcceptedRef = useRef(null);
  const fixedCounterRectRef = useRef(null);
  const shutdownLineRef = useRef(null);
  const shutdownLinePrevRef = useRef(null);

  useLayoutEffect(() => {
    const button = noButtonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    basePosRef.current = { left: rect.left, top: rect.top };
  }, []);

  useLayoutEffect(() => {
    if (!isAccepted) return;
    const target = womphAcceptedRef.current;
    const fromRect = fixedCounterRectRef.current;
    if (!target || !fromRect) return;
    const targetRect = target.getBoundingClientRect();
    setCounterFrom({
      x: fromRect.left - targetRect.left,
      y: fromRect.top - targetRect.top,
    });
  }, [isAccepted]);

  useEffect(() => {
    return () => {
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
      if (brokenTimeoutRef.current) {
        clearTimeout(brokenTimeoutRef.current);
      }
      if (flyTimeoutRef.current) {
        clearTimeout(flyTimeoutRef.current);
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (shutdownTimeoutRef.current) {
        clearTimeout(shutdownTimeoutRef.current);
      }
      if (jkTimeoutRef.current) {
        clearTimeout(jkTimeoutRef.current);
      }
      if (heartTimeoutRef.current) {
        clearTimeout(heartTimeoutRef.current);
      }
      if (signatureTimeoutRef.current) {
        clearTimeout(signatureTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    audio.volume = 0.6;

    const tryPlay = () => {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    tryPlay();

    const unlock = () => {
      tryPlay();
      if (!audio.paused) {
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("touchstart", unlock);
      }
    };

    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  const handleYesPress = () => {
    if (womphFixedRef.current) {
      fixedCounterRectRef.current =
        womphFixedRef.current.getBoundingClientRect();
    }
    setIsLoading(true);
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsAccepted(true);
      shutdownTimeoutRef.current = setTimeout(() => {
        setIsShutdown(true);
      }, 7000);
    }, 1200);
  };

  useEffect(() => {
    if (!isShutdown) return;
    setShowJk(false);
    setShowHeart(false);
    setShowSignature(false);
    setLineOffset(0);
    jkTimeoutRef.current = setTimeout(() => {
      setShowJk(true);
    }, 1000);
    heartTimeoutRef.current = setTimeout(() => {
      setShowHeart(true);
    }, 2000);
    signatureTimeoutRef.current = setTimeout(() => {
      setShowSignature(true);
    }, 3000);
  }, [isShutdown]);

  useLayoutEffect(() => {
    if (!showJk || showHeart) return;
    if (shutdownLineRef.current) {
      shutdownLinePrevRef.current =
        shutdownLineRef.current.getBoundingClientRect();
    }
  }, [showJk, showHeart]);

  useLayoutEffect(() => {
    if (!showHeart) return;
    const line = shutdownLineRef.current;
    const prev = shutdownLinePrevRef.current;
    if (!line || !prev) return;
    const next = line.getBoundingClientRect();
    const dx = (next.width - prev.width) / 2;
    setLineOffset(dx);
    requestAnimationFrame(() => {
      setLineOffset(0);
    });
  }, [showHeart]);

  const moveNoButton = () => {
    const button = noButtonRef.current;
    if (!button) return;

    setWomphCount((count) => count + 1);

    const rect = button.getBoundingClientRect();
    const padding = 8;
    const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
    const maxY = Math.max(padding, window.innerHeight - rect.height - padding);
    const targetX = Math.floor(Math.random() * maxX);
    const targetY = Math.floor(Math.random() * maxY);
    const basePos = basePosRef.current;

    setNoPos({
      dx: targetX - basePos.left,
      dy: targetY - basePos.top,
    });
  };

  const handleNoPress = () => {
    if (shakeTimeoutRef.current) {
      clearTimeout(shakeTimeoutRef.current);
    }
    if (brokenTimeoutRef.current) {
      clearTimeout(brokenTimeoutRef.current);
    }
    setIsBroken(true);
    setIsShake(true);
    shakeTimeoutRef.current = setTimeout(() => {
      setIsShake(false);
    }, 200);
    brokenTimeoutRef.current = setTimeout(() => {
      setIsBroken(false);
    }, 1200);

    setPressCount((count) => {
      const next = count + 1;
      if (next === 1) {
        setPressMessage("princess... wtf");
      } else if (next === 2) {
        setPressMessage("haim, stop!");
      } else if (next === 3) {
        setPressMessage("damn i'm hurt rn");
      } else if (next === 4) {
        setPressMessage("\"yes\" button is still there, im just saying");
      } else if (next === 5) {
        setPressMessage("ok, enough");
        setIsFlying(true);
        flyTimeoutRef.current = setTimeout(() => {
          setIsNoGone(true);
        }, 1100);
      }
      return next;
    });
  };

  return (
    <div className={`page${isShake ? " is-shaking" : ""}`}>
      {isShutdown ? (
        <div className="shutdown-overlay">
          <div
            ref={shutdownLineRef}
            className={`shutdown-message${
              showJk ? " is-visible" : ""
            }${showHeart ? " has-heart" : ""}`}
            style={{ "--line-offset": `${lineOffset}px` }}
          >
            <span className="shutdown-row">
              <span className="shutdown-text">just kidding</span>
              {showHeart ? <span className="shutdown-heart" /> : null}
            </span>
            {showSignature ? (
              <span className="shutdown-signature">zak</span>
            ) : null}
          </div>
        </div>
      ) : null}
      {isShutdown ? <div className="shutdown-line" /> : null}
      <div className={`screen${isShutdown ? " is-shutdown" : ""}`}>
        {isLoading ? (
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
        ) : isAccepted ? (
          <main className="content">
            <p className="question">
              your request has been accepted! zak&apos;s secretary will get back
              to you shortly
            </p>
            <div
              ref={womphAcceptedRef}
              className={`womph-counter womph-counter--accepted${
                counterFrom ? " is-animating" : ""
              }`}
              style={
                counterFrom
                  ? {
                      "--from-x": `${counterFrom.x}px`,
                      "--from-y": `${counterFrom.y}px`,
                    }
                  : undefined
              }
            >
              womph womph counter: {womphCount}
            </div>
          </main>
        ) : (
          <>
            {pressMessage ? (
              <div className="press-message">{pressMessage}</div>
            ) : null}
            <main className="content">
              <p className="question">Princess....</p>
              <p className="question">will you be my valentine?</p>
              <div className="actions">
                <button
                  className="btn btn--yes"
                  type="button"
                  onPointerDown={handleYesPress}
                >
                  <span className="btn__label">yes</span>
                </button>
                <div className={`no-wrap${isNoGone ? " is-collapsing" : ""}`}>
                  <button
                    className={`btn btn--no${isBroken ? " is-broken" : ""}${
                      isFlying ? " is-flying" : ""
                    }`}
                    type="button"
                    ref={noButtonRef}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    onPointerDown={handleNoPress}
                    style={
                      noPos.dx !== 0 || noPos.dy !== 0
                        ? {
                            "--move-x": `${noPos.dx}px`,
                            "--move-y": `${noPos.dy}px`,
                          }
                        : undefined
                    }
                  >
                    <span className="btn__label">no</span>
                  </button>
                </div>
              </div>
            </main>
          </>
        )}
      </div>

      <audio
        ref={bgAudioRef}
        className="audio"
        src={valentinesTrack}
        autoPlay
        loop
      />

      {isAccepted ? null : (
        <div ref={womphFixedRef} className="womph-counter">
          womph womph counter: {womphCount}
        </div>
      )}
    </div>
  );
}
