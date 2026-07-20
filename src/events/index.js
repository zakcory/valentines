import ValentineGame from "./valentine/ValentineGame";
import BirthdayGame from "./birthday/BirthdayGame";

// Each event: { id, name, date, Component }. Component null = not built yet;
// the menu lists it but selecting it does nothing.
export const EVENTS = [
  {
    id: "valentine",
    name: "Valentines",
    date: "14.02.2026",
    Component: ValentineGame,
  },
  {
    id: "birthday-21",
    name: "Your 21st BDay",
    date: "21.07.2026",
    Component: BirthdayGame,
  },
];
