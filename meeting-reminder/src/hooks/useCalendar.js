import { getUpcomingMeetings } from "../services/calendar";
import { useReminderStore } from "../store/reminderStore";

export const useCalendar = (
  handleReminder
) => {
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

  const checkMeetings = async (token) => {
    try {
      const calendarData =
        await getUpcomingMeetings(token);

      const now = new Date();

      const upcomingMeetings =
        calendarData.items.filter(
          (meeting) => {
            if (
              !meeting.start?.dateTime
            )
              return false;

            return (
              new Date(
                meeting.start.dateTime
              ) > now
            );
          }
        );

      const nearestMeeting =
        upcomingMeetings[0];

      if (!nearestMeeting) return;

      const meetingTime = new Date(
        nearestMeeting.start.dateTime
      );

      const minutesRemaining =
        Math.floor(
          (meetingTime - now) /
            (1000 * 60)
        );

      setNextMeeting({
        title: nearestMeeting.summary,
        minutesRemaining,
      });

      const meetingId =
        nearestMeeting.id;

      if (
        minutesRemaining <= 5 &&
        !triggeredReminders.includes(
          `${meetingId}-5`
        )
      ) {
        handleReminder();

        addTriggeredReminder(
          `${meetingId}-5`
        );
      }

      if (
        minutesRemaining <= 3 &&
        !triggeredReminders.includes(
          `${meetingId}-3`
        )
      ) {
        handleReminder();

        addTriggeredReminder(
          `${meetingId}-3`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    checkMeetings,
  };
};