import { useEffect, useLayoutEffect, useRef, useState } from "react";
import valentinesTrack from "../assets/valentines.mp3";
import { PRESS_MESSAGES, TIMINGS } from "../constants/gameConfig";

export default function useValentineGame() {
  const bgAudioRef = useRef(null);
  const noButtonRef = useRef(null);
  const basePosRef = useRef({ left: 0, top: 0 });
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

  const [hasStarted, setHasStarted] = useState(false);
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

  useLayoutEffect(() => {
    const button = noButtonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    basePosRef.current = { left: rect.left, top: rect.top };
  }, [hasStarted, isLoading, isAccepted, isNoGone]);

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
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
      if (brokenTimeoutRef.current) clearTimeout(brokenTimeoutRef.current);
      if (flyTimeoutRef.current) clearTimeout(flyTimeoutRef.current);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      if (shutdownTimeoutRef.current) clearTimeout(shutdownTimeoutRef.current);
      if (jkTimeoutRef.current) clearTimeout(jkTimeoutRef.current);
      if (heartTimeoutRef.current) clearTimeout(heartTimeoutRef.current);
      if (signatureTimeoutRef.current) clearTimeout(signatureTimeoutRef.current);
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

  useEffect(() => {
    if (!isShutdown) return;
    setShowJk(false);
    setShowHeart(false);
    setShowSignature(false);
    setLineOffset(0);

    jkTimeoutRef.current = setTimeout(() => {
      setShowJk(true);
    }, TIMINGS.SHOW_JK_MS);

    heartTimeoutRef.current = setTimeout(() => {
      setShowHeart(true);
    }, TIMINGS.SHOW_HEART_MS);

    signatureTimeoutRef.current = setTimeout(() => {
      setShowSignature(true);
    }, TIMINGS.SHOW_SIGNATURE_MS);
  }, [isShutdown]);

  useLayoutEffect(() => {
    if (!showJk || showHeart) return;
    if (shutdownLineRef.current) {
      shutdownLinePrevRef.current = shutdownLineRef.current.getBoundingClientRect();
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

  const handleYesPress = () => {
    if (womphFixedRef.current) {
      fixedCounterRectRef.current = womphFixedRef.current.getBoundingClientRect();
    }
    setIsLoading(true);
    loadingTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsAccepted(true);
      shutdownTimeoutRef.current = setTimeout(() => {
        setIsShutdown(true);
      }, TIMINGS.SHUTDOWN_DELAY_MS);
    }, TIMINGS.LOADING_MS);
  };

  const handleStartPress = () => {
    setHasStarted(true);
    const audio = bgAudioRef.current;
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

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
    if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
    if (brokenTimeoutRef.current) clearTimeout(brokenTimeoutRef.current);

    setIsBroken(true);
    setIsShake(true);

    shakeTimeoutRef.current = setTimeout(() => {
      setIsShake(false);
    }, TIMINGS.SHAKE_MS);

    brokenTimeoutRef.current = setTimeout(() => {
      setIsBroken(false);
    }, TIMINGS.BROKEN_MS);

    setPressCount((count) => {
      const next = count + 1;
      const message = PRESS_MESSAGES[next - 1];
      if (message) {
        setPressMessage(message);
      }

      if (next === PRESS_MESSAGES.length) {
        setIsFlying(true);
        flyTimeoutRef.current = setTimeout(() => {
          setIsNoGone(true);
        }, TIMINGS.FLY_AWAY_MS);
      }

      return next;
    });
  };

  return {
    audioSrc: valentinesTrack,
    refs: {
      bgAudioRef,
      noButtonRef,
      womphFixedRef,
      womphAcceptedRef,
      shutdownLineRef,
    },
    state: {
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
    },
    actions: {
      handleYesPress,
      handleNoPress,
      handleStartPress,
      moveNoButton,
    },
  };
}
