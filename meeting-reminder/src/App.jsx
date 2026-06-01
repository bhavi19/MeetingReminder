import { useEffect } from "react";
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
  const { handleReminder } = useReminder();
  const { checkMeetings } = useCalendar(handleReminder);

  const showReminderScene = useReminderStore(
    (state) => state.showReminderScene
  );
  const nextMeeting = useReminderStore(
    (state) => state.nextMeeting
  );
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );
  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken
  );
  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.readonly",

    onSuccess: async (tokenResponse) => {
      const profile = await getUserProfile(
        tokenResponse.access_token
      );

      setUser(profile);
      setAccessToken(tokenResponse.access_token);
      localStorage.setItem(
        "token",
        tokenResponse.access_token
      );

      await checkMeetings(tokenResponse.access_token);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setAccessToken(token);
    checkMeetings(token).catch(() => {
      // 401/403 clears session via httpClient interceptor
    });
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(() => {
      checkMeetings(accessToken).catch(() => {
        // 401/403 clears session via httpClient interceptor
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [accessToken]);

  if (showReminderScene) {
    return (
      <ReminderScene nextMeeting={nextMeeting} />
    );
  }

  if (!accessToken) {
    return (
      <SetupScreen onConnect={() => login()} />
    );
  }

  return <ConnectedScreen />;
}
