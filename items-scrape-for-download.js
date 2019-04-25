const puppeteer = require('puppeteer');
const url = 'https://bdocodex.com/us/recipes/alchemy/';
const fs = require('fs');
const { parse } = require('json2csv');


function writeToCsv(array){
  const csv = parse(array);
  fs.appendFileSync("./itemList.csv", csv);
}

(async() =>{
  const browser = await puppeteer.launch({headless:false});
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 })
  
  await page.goto(url, {waitUntil: 'domcontentloaded'});
  await page.waitFor(1000);
  await page.select('select.form-control', '200')
  await page.waitFor(5000);
  
  for(var i = 0; i<8;i++){
    var result = await page.evaluate(() =>
    
    
    Array.from(document.querySelectorAll('tbody tr')).map(tr =>({
      itemName: tr.querySelector('tbody tr b').textContent,
      itemImage: tr.querySelector('tbody tr td.dt-icon img').src,
      
    }))
    
  );
  
  writeToCsv(result);
  await page.click('li.paginate_button.next');
  await page.waitFor(2000);
}

await browser.close();


})();
