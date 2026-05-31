import { useState, useEffect } from "react";
import Reminder from "./components/Reminder";
import { playMeow } from "./utils/playAudio";
import Overlay from "./components/Overlay";
import Cat from "./components/cat";
import { useGoogleLogin } from "@react-oauth/google";
import { getUpcomingMeetings } from "./services/calendar";
import { useAuthStore } from "./store/authStore";
import { useReminderStore } from "./store/reminderStore";
import { useReminder } from "./hooks/useReminder";
import { useCalendar } from "./hooks/useCalendar";



export default function App() {

  const [meetings, setMeetings] = useState([]);
  const { handleReminder } =
    useReminder();

  const { checkMeetings } =
    useCalendar(handleReminder);
  const showCat = useReminderStore(
    (state) => state.showCat
  );

  const setShowCat = useReminderStore(
    (state) => state.setShowCat
  );

  const showReminder = useReminderStore(
    (state) => state.showReminder
  );

  const setShowReminder = useReminderStore(
    (state) => state.setShowReminder
  );

  const nextMeeting = useReminderStore(
    (state) => state.nextMeeting
  );

  const setNextMeeting = useReminderStore(
    (state) => state.setNextMeeting
  );

  const triggeredReminders =
    useReminderStore(
      (state) => state.triggeredReminders
    );

  const addTriggeredReminder =
    useReminderStore(
      (state) => state.addTriggeredReminder
    );
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );
  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken
  );

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.readonly",

    onSuccess: async (tokenResponse) => {
      localStorage.setItem(
        "token",
        tokenResponse.access_token
      );

      setAccessToken(
        tokenResponse.access_token
      );

      await checkMeetings(
        tokenResponse.access_token
      );
    }
  });

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      setAccessToken(token);
      checkMeetings(token);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(() => {
      checkMeetings(accessToken);
    }, 60000);

    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
      }}
    >

      <h1>🐱 MeetCat</h1>
      <button onClick={() => login()}>
        Connect Google Calendar
      </button>
      {nextMeeting && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "400px",
            marginInline: "auto",
          }}
        >
          <h3>📅 Next Meeting</h3>

          <p>
            <strong>{nextMeeting.title}</strong>
          </p>

          <p>
            Starts in {nextMeeting.minutesRemaining} mins
          </p>
        </div>)}

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
      {showReminder && nextMeeting && (
        <Reminder
          title={nextMeeting.title}
          minutesRemaining={nextMeeting.minutesRemaining}
        />
      )}    </div>
  );
}