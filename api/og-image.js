export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const route = searchParams.get('route') || 'asia';

  let targetDate, title;

  if (route === 'sf') {
    targetDate = new Date("2026-03-07T00:00:00Z");
    title = "SF Spring Break Sidequest";
  } else {
    targetDate = new Date("2027-01-10T00:00:00Z");
    title = "Time Until The Asia Trip";
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

  // Generate SVG
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0b1021"/>
      <text x="600" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="48" fill="#f2f4ff" text-anchor="middle" opacity="0.8">
        ${title}
      </text>
      <text x="600" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="140" font-weight="700" fill="#f2f4ff" text-anchor="middle">
        ${countdown}
      </text>
      <text x="600" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="36" fill="#f2f4ff" text-anchor="middle" opacity="0.6">
        days : hours : minutes : seconds
      </text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
    },
  });
}
