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

  const meetingTitle =
    title || "Your meeting";

  const timeLabel =
    minutes <= 0
      ? "Starting now"
      : `${minutes} ${minutes === 1 ? "minute" : "minutes"
        }`;

  return (
    <div className="reminder-bubble-wrap">
      <div className="reminder-bubble">
        <span
          className="reminder-paw-sticker"
          aria-hidden="true"
        >
          🐾
        </span>
        <p className="reminder-message">
          Hii{firstName ? ` ${firstName}` : ""}! You
          have —{" "}
          <span className="reminder-meeting-name">
            {meetingTitle}
          </span>{" "}
          {minutes <= 0 ? (
            <span className="reminder-time">
              <span
                className="reminder-time-dot"
                aria-hidden="true"
              />
              {timeLabel}
            </span>
          ) : (
            <>
              in{" "}
              <span className="reminder-time">
                <span
                  className="reminder-time-dot"
                  aria-hidden="true"
                />
                {timeLabel}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
