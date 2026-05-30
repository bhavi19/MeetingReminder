import { useState } from "react";
import Reminder from "./components/Reminder";
import { playMeow } from "./utils/playAudio";
import Overlay from "./components/Overlay";


export default function App() {
  const [showCat, setShowCat] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const handleReminder = () => {
    // Show only cat first
    setShowCat(true);
    setShowReminder(false);

    // After 2 seconds play meow and show reminder
    setTimeout(() => {
     playMeow();

      setShowReminder(true);
    }, 2000);

    // Auto close after 7 seconds total
    setTimeout(() => {
      setShowCat(false);
      setShowReminder(false);
    }, 7000);
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>🐱 MeetCat</h1>

      <button
        onClick={handleReminder}
        style={{
          padding: "12px 24px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        Test Reminder
      </button>
      {showCat && <Overlay />}
      {showReminder && <Reminder />}
    </div>
  );
}