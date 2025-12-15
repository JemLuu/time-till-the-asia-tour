import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const route = searchParams.get('route') || 'asia';

  let targetDate, title, subtitle;

  if (route === 'sf') {
    targetDate = new Date("2026-03-07T00:00:00Z");
    title = "SF Spring Break Sidequest";
    subtitle = "days : hours : minutes : seconds";
  } else {
    targetDate = new Date("2027-01-10T00:00:00Z");
    title = "Time Until The Asia Trip";
    subtitle = "days : hours : minutes : seconds";
  }

  const now = new Date();
  let diff = targetDate.getTime() - now.getTime();

  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value) => String(value).padStart(2, "0");
  const countdown = `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0b1021',
          color: '#f2f4ff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '120px',
          fontWeight: '600',
          letterSpacing: '0.06em',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '40px', opacity: 0.8 }}>
          {title}
        </div>
        <div style={{ fontSize: '140px', fontWeight: '700' }}>
          {countdown}
        </div>
        <div style={{ fontSize: '36px', marginTop: '40px', opacity: 0.6 }}>
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
