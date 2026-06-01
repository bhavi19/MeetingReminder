import { getUpcomingMeetings } from "../services/calendar";
import { useReminderStore } from "../store/reminderStore";

export const useCalendar = (handleReminder) => {
  const setNextMeeting = useReminderStore(
    (state) => state.setNextMeeting
  );

  const lastTriggeredMeetingId = useReminderStore(
    (state) => state.lastTriggeredMeetingId
  );

  const setLastTriggeredMeetingId = useReminderStore(
    (state) => state.setLastTriggeredMeetingId
  );

  const checkMeetings = async (token) => {
    const calendarData = await getUpcomingMeetings(token);

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
    if (!nearestMeeting) return;

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

    if (
      minutesRemaining <= 5 &&
      minutesRemaining >= 4 &&
      lastTriggeredMeetingId !== nearestMeeting.id
    ) {
      handleReminder();
      setLastTriggeredMeetingId(nearestMeeting.id);
    }
  };

  return {
    checkMeetings,
  };
};
