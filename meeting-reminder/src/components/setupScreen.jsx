export default function SetupScreen({
    onConnect,
}) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                gap: "20px",
            }}
        >
            <div
                style={{
                    fontSize: "80px",
                }}
            >
                🐱
            </div>

            <h1
                style={{
                    margin: 0,
                }}
            >
                Snooze cat
            </h1>

            <p
                style={{
                    color: "#666",
                    maxWidth: "350px",
                    lineHeight: "1.6",
                    margin: 0,
                }}
            >
                Your meeting companion.
                Never miss a meeting again.
            </p>

            <button
                onClick={onConnect}
                style={{
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                }}
            >
                Connect Google Calendar
            </button>
        </div>
    );
}