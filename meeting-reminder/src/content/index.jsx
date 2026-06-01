import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReminderScene from "../components/reminderScreen.jsx";
import reminderStyles from "../components/ReminderScene.css?inline";

let hostEl = null;
let shadowRoot = null;
let reactRoot = null;
let hideTimer = null;

function hideReminder() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }

  reactRoot?.unmount();
  reactRoot = null;
  hostEl?.remove();
  hostEl = null;
  shadowRoot = null;
}

function showReminder(nextMeeting) {
  hideReminder();

  hostEl = document.createElement("div");
  hostEl.id = "snooze-cat-root";
  document.documentElement.appendChild(hostEl);

  shadowRoot = hostEl.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = reminderStyles;
  shadowRoot.appendChild(style);

  const mountPoint = document.createElement("div");
  shadowRoot.appendChild(mountPoint);

  reactRoot = createRoot(mountPoint);
  reactRoot.render(
    <StrictMode>
      <ReminderScene nextMeeting={nextMeeting} />
    </StrictMode>
  );

  hideTimer = window.setTimeout(hideReminder, 4000);
}

chrome.runtime.onMessage.addListener(
  (message) => {
    if (message?.type === "SHOW_REMINDER") {
      showReminder(message.nextMeeting);
    }
  }
);
