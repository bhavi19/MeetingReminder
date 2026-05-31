import { useState } from "react";
import Reminder from "./components/Reminder";
import { playMeow } from "./utils/playAudio";
import Overlay from "./components/Overlay";
import Cat from "./components/cat";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { getUpcomingMeetings } from "./calendar/googleCalendar";



export default function App() {
  const [showCat, setShowCat] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [meetings, setMeetings] = useState([]);

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
      console.log("ACCESS TOKEN", tokenResponse);

      const meetings = await getUpcomingMeetings(
        tokenResponse.access_token
      );

      console.log(meetings);

      console.log(meetings.items);
      const upcomingMeetings = meetings.items.map((meeting) => ({
        title: meeting.summary,
        start: meeting.start?.dateTime || meeting.start?.date,
      }));
      setMeetings(upcomingMeetings);

      console.log(upcomingMeetings);
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
      {/* {meetings.map((meeting) => (
        <div key={meeting.start}>
          <h4>{meeting.title}</h4>
          <p>{meeting.start}</p>
        </div>
      ))} */}

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
      {showReminder && <Reminder />}
    </div>
  );
}