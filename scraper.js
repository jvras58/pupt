const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  // Inicia o navegador com o caminho do executável do Chromium, a flag --no-sandbox e desativa o modo headless
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox'],
    // headless: false // Desativa o modo headless
  });
  const page = await browser.newPage();

  // Vai até o Google
  await page.goto('https://www.google.com');

  // Aguarda o campo de pesquisa estar presente
  await page.waitForSelector('#APjFqb'); // Utiliza o id do textarea

  // Digita "ping" na barra de pesquisa e aperta Enter
  await page.type('#APjFqb', 'ping'); // Digita 'ping'
  await page.keyboard.press('Enter');  // Simula o pressionamento de Enter

  // Aguarda o carregamento dos resultados da pesquisa
  await page.waitForSelector('#search');

  // Cria a pasta 'screenshots' se não existir
  const screenshotsDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  // Tira uma captura de tela dos resultados da pesquisa e salva no workspace
  await page.screenshot({ path: path.join(screenshotsDir, 'google_search.png') });

  // Fecha o navegador
  await browser.close();
})();