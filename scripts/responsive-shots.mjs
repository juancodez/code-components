import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = 'scripts/shots';
fs.mkdirSync(OUT, { recursive: true });

const sizes = [
  { label: '375-iphone', width: 375, height: 812 },
  { label: '640-break', width: 640, height: 900 },
];

const url = process.argv[2] ?? 'http://localhost:5173/';

const browser = await chromium.launch();
for (const s of sizes) {
  const ctx = await browser.newContext({ viewport: { width: s.width, height: s.height }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(800);

  // Hero
  await page.screenshot({ path: `${OUT}/${s.label}-hero.png`, fullPage: false });

  // Scroll to testimonials — the TestimonialSlider has class tslider-section
  const testimonial = await page.$('.tslider-section');
  if (testimonial) {
    await testimonial.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${s.label}-testimonial.png`, fullPage: false });
  }

  console.log(`${s.width}x${s.height} done`);
  await ctx.close();
}
await browser.close();
