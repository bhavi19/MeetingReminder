import { useState } from "react";
import Reminder from "./components/Reminder";
import { playMeow } from "./utils/playAudio";
import Overlay from "./components/Overlay";
import Cat from "./components/cat";
import { useGoogleLogin } from "@react-oauth/google";
import { getUpcomingMeetings } from "./services/calendar";



export default function App() {
  const [showCat, setShowCat] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [nextMeeting, setNextMeeting] = useState(null);

  const handleReminder = () => {
    setShowCat(true);

    setTimeout(() => {
      playMeow();
      setShowReminder(true);
    }, 2000);
  };

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar.readonly",

    onSuccess: async (tokenResponse) => {
      try {
        const calendarData = await getUpcomingMeetings(
          tokenResponse.access_token
        );

        const now = new Date();

        const upcomingMeetings = calendarData.items.filter(
          (meeting) => {
            if (!meeting.start?.dateTime) return false;

            return (
              new Date(meeting.start.dateTime) > now
            );
          }
        );

        const nearestMeeting = upcomingMeetings[0];

        if (!nearestMeeting) {
          alert("No upcoming meetings today");
          return;
        }

        const meetingTime = new Date(
          nearestMeeting.start.dateTime
        );

        const minutesRemaining = Math.floor(
          (meetingTime - now) / (1000 * 60)
        );

        setNextMeeting({
          title: nearestMeeting.summary,
          minutesRemaining,
        });

        if (minutesRemaining <15 ) {
          handleReminder();
        }
      } catch (error) {
        console.error(
          "Failed to fetch meetings",
          error
        );
      }
    },
  });

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