const puppeteer = require('puppeteer');
const processing_url = 'https://bdocodex.com/us/mrecipes/';
const alchemy_url = 'https://bdocodex.com/us/recipes/alchemy/';
const cook_url = 'https://bdocodex.com/us/recipes/culinary/';
const fs = require('fs');



async function run() {
  const browser = await puppeteer.launch({headless:false});

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 })

  await page.goto(cook_url, {waitUntil: 'domcontentloaded'});
  await page.waitFor(1000);
  await page.select('select.form-control', '200')
  await page.waitFor(5000);

  const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('table.table tbody tr td:nth-child(7)'))
      const quantity = tds.map(td => td.querySelector('div'));

      return quantity.length

    });

    console.log(data);



}
run();
