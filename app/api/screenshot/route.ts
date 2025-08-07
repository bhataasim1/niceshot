
import puppeteer from 'puppeteer';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url || typeof url !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing or invalid URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const screenshotBuffer = await page.screenshot({ type: 'png' });
    await browser.close();

    return new Response(screenshotBuffer, {
      status: 200,
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (error) {
    console.error('Error taking screenshot:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to take screenshot', details: String(error) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
