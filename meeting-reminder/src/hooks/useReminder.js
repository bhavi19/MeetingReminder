import { useReminderStore } from "../store/reminderStore";

export const useReminder = () => {
  const setShowReminderScene = useReminderStore(
    (state) => state.setShowReminderScene
  );

  const handleReminder = () => {
    setShowReminderScene(true);

    setTimeout(() => {
      setShowReminderScene(false);
    }, 4000);
  };

  return {
    handleReminder,
  };
};
