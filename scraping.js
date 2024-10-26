import puppeteer from "puppeteer";
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Defina como false para ver o navegador em ação
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.goto('https://www.google.com');

  await page.waitForSelector('#APjFqb');

  await page.type('#APjFqb', 'ping');
  await page.keyboard.press('Enter');

  await page.waitForSelector('#search');

  const screenshotsDir = path.resolve(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'google_search.png') });

  await browser.close();
})();