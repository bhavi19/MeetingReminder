import {
  clearSession,
  getLastTriggeredMeetingId,
  saveNextMeeting,
  setLastTriggeredMeetingId,
} from "../shared/storage.js";
import {
  getAccessToken,
  removeCachedAuthToken,
} from "../shared/extensionAuth.js";
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

async function checkWithToken(token) {
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
}

export async function runMeetingCheck() {
  let token;

  try {
    token = await getAccessToken(false);
  } catch {
    return;
  }

  try {
    await checkWithToken(token);
  } catch (error) {
    if (!(error instanceof AuthError)) return;

    // Token may be stale — invalidate and let Chrome issue a fresh one.
    await removeCachedAuthToken(token);

    try {
      const freshToken = await getAccessToken(false);
      await checkWithToken(freshToken);
    } catch {
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
