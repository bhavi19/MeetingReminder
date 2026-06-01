export default function Cat() {
  return (
    <div className="reminder-cat-wrap">
      <div
        className="reminder-cat-glow"
        aria-hidden="true"
      />
      <div className="reminder-cat">
        <img
          src="/cat.gif"
          alt="A cat walking across a laptop keyboard"
        />
      </div>
    </div>
  );
}
