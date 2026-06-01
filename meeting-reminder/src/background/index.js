import {
  clearSession,
  getLastTriggeredMeetingId,
  getSession,
  saveNextMeeting,
  setLastTriggeredMeetingId,
} from "../shared/storage.js";
import {
  AuthError,
  evaluateMeetings,
  fetchUpcomingMeetings,
} from "../shared/meetingCheck.js";

async function showReminderOnActiveTab(
  nextMeeting
) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) return;

  try {
    await chrome.tabs.sendMessage(tab.id, {
      type: "SHOW_REMINDER",
      nextMeeting,
    });
  } catch {
    // Content script may not be loaded on chrome:// or restricted pages.
  }
}

export async function runMeetingCheck() {
  const { token } = await getSession();
  if (!token) return;

  try {
    const calendarData =
      await fetchUpcomingMeetings(token);
    const lastTriggeredMeetingId =
      await getLastTriggeredMeetingId();

    const {
      nextMeeting,
      shouldRemind,
      meetingId,
    } = evaluateMeetings(
      calendarData,
      lastTriggeredMeetingId
    );

    if (nextMeeting) {
      await saveNextMeeting(nextMeeting);
    }

    if (shouldRemind && nextMeeting) {
      await setLastTriggeredMeetingId(meetingId);
      await showReminderOnActiveTab(nextMeeting);
    }
  } catch (error) {
    if (error instanceof AuthError) {
      await clearSession();
    }
  }
}

chrome.alarms.create("check-meetings", {
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "check-meetings") {
    runMeetingCheck();
  }
});

chrome.runtime.onMessage.addListener(
  (message, _sender, sendResponse) => {
    if (message?.type === "CHECK_MEETINGS") {
      runMeetingCheck().then(() =>
        sendResponse({ ok: true })
      );
      return true;
    }

    return undefined;
  }
);

runMeetingCheck();
