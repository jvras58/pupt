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
  // Selecionando o iframe pelo seletor da classe do iframe
  // ===========================================================
  try {
    const iframeElement = await page.waitForSelector('iframe[src="https://g1.globo.com/pe/pernambuco/"]');
    
    if (iframeElement) {
      console.log("iframe encontrado no seu site de portfólio.");
      
      const iframe = await iframeElement.contentFrame();
      
      if (iframe) {
        try {
          const iframeHtml = await iframe.content(); // Isso pode falhar devido a CORS
          
          const htmlFilePath = path.resolve(__dirname, 'iframe_g1_content.html');
          fs.writeFileSync(htmlFilePath, iframeHtml);
          
          console.log(`O HTML do iframe foi salvo em: ${htmlFilePath}`);
        } catch (error) {
          console.log('Erro ao acessar o conteúdo do iframe: restrições de CORS podem estar bloqueando.', error);
        }
      } else {
        console.log('Não foi possível acessar o conteúdo do iframe.');
      }
    } else {
      console.log('Iframe não encontrado no seu site de portfólio.');
    }
  } catch (error) {
    console.log('Erro ao tentar selecionar o iframe no seu site de portfólio.', error);
  }

  await browser.close();
})();
