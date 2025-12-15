export const config = {
  matcher: ['/sf-sidequest'],
};

export default async function middleware(request) {
  const url = new URL(request.url);

  // Fetch the index.html
  const indexUrl = new URL('/', url.origin);
  const response = await fetch(indexUrl);
  let html = await response.text();

  // Replace meta tags for SF sidequest
  html = html.replace(
    '<meta property="og:title" content="Time Until The Asia Trip" />',
    '<meta property="og:title" content="SF Spring Break Sidequest" />'
  );
  html = html.replace(
    '<meta property="og:description" content="Countdown to January 10, 2027" />',
    '<meta property="og:description" content="Countdown to March 7, 2026" />'
  );
  html = html.replace(
    '<meta property="og:image" content="https://time-till-the-asia-tour.vercel.app/api/og-image" />',
    '<meta property="og:image" content="https://time-till-the-asia-tour.vercel.app/api/og-image?route=sf" />'
  );
  html = html.replace(
    '<meta name="twitter:title" content="Time Until The Asia Trip" />',
    '<meta name="twitter:title" content="SF Spring Break Sidequest" />'
  );
  html = html.replace(
    '<meta name="twitter:description" content="Countdown to January 10, 2027" />',
    '<meta name="twitter:description" content="Countdown to March 7, 2026" />'
  );
  html = html.replace(
    '<meta name="twitter:image" content="https://time-till-the-asia-tour.vercel.app/api/og-image" />',
    '<meta name="twitter:image" content="https://time-till-the-asia-tour.vercel.app/api/og-image?route=sf" />'
  );

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
