// Exactly one option should have `correct: true`.
export const QUIZ = {
  question: "what do we have in common?",
  options: [
    { id: "a", label: 'we like "fucking" (the phrase my heart)', correct: false },
    { id: "b", label: "rating food", correct: false },
    { id: "c", label: "we are both autistic", correct: true },
    { id: "d", label: "we like the opposite colors of the chocolate 😉", correct: false },
  ],
};

// Shown one after another on each wrong press, then loops.
export const WRONG_MESSAGES = [
  "nope. think harder",
  "wrong!! are you serious rn",
  "girl... no",
  "ok now you're just guessing",
];

export const TIMINGS = {
  SHAKE_MS: 200,
  // How long "correct!" holds before the photos slide in.
  CORRECT_HOLD_MS: 1200,
};
