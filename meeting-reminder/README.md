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

1. Create a **Chrome extension** OAuth client in Google Cloud Console (use your extension ID from `chrome://extensions`).
2. Add `http://localhost:5173/*` for local extension dev if needed.
3. Set `VITE_GOOGLE_CLIENT_ID` in `.env`.

## How it works

- **Popup** — Connect Google Calendar or view connected status.
- **Background** — Checks calendar every minute via `chrome.alarms`.
- **Content script** — Injects the cat + reminder overlay on the active tab when a meeting is 4–5 minutes away.
- **Auth errors** — Clears session; opening the popup shows sign-in again.
