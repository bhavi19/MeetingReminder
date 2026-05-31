import { useState } from "react";
import Reminder from "./components/Reminder";
import { playMeow } from "./utils/playAudio";
import Overlay from "./components/Overlay";
import Cat from "./components/cat";


export default function App() {
  const [showCat, setShowCat] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const handleReminder = () => {
    setShowCat(true);

    setTimeout(() => {
      playMeow();
      setShowReminder(true);
    }, 2000);
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
      {showCat && <Cat />}
      {showReminder && <Reminder />}
    </div>
  );
}