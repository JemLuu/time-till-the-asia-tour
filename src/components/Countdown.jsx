import { useState, useEffect } from 'react'

const fontChoices = [
  {
    name: '"Baloo 2"',
    url: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@600&display=swap",
  },
  {
    name: '"Fredoka"',
    url: "https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap",
  },
  {
    name: '"Comfortaa"',
    url: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap",
  },
  {
    name: '"Chewy"',
    url: "https://fonts.googleapis.com/css2?family=Chewy&display=swap",
  },
  {
    name: '"Pacifico"',
    url: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
  },
  {
    name: '"Caveat"',
    url: "https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap",
  },
];

function Countdown({ targetDate, caption }) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const choice = fontChoices[Math.floor(Math.random() * fontChoices.length)];
    const linkEl = document.createElement("link");
    linkEl.rel = "stylesheet";
    linkEl.href = choice.url;
    linkEl.onload = () => {
      document.body.style.fontFamily = `${choice.name}, "Comic Sans MS", "Trebuchet MS", system-ui, -apple-system, sans-serif`;
    };
    document.head.appendChild(linkEl);
  }, []);

  useEffect(() => {
    const pad = (value) => String(value).padStart(2, "0");

    const updateCountdown = () => {
      const now = new Date();
      let diff = targetDate.getTime() - now.getTime();

      if (diff < 0) diff = 0;

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCountdown(`${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      {caption && (
        <div style={{
          fontSize: 'clamp(1rem, 4vw, 2rem)',
          marginBottom: '2rem',
          opacity: 0.8,
          fontWeight: '500'
        }}>
          {caption}
        </div>
      )}
      <div id="countdown" aria-live="polite">
        {countdown}
      </div>
    </div>
  );
}

export default Countdown
