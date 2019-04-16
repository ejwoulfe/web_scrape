const puppeteer = require('puppeteer');
const url = 'https://bdocodex.com/us/items/materials/';
const cheerio = require('cheerio');

(async() =>{
const browser = await puppeteer.launch({headless:false});

const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 1200 })

await page.goto(url, {waitUntil: 'domcontentloaded'});
await page.waitFor(1000);
await page.select('select.form-control', '200')
await page.waitFor(3000);


const result = await page.evaluate(() =>

  Array.from(document.querySelectorAll('tbody tr')).map(tr =>({
    itemID: 1,
    itemName: tr.querySelector('tbody tr b').textContent,
    itemImage: tr.querySelector('tbody tr td.dt-icon img').src

}))
)
await browser.close();

console.log(result);
})();
