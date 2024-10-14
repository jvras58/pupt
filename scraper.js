const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.goto('https://www.google.com');

  await page.waitForSelector('#APjFqb');

  await page.type('#APjFqb', 'ping');
  await page.keyboard.press('Enter');

  await page.waitForSelector('#search');

  const screenshotsDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'google_search.png') });

  await browser.close();
})();