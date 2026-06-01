import { create } from "zustand";

export const useReminderStore = create((set) => ({
  showReminderScene: false,
  nextMeeting: null,
  lastTriggeredMeetingId: null,

  setShowReminderScene: (showReminderScene) =>
    set({ showReminderScene }),

  setNextMeeting: (nextMeeting) =>
    set({ nextMeeting }),

  setLastTriggeredMeetingId: (meetingId) =>
    set({ lastTriggeredMeetingId: meetingId }),
}));
