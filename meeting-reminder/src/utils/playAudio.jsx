export const playMeow = () => {
  const audio = new Audio("/meow.mp3");

  audio.play().catch((error) => {
    console.error(error);
  });
};