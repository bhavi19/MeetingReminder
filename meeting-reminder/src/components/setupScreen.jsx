import "./SetupScreen.css";

export default function SetupScreen({ onConnect }) {
    return (
        <div className="setup-screen">
            <div className="setup-card">
                <div className="setup-cat-wrap">
                    <div className="setup-cat-glow" aria-hidden="true" />
                    <div className="setup-cat" role="img" aria-label="Snooze cat">
                        🐱
                    </div>
                </div>

                <h1 className="setup-title">Snooze Cat</h1>

                <p className="setup-subtitle">
                    A cute Kitty pops in{" "}
                    <strong>5 minutes before</strong> each meeting — so
                    you&apos;re never caught off guard.
                </p>

                <ul className="setup-features">
                    <li>
                        <span className="setup-feature-dot setup-dot-blue" />
                        5-minute heads-up
                    </li>
                    <li>
                        <span className="setup-feature-dot setup-dot-green" />
                        Syncs with Google Calendar
                    </li>
                    {/* <li>
                        <span className="setup-feature-dot setup-dot-yellow" />
                        Gentle, quiet nudges
                    </li> */}
                </ul>

                <button
                    type="button"
                    className="setup-google-btn"
                    onClick={onConnect}
                >
                    <span className="setup-google-icon" aria-hidden="true">
                        <GoogleLogo />
                    </span>
                    Connect Google Calendar
                </button>

                <p className="setup-privacy">
                    We only read your calendar to time reminders. Nothing is stored or
                    shared.
                </p>
            </div>
        </div>
    );
}

function GoogleLogo() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62Z"
            />
            <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
            />
            <path
                fill="#FBBC05"
                d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
            />
            <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.99 8.99 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
            />
        </svg>
    );
}