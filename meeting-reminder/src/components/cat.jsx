export default function Cat() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "35%",
        transform: "translate(-50%, -50%)",
        zIndex: 200,
      }}
    >
      <img
        src="/cat.gif"
        alt="MeetCat"
        style={{
          width: "350px",
        }}
      />
    </div>
  );
}