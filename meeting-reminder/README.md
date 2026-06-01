# Snooze Cat — Chrome Extension

Gentle meeting reminders with a friendly cat, 5 minutes before each calendar event.

## Branches

| Branch | Purpose |
|--------|---------|
| `new-design` | UI/design work + **Disconnect** button for testing |
| `deployment` | Production popup (no disconnect, re-sign-in on auth errors) |
| `chrome-extension` | Chrome MV3 extension packaging (merge into `deployment`) |

## Develop the extension

```bash
npm install
npm run dev
```

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `dist` folder (created when dev/build runs)

## Build for release

```bash
npm run build
```

Load the `dist/` folder as an unpacked extension, or zip it for the Chrome Web Store.

## Optional: web app dev (non-extension)

```bash
npm run dev:web
```

Uses `index.html` + `App.jsx` for local browser testing without the extension shell.

## Google OAuth setup

Chrome keeps users signed in by refreshing tokens automatically via `chrome.identity`.

1. In [Google Cloud Console](https://console.cloud.google.com/), create an OAuth client of type **Chrome extension**.
2. Use your extension ID from `chrome://extensions` (Load unpacked first to get the ID).
3. Add the same client ID to `.env` as `VITE_GOOGLE_CLIENT_ID` (used in `manifest.config.js` → `oauth2.client_id`).
4. Enable the **Google Calendar API** for your project.

Users sign in once; Chrome refreshes access tokens in the background. They only see Connect again if they revoke access or clear extension data.

## How it works

- **Popup** — Connect Google Calendar or view connected status.
- **Background** — Checks calendar every minute via `chrome.alarms`.
- **Content script** — Injects the cat + reminder overlay on the active tab when a meeting is 4–5 minutes away.
- **Auth errors** — Clears session; opening the popup shows sign-in again.
