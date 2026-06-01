let audio;
let unlocked = false;

const getAudio = () => {
  if (!audio) {
    audio = new Audio("/meow.mp3");
    audio.preload = "auto";
  }
  return audio;
};

// Browsers block audio playback until the user interacts with the page.
// We "unlock" the audio element during the first real user gesture so that
// later reminder-triggered playback (which happens from a timer, with no
// gesture) is allowed.
const unlockAudio = () => {
  if (unlocked) return;

  const a = getAudio();
  a.muted = true;

  a.play()
    .then(() => {
      a.pause();
      a.currentTime = 0;
      a.muted = false;
      unlocked = true;
    })
    .catch(() => {
      a.muted = false;
    });
};

if (typeof window !== "undefined") {
  const events = ["click", "keydown", "touchstart"];

  const handler = () => {
    unlockAudio();

    if (unlocked) {
      events.forEach((e) =>
        window.removeEventListener(e, handler)
      );
    }
  };

  events.forEach((e) =>
    window.addEventListener(e, handler)
  );
}

export const playMeow = () => {
  const a = getAudio();
  a.currentTime = 0;

  a.play().catch((error) => {
    console.error("meow play failed:", error);
  });
};
