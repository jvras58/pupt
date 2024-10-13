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

  // Navega para o seu site de portfólio
  await page.goto('https://jvras-portifolio.vercel.app/g1', { waitUntil: 'networkidle2' });

  // ===========================================================
  // MÉTODO 1: Selecionar pelo atributo "src"
  // ===========================================================
  try {
    const iframeElementSrc = await page.waitForSelector('iframe[src="https://g1.globo.com/pe/pernambuco/"]');
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
  // MÉTODO 2: Selecionar pelo título (title)
  // ===========================================================
  try {
    const iframeElementTitle = await page.waitForSelector('iframe[title="G1 News"]');
    if (iframeElementTitle) {
      console.log("MÉTODO 2: iframe encontrado pelo title.");
      const iframe = await iframeElementTitle.contentFrame();
      const iframeHtml = await iframe.content();
      fs.writeFileSync(path.resolve(__dirname, 'iframe_content_by_title.html'), iframeHtml);
      console.log("MÉTODO 2: HTML salvo com sucesso.");
    }
  } catch (error) {
    console.log("MÉTODO 2: Não foi possível selecionar o iframe pelo title.", error);
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
    const iframeElementCombined = await page.waitForSelector('iframe[src="https://g1.globo.com/pe/pernambuco/"][title="G1 News"]');
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
      if (src.includes('g1.globo.com')) {
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
