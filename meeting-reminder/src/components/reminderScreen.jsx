import Overlay from "./Overlay";
import Cat from "./cat";
import Reminder from "./Reminder";

export default function ReminderScene({
    nextMeeting,
}) {
    return (
        <>
            <Overlay />
            <Cat />
            <Reminder
                title={nextMeeting?.title}
                minutesRemaining={
                    nextMeeting?.minutesRemaining
                }
            />
        </>
    );
}