const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
    args: ['--no-sandbox'],
    headless: false // Deixe o navegador visível para testes
  });

  const page = await browser.newPage();

  await page.goto('https://jvras-portifolio.vercel.app/g1', { waitUntil: 'networkidle2' });

  async function captureIframeContent(iframe) {
    try {
      const iframeHtml = await iframe.content();
      fs.writeFileSync(path.resolve(__dirname, 'iframe_content_on_navigation.html'), iframeHtml);
      console.log("HTML do iframe salvo após navegação.");
    } catch (error) {
      console.error("Erro ao capturar o HTML do iframe:", error);
    }
  }

  // Expor uma função no contexto da página para ser chamada a partir do iframe
  await page.exposeFunction('handleIframeClick', async () => {
    console.log("Clique detectado dentro do iframe.");

    try {
      const iframeElement = await page.waitForSelector('iframe[src="https://g1.globo.com/pe/pernambuco/"]');
      const iframe = await iframeElement.contentFrame();

      // Esperar pela navegação do iframe (aguarda até que ele navegue para uma nova página)
      console.log("Aguardando navegação do iframe...");
      await iframe.waitForNavigation({ waitUntil: 'networkidle2' });

      // Captura o HTML da nova página carregada no iframe
      await captureIframeContent(iframe);
    } catch (error) {
      console.error("Erro ao capturar o conteúdo após o clique:", error);
    }
  });

  // Função para monitorar o iframe e injetar o listener de clique
  async function monitorIframe() {
    try {
      const iframeElement = await page.waitForSelector('iframe[src="https://g1.globo.com/pe/pernambuco/"]');
      let iframe = await iframeElement.contentFrame();

      // Injetar um script dentro do iframe para capturar eventos de clique
      await iframe.evaluate(() => {
        document.addEventListener('click', () => {
          window.handleIframeClick(); // Chama a função exposta na página pai
        });
      });

      console.log("Listener de clique injetado no iframe.");
    } catch (error) {
      console.error("Erro ao monitorar o iframe:", error);
    }
  }

  // Chamar a função para monitorar o iframe
  await monitorIframe();

  console.log("Monitorando o iframe... Pressione Ctrl+C para interromper.");
})();


// infelizmente não consegui fazer funcionar com o headless: false dentro do devcontainer alternativamente fiz por fora e funcionou
// É necessario baixar sudo apt-get install chromium-browser para funcionar localmente para obter o caminho: which chromium-browser 