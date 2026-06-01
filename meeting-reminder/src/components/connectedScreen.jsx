import "./SetupScreen.css";
import { useAuthStore } from "../store/authStore";
import { useReminderStore } from "../store/reminderStore";

export default function ConnectedScreen() {
  const firstName = useAuthStore(
    (state) => state.user?.given_name?.split(" ")[0]
  );
  const nextMeeting = useReminderStore(
    (state) => state.nextMeeting
  );

  return (
    <div className="setup-screen">
      <div className="setup-card">
        <div className="setup-cat-wrap">
          <div className="setup-cat-glow" aria-hidden="true" />
          <div className="setup-cat" role="img" aria-label="Snooze cat">
            🐱
          </div>
        </div>

        <h1 className="setup-title">
          {firstName ? `Hi, ${firstName}!` : "You're connected"}
        </h1>

        <p className="setup-subtitle">
          Snooze Cat is watching your calendar. You&apos;ll get a gentle
          reminder <strong>5 minutes before</strong> each meeting.
        </p>

        {nextMeeting?.title && (
          <p className="setup-subtitle">
            Up next:{" "}
            <strong>{nextMeeting.title}</strong>
            {typeof nextMeeting.minutesRemaining === "number" &&
              nextMeeting.minutesRemaining > 0 && (
                <>
                  {" "}
                  in{" "}
                  <strong>
                    {nextMeeting.minutesRemaining}{" "}
                    {nextMeeting.minutesRemaining === 1
                      ? "minute"
                      : "minutes"}
                  </strong>
                </>
              )}
          </p>
        )}

        <p className="setup-privacy">
          Close this window and keep working — Snooze Cat has your back.
        </p>
      </div>
    </div>
  );
}
