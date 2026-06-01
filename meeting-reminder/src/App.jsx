import { useState, useEffect } from "react";
import Reminder from "./components/reminder";
import { playMeow } from "./utils/playAudio";
import Overlay from "./components/overlay";
import Cat from "./components/cat";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "./store/authStore";
import { useReminderStore } from "./store/reminderStore";
import { useReminder } from "./hooks/useReminder";
import { useCalendar } from "./hooks/useCalendar";
import SetupScreen from "./components/setupScreen";
import ConnectedScreen from "./components/connectedScreen";
import ReminderScene from "./components/reminderScreen";
import { getUserProfile } from "./services/calendar";


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
  const clearAccessToken = useAuthStore(
    (state) => state.clearAccessToken
  );
  const setUser = useAuthStore(
    (state) => state.setUser
  );



  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.readonly",

    onSuccess: async (tokenResponse) => {
      console.log("LOGIN SUCCESS");

      const profile =
        await getUserProfile(
          tokenResponse.access_token
        );

      console.log(profile);

      setUser(profile);

      setAccessToken(
        tokenResponse.access_token
      );

      localStorage.setItem(
        "token",
        tokenResponse.access_token
      );

      await checkMeetings(
        tokenResponse.access_token
      );
    }

  });
  const disconnect = () => {
    localStorage.removeItem(
      "token"
    );

    clearAccessToken();
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    const loadMeetings = async () => {
      try {
        setAccessToken(token);

        await checkMeetings(token);
      } catch (error) {
        if (
          error?.response?.status === 401
        ) {
          disconnect();
        }
      }
    };

    loadMeetings();
  }, []);
  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(
      async () => {
        try {
          await checkMeetings(
            accessToken
          );
        } catch (error) {
          if (
            error?.response?.status ===
            401
          ) {
            disconnect();
          }
        }
      },
      60000
    );

    return () => clearInterval(interval);
  }, [accessToken]);

  // TEMP: keep the reminder scene on screen for design/testing.
  // Set to false (or delete this block) to restore the normal flow.
  const DEBUG_REMINDER = true;
  if (DEBUG_REMINDER) {
    return (
      <>
        {/* Faux webpage so the dim overlay reads as a real "dim",
            not a gray void. This stand-in disappears in the actual
            extension, where the dim sits over the user's real page. */}
        <div
          style={{
            minHeight: "100vh",
            padding: "48px",
            fontFamily:
              "system-ui, -apple-system, sans-serif",
            color: "#1f2937",
            background:
              "linear-gradient(160deg, #f8fafc 0%, #eef2ff 60%, #fef9f3 100%)",
          }}
        >
          <h1 style={{ fontSize: "32px" }}>
            Your work, in progress…
          </h1>
          <p style={{ maxWidth: "640px", lineHeight: 1.7 }}>
            This is a stand-in for whatever page the user is
            looking at. The Snooze Cat gently dims it and pops
            in with a reminder — then gets out of the way.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                style={{
                  flex: 1,
                  height: "120px",
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow:
                    "0 6px 20px rgba(0,0,0,0.06)",
                }}
              />
            ))}
          </div>
        </div>
        <ReminderScene
          nextMeeting={
            nextMeeting ?? {
              title: "Design Review",
              minutesRemaining: 5,
            }
          }
        />
      </>
    );
  }

  if (showCat || showReminder) {
    return (
      <ReminderScene
        nextMeeting={nextMeeting}
      />
    );
  }

  if (!accessToken) {
    return (
      <SetupScreen
        onConnect={() => login()}
      />
    );
  }

  return (
    <ConnectedScreen
      nextMeeting={nextMeeting}
      onDisconnect={disconnect}
    />
  );

}