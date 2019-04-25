const puppeteer = require('puppeteer');
const url = 'https://bdocodex.com/us/items/materials/';
const fs = require('fs');
const { parse } = require('json2csv');
const fields = ['','itemName','itemImage']
const opts = {fields};

function writeToCsv(array){

  const csv = parse(array);
  fs.appendFileSync("./item_for_sql.csv", csv);
}

(async() =>{

  const browser = await puppeteer.launch({headless:false});

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 })

  await page.goto(url, {waitUntil: 'domcontentloaded'});
  await page.waitFor(1000);
  await page.select('select.form-control', '200')
  await page.waitFor(5000);

 for(var i = 0; i<5;i++){
    var result = await page.evaluate(() =>
    Array.from(document.querySelectorAll('tbody tr')).map(tr =>({
      itemName: tr.querySelector('tbody tr b').textContent,
      itemImage: "../assets/item_images/"+ tr.querySelector('tbody tr b').textContent+".png",
      itemType: "Base"

    }))

  );

  writeToCsv(result);
  await page.click('li.paginate_button.next');
  await page.waitFor(2000);

}

await browser.close();


})();
