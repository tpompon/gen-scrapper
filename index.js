const puppeteer = require('puppeteer');
require('dotenv').config();

(async (identifier, password) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://dse.orion.education.fr/suiviGEN/accueil');

  await page.$eval('#identifiant', (el, identifier) => { el.value = identifier }, identifier);
  await page.$eval('#codeConnexion', (el, password) => { el.value = password }, password);

  await page.click('input[value=Envoyer]');

  await page.goto('https://dse.orion.education.fr/suiviGEN/notif?rqRang=0');

  await page.screenshot({ path: 'screenshot.png', fullPage: true });
 
  await browser.close();
})(process.env.IDENTIFIER, process.env.PASSWORD);