import httpClient from "./httpClient";

export const getUpcomingMeetings = async (
  accessToken
) => {
  const now = new Date();

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const response = await httpClient.get(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        timeMin: now.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
    }
  );

  return response.data;
};


export const getUserProfile = async (
  accessToken
) => {
  const response = await httpClient.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};