import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "../store/authStore";
import { useReminderStore } from "../store/reminderStore";
import SetupScreen from "../components/setupScreen";
import ConnectedScreen from "../components/connectedScreen";
import { getUserProfile } from "../services/calendar";
import {
  getNextMeeting,
  getSession,
  saveSession,
} from "../shared/storage";
import "./popup.css";

export default function PopupApp() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );
  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken
  );
  const setUser = useAuthStore(
    (state) => state.setUser
  );
  const setNextMeeting = useReminderStore(
    (state) => state.setNextMeeting
  );

  const login = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/calendar.readonly",

    onSuccess: async (tokenResponse) => {
      const profile = await getUserProfile(
        tokenResponse.access_token
      );

      setUser(profile);
      setAccessToken(tokenResponse.access_token);
      await saveSession(
        tokenResponse.access_token,
        profile
      );

      chrome.runtime.sendMessage({
        type: "CHECK_MEETINGS",
      });
    },
  });

  useEffect(() => {
    const hydrate = async () => {
      const [{ token, user }, nextMeeting] =
        await Promise.all([
          getSession(),
          getNextMeeting(),
        ]);

      if (token) setAccessToken(token);
      if (user) setUser(user);
      if (nextMeeting) setNextMeeting(nextMeeting);
    };

    hydrate();
  }, []);

  if (!accessToken) {
    return (
      <SetupScreen onConnect={() => login()} />
    );
  }

  return <ConnectedScreen />;
}
