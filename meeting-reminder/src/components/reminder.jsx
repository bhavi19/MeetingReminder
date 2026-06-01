import { useAuthStore } from "../store/authStore";

export default function Reminder({
  title,
  minutesRemaining,
}) {
  const user = useAuthStore(
    (state) => state.user
  );

  const firstName =
    user?.given_name?.split(" ")[0];

  const minutes = Math.max(
    0,
    Math.round(minutesRemaining ?? 0)
  );

  const timeLabel =
    minutes <= 0
      ? "Starting now"
      : `Starts in ${minutes} ${minutes === 1 ? "minute" : "minutes"
      }`;

  return (
    <div className="reminder-bubble">
      <p className="reminder-greeting">
        Hey{firstName ? ` ${firstName}` : " there"}! 🐾
      </p>

      <p className="reminder-message">
        Your meeting{" "}
        <span className="reminder-meeting-name">
          “{title || "Your meeting"}”
        </span>{" "}
        {minutes <= 0
          ? "is starting now."
          : "is coming up soon."}
      </p>

      <div className="reminder-time">
        <span
          className="reminder-time-dot"
          aria-hidden="true"
        />
        {timeLabel}
      </div>
    </div>
  );
}
