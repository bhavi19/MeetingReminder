import { assetUrl } from "./assetUrl.js";

let audio;
let unlocked = false;

const getAudio = () => {
  if (!audio) {
    audio = new Audio(assetUrl("meow.mp3"));
    audio.preload = "auto";
  }
  return audio;
};

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
