export class AuthError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "AuthError";
  }
}

export async function fetchUpcomingMeetings(
  accessToken
) {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const url = new URL(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events"
  );
  url.searchParams.set(
    "timeMin",
    now.toISOString()
  );
  url.searchParams.set(
    "timeMax",
    endOfDay.toISOString()
  );
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (
    response.status === 401 ||
    response.status === 403
  ) {
    throw new AuthError();
  }

  if (!response.ok) {
    throw new Error("Calendar fetch failed");
  }

  return response.json();
}

export function evaluateMeetings(
  calendarData,
  lastTriggeredMeetingId
) {
  const now = new Date();

  const upcomingMeetings = (
    calendarData.items ?? []
  ).filter((meeting) => {
    if (!meeting.start?.dateTime) return false;
    return (
      new Date(meeting.start.dateTime) > now
    );
  });

  const nearestMeeting = upcomingMeetings[0];
  if (!nearestMeeting) {
    return {
      nextMeeting: null,
      shouldRemind: false,
      meetingId: null,
    };
  }

  const meetingTime = new Date(
    nearestMeeting.start.dateTime
  );

  const minutesRemaining = Math.floor(
    (meetingTime - now) / (1000 * 60)
  );

  const nextMeeting = {
    title: nearestMeeting.summary,
    minutesRemaining,
  };

  const shouldRemind =
    minutesRemaining <= 5 &&
    minutesRemaining >= 4 &&
    lastTriggeredMeetingId !== nearestMeeting.id;

  return {
    nextMeeting,
    shouldRemind,
    meetingId: nearestMeeting.id,
  };
}
