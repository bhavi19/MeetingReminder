import { useEffect } from "react";
import "./ReminderScene.css";
import Overlay from "./overlay";
import Cat from "./cat";
import Reminder from "./reminder";
import { playMeow } from "../utils/playAudio";

export default function ReminderScene({
    nextMeeting,
}) {
    useEffect(() => {
        // Greet the user with a meow when the cat appears.
        playMeow();
    }, []);

    return (
        <>
            <Overlay />
            <div
                className="reminder-scene"
                onClick={playMeow}
            >
                <div
                    className="reminder-stack"
                    role="alert"
                    aria-live="assertive"
                >
                    <Cat />
                    <Reminder
                        title={nextMeeting?.title}
                        minutesRemaining={
                            nextMeeting?.minutesRemaining
                        }
                    />
                </div>
            </div>
        </>
    );
}
