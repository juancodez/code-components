import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://localhost:5173/design-systems.html', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(400);
const img = await page.$('img[src="/roadmap-ds.png"]');
if (!img) { console.log('image not found'); process.exit(1); }
await img.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: 'scripts/shots/ds-roadmap.png', fullPage: false });
console.log('ok');
await browser.close();
