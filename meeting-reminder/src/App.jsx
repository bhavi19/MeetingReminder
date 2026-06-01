import { useState, useEffect } from "react";
import Reminder from "./components/Reminder";
import { playMeow } from "./utils/playAudio";
import Overlay from "./components/Overlay";
import Cat from "./components/cat";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "./store/authStore";
import { useReminderStore } from "./store/reminderStore";
import { useReminder } from "./hooks/useReminder";
import { useCalendar } from "./hooks/useCalendar";
import SetupScreen from "./components/setupScreen";
import ConnectedScreen from "./components/ConnectedScreen";
import ReminderScene from "./components/reminderScreen";


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

      try {
        await checkMeetings(tokenResponse.access_token);
      } catch (error) {
        if (
          error.message ===
          "TOKEN_EXPIRED"
        ) {
          disconnect();
        }
      }
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