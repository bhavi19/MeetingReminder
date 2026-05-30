export default function Reminder() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        display: "flex",
        alignItems: "center",
        gap: "20px",

        zIndex: 300,
      }}
    >
      <img
        src="/cat.gif"
        alt="MeetCat"
        style={{
          width: "350px",
        }}
      />

      <div
        style={{
          width: "350px",
          background: "#22c55e",
          color: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
          }}
        >
          🐱 Meow Bhaviii!
        </h3>

        <p>
          Daily Standup starts in 5 mins.
        </p>
      </div>
    </div>
  );
}