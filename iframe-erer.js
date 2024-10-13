const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox'],
    // headless: false // Descomente para visualizar o navegador
  });
  
  const page = await browser.newPage();


  await page.goto('https://www.cin.ufpe.br/~jvras/disc_estatisticas_gerais.html');


  const iframeElement = await page.waitForSelector('#iframe-ERER');
  const iframe = await iframeElement.contentFrame();

  if (iframe) {
    const iframeHtml = await iframe.content();

    const htmlFilePath = path.resolve(__dirname, 'iframe_content.html');

    fs.writeFileSync(htmlFilePath, iframeHtml);

    console.log(`O HTML do iframe foi salvo em: ${htmlFilePath}`);


    await iframe.waitForSelector('button.lego-control.md-button');
    await iframe.click('button.lego-control.md-button');

    const screenshotsDir = path.resolve(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    await page.screenshot({ path: path.join(screenshotsDir, 'after_button_click.png') });
  } else {
    console.log('Não foi possível acessar o conteúdo do iframe.');
  }

  await browser.close();
})();
