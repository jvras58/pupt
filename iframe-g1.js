const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// iframe do anuncio do conahp 2024 (isso dia 13 ne pode ser que mude)

(async () => {
  // Lançamento do navegador
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    args: ['--no-sandbox'],
    // headless: false // Descomente para visualizar o navegador
  });

  const page = await browser.newPage();

  // Navega para o site do G1
  await page.goto('https://g1.globo.com/pe/pernambuco/', { waitUntil: 'networkidle2' });

  // ===========================================================
  // MÉTODO 1: Selecionar pelo atributo "src"
  // ===========================================================
  try {
    const iframeElementSrc = await page.waitForSelector('iframe[src="https://acdn.adnxs.com/dmp/async_usersync.html"]');
    if (iframeElementSrc) {
      console.log("MÉTODO 1: iframe encontrado pelo src.");
      const iframe = await iframeElementSrc.contentFrame();
      const iframeHtml = await iframe.content();
      fs.writeFileSync(path.resolve(__dirname, 'iframe_content_by_src.html'), iframeHtml);
      console.log("MÉTODO 1: HTML salvo com sucesso.");
    }
  } catch (error) {
    console.log("MÉTODO 1: Não foi possível selecionar o iframe pelo src.", error);
  }

  // ===========================================================
  // MÉTODO 2: Selecionar pelo atributo "sandbox"
  // ===========================================================
  try {
    const iframeElementSandbox = await page.waitForSelector('iframe[sandbox="allow-scripts allow-same-origin"]');
    if (iframeElementSandbox) {
      console.log("MÉTODO 2: iframe encontrado pelo sandbox.");
      const iframe = await iframeElementSandbox.contentFrame();
      const iframeHtml = await iframe.content();
      fs.writeFileSync(path.resolve(__dirname, 'iframe_content_by_sandbox.html'), iframeHtml);
      console.log("MÉTODO 2: HTML salvo com sucesso.");
    }
  } catch (error) {
    console.log("MÉTODO 2: Não foi possível selecionar o iframe pelo sandbox.", error);
  }

  // ===========================================================
  // MÉTODO 3: Selecionar o primeiro iframe na página
  // ===========================================================
  try {
    const iframeElementFirst = await page.waitForSelector('iframe:nth-of-type(1)');
    if (iframeElementFirst) {
      console.log("MÉTODO 3: Primeiro iframe encontrado.");
      const iframe = await iframeElementFirst.contentFrame();
      const iframeHtml = await iframe.content();
      fs.writeFileSync(path.resolve(__dirname, 'iframe_content_by_first.html'), iframeHtml);
      console.log("MÉTODO 3: HTML salvo com sucesso.");
    }
  } catch (error) {
    console.log("MÉTODO 3: Não foi possível selecionar o primeiro iframe.", error);
  }

  // ===========================================================
  // MÉTODO 4: Selecionar por combinação de atributos
  // ===========================================================
  try {
    const iframeElementCombined = await page.waitForSelector('iframe[sandbox="allow-scripts allow-same-origin"][src="https://acdn.adnxs.com/dmp/async_usersync.html"]');
    if (iframeElementCombined) {
      console.log("MÉTODO 4: iframe encontrado pela combinação de atributos.");
      const iframe = await iframeElementCombined.contentFrame();
      const iframeHtml = await iframe.content();
      fs.writeFileSync(path.resolve(__dirname, 'iframe_content_by_combined.html'), iframeHtml);
      console.log("MÉTODO 4: HTML salvo com sucesso.");
    }
  } catch (error) {
    console.log("MÉTODO 4: Não foi possível selecionar o iframe pela combinação de atributos.", error);
  }

  // ===========================================================
  // MÉTODO 5: Selecionar todos os iframes e iterar até encontrar o correto
  // ===========================================================
  try {
    const iframes = await page.$$('iframe'); // Seleciona todos os iframes
    let found = false;
    for (let iframeElement of iframes) {
      const src = await iframeElement.evaluate(el => el.src);
      if (src.includes('acdn.adnxs.com')) {
        console.log("MÉTODO 5: iframe encontrado na iteração.");
        const iframe = await iframeElement.contentFrame();
        const iframeHtml = await iframe.content();
        fs.writeFileSync(path.resolve(__dirname, 'iframe_content_by_iteration.html'), iframeHtml);
        console.log("MÉTODO 5: HTML salvo com sucesso.");
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("MÉTODO 5: Nenhum iframe com o src desejado foi encontrado.");
    }
  } catch (error) {
    console.log("MÉTODO 5: Não foi possível selecionar o iframe na iteração.", error);
  }

  // Fecha o navegador
  await browser.close();
})();
