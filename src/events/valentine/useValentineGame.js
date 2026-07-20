import { useEffect, useLayoutEffect, useRef, useState } from "react";
import valentinesTrack from "../../assets/valentines.mp3";
import { AUDIO_VOLUME, PRESS_MESSAGES, TIMINGS } from "./config";
import useBackgroundAudio from "../../hooks/useBackgroundAudio";

export default function useValentineGame() {
  const bgAudioRef = useRef(null);
  const noButtonRef = useRef(null);
  const basePosRef = useRef({ left: 0, top: 0 });
  const womphFixedRef = useRef(null);
  const womphAcceptedRef = useRef(null);
  const fixedCounterRectRef = useRef(null);
  const shutdownLineRef = useRef(null);
  const shutdownLinePrevRef = useRef(null);
  const pressCountRef = useRef(0);
  const timeoutsRef = useRef({});

  const [hasStarted, setHasStarted] = useState(false);
  const [noPos, setNoPos] = useState({ dx: 0, dy: 0 });
  const [womphCount, setWomphCount] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  const [isShake, setIsShake] = useState(false);
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

  // Setting a key that already has a pending timeout replaces (clears) it.
  const setNamedTimeout = (key, fn, ms) => {
    clearTimeout(timeoutsRef.current[key]);
    timeoutsRef.current[key] = setTimeout(fn, ms);
  };

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, []);

  useBackgroundAudio(bgAudioRef, AUDIO_VOLUME);

  // --- "no" button dodge ---
  // Capture the button's resting position; the dodge offsets are relative to it.
  useLayoutEffect(() => {
    const button = noButtonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    basePosRef.current = { left: rect.left, top: rect.top };
  }, [hasStarted, isLoading, isAccepted, isNoGone]);

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
    setIsBroken(true);
    setIsShake(true);
    setNamedTimeout("shake", () => setIsShake(false), TIMINGS.SHAKE_MS);
    setNamedTimeout("broken", () => setIsBroken(false), TIMINGS.BROKEN_MS);

    pressCountRef.current += 1;
    const message = PRESS_MESSAGES[pressCountRef.current - 1];
    if (message) {
      setPressMessage(message);
    }

    if (pressCountRef.current === PRESS_MESSAGES.length) {
      setIsFlying(true);
      setNamedTimeout("fly", () => setIsNoGone(true), TIMINGS.FLY_AWAY_MS);
    }
  };

  // --- start / accept flow ---
  const handleStartPress = () => {
    // Audio playback is handled by useBackgroundAudio's interaction unlock.
    setHasStarted(true);
  };

  const handleYesPress = () => {
    if (womphFixedRef.current) {
      fixedCounterRectRef.current = womphFixedRef.current.getBoundingClientRect();
    }
    setIsLoading(true);
    setNamedTimeout(
      "loading",
      () => {
        setIsLoading(false);
        setIsAccepted(true);
        setNamedTimeout("shutdown", () => setIsShutdown(true), TIMINGS.SHUTDOWN_DELAY_MS);
      },
      TIMINGS.LOADING_MS,
    );
  };

  // FLIP: animate the womph counter from its fixed corner spot (captured on
  // "yes" press) into its place on the accepted screen.
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

  // --- shutdown reveal ---
  useEffect(() => {
    if (!isShutdown) return;
    setNamedTimeout("jk", () => setShowJk(true), TIMINGS.SHOW_JK_MS);
    setNamedTimeout("heart", () => setShowHeart(true), TIMINGS.SHOW_HEART_MS);
    setNamedTimeout("signature", () => setShowSignature(true), TIMINGS.SHOW_SIGNATURE_MS);
  }, [isShutdown]);

  // FLIP: keep the "just kidding" line centered when the heart appears next to
  // it — measure before, shift, then release on the next frame.
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
