import { create } from "zustand";

export const useReminderStore = create((set) => ({
  showCat: false,
  showReminder: false,
  nextMeeting: null,
  lastTriggeredMeetingId: null,

  setShowCat: (showCat) =>
    set({ showCat }),

  setShowReminder: (showReminder) =>
    set({ showReminder }),

  setNextMeeting: (nextMeeting) =>
    set({ nextMeeting }),

  addTriggeredReminder: (reminderId) =>
    set((state) => ({
      triggeredReminders: [
        ...state.triggeredReminders,
        reminderId,
      ],
    })),
  resetReminderStore: () =>
    set({
      showCat: false,
      showReminder: false,
      nextMeeting: null,
      triggeredReminders: [],
    }),
  setLastTriggeredMeetingId: (
    meetingId
  ) =>
    set({
      lastTriggeredMeetingId:
        meetingId,
    }),
}));