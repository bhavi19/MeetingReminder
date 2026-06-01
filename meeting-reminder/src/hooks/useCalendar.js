import { getUpcomingMeetings } from "../services/calendar";
import { useReminderStore } from "../store/reminderStore";

export const useCalendar = (
  handleReminder
) => {
  const setNextMeeting = useReminderStore(
    (state) => state.setNextMeeting
  );

  const lastTriggeredMeetingId =
    useReminderStore(
      (state) =>
        state.lastTriggeredMeetingId
    );

  const setLastTriggeredMeetingId =
    useReminderStore(
      (state) =>
        state.setLastTriggeredMeetingId
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
        minutesRemaining >= 4 &&
        lastTriggeredMeetingId !==
        nearestMeeting.id
      ) {
        handleReminder();

        setLastTriggeredMeetingId(
          nearestMeeting.id
        );
      }

      // if (
      //   minutesRemaining <= 3 &&
      //   !triggeredReminders.includes(
      //     `${meetingId}-3`
      //   )
      // ) {
      //   handleReminder();

      //   addTriggeredReminder(
      //     `${meetingId}-3`
      //   );
      // }
    } catch (error) {
      if (
        error?.response?.status === 401
      ) {
        throw new Error(
          "TOKEN_EXPIRED"
        );
        setAuthExpired();
        disconnect();
      }

      throw error;
    }
  };

  return {
    checkMeetings,
  };
};