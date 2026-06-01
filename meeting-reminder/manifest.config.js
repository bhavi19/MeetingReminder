export default {
  manifest_version: 3,
  name: "Snooze Cat",
  version: "1.0.0",
  description:
    "A gentle cat reminds you 5 minutes before every meeting.",
  action: {
    default_title: "Snooze Cat",
    default_popup: "popup.html",
  },
  background: {
    service_worker: "src/background/index.js",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.jsx"],
      run_at: "document_idle",
    },
  ],
  permissions: ["storage", "alarms", "tabs"],
  host_permissions: ["https://www.googleapis.com/*"],
  web_accessible_resources: [
    {
      resources: ["meow.mp3", "cat.gif"],
      matches: ["<all_urls>"],
    },
  ],
};
