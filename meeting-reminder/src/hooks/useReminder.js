import { playMeow } from "../utils/playAudio";
import { useReminderStore } from "../store/reminderStore";

export const useReminder = () => {
  const setShowCat = useReminderStore(
    (state) => state.setShowCat
  );

  const setShowReminder = useReminderStore(
    (state) => state.setShowReminder
  );

  const handleReminder = () => {
    setShowCat(true);
    setShowReminder(false);

    setTimeout(() => {
      playMeow();
      setShowReminder(true);
    }, 1000);

    setTimeout(() => {
      setShowCat(false);
      setShowReminder(false);
    }, 4000);
  };

  return {
    handleReminder,
  };
};