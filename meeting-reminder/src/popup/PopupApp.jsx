import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useReminderStore } from "../store/reminderStore";
import SetupScreen from "../components/setupScreen";
import ConnectedScreen from "../components/connectedScreen";
import { getUserProfile } from "../services/calendar";
import {
  getAccessToken,
} from "../shared/extensionAuth";
import {
  clearSession,
  getNextMeeting,
  getSession,
  saveSession,
} from "../shared/storage";
import "./popup.css";

export default function PopupApp() {
  const [isConnecting, setIsConnecting] =
    useState(false);
  const [authError, setAuthError] = useState(null);

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

  const connect = async () => {
    setIsConnecting(true);
    setAuthError(null);

    try {
      const token = await getAccessToken(true);
      const profile = await getUserProfile(token);

      setUser(profile);
      setAccessToken(token);
      await saveSession(profile);

      chrome.runtime.sendMessage({
        type: "CHECK_MEETINGS",
      });
    } catch {
      setAuthError(
        "Could not connect. Please try again."
      );
      setAccessToken(null);
      setUser(null);
      await clearSession();
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const hydrate = async () => {
      try {
        const [token, { user }, nextMeeting] =
          await Promise.all([
            getAccessToken(false),
            getSession(),
            getNextMeeting(),
          ]);

        setAccessToken(token);
        if (user) setUser(user);
        if (nextMeeting) setNextMeeting(nextMeeting);
      } catch {
        setAccessToken(null);
      }
    };

    hydrate();
  }, []);

  if (!accessToken) {
    return (
      <>
        <SetupScreen
          onConnect={() => {
            if (!isConnecting) connect();
          }}
        />
        {authError && (
          <p className="popup-auth-error">{authError}</p>
        )}
      </>
    );
  }

  return <ConnectedScreen />;
}
