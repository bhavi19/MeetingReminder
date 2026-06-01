export default function Reminder({
  title,
  minutesRemaining,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "65%",
        transform: "translate(-50%, -50%)",

        width: "350px",

        background: "#22c55e",
        color: "white",

        padding: "20px",

        borderRadius: "16px",

        boxShadow:
          "0 10px 25px rgba(0,0,0,0.2)",

        zIndex: 300,
      }}
    >
      <h3>
        🐱 Hii Bhaviii!
      </h3>

      <p>
        {title} starts in{" "}
        {minutesRemaining} mins.
      </p>
    </div>
  );
}