const puppeteer = require('puppeteer');
const fs = require('fs');
const { parse } = require('json2csv');
let writeStream = fs.createWriteStream('gathering_names.txt');



fs.readFile('materials.txt', function(err, data) {
   if(err) throw err;
   var array = data.toString().split("\n");
   // console.log(array[0].replace(/"/g, '').split(",")[0])

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for(var i = 0; i<array.length;i++){
    for(var z = 0; z< array[i].split(",").length;z++){
      if(array[i].replace(/"/g, '').split(",")[z]==='\r'){
        z+1;
      }
      else{
        const page = await browser.newPage();
       await page.goto(array[i].replace(/"/g, '').split(",")[z], {waitUntil: 'networkidle0'});
       const text = page.evaluate(() => document.querySelector('table.smallertext span.item_title b').innerHTML);
       text.then(function(result){
         writeStream.write(result.trim() + ", ");
       })
       await page.waitFor(3000);
        await page.close();
     }
 }
 writeStream.write("\n");
}



  browser.close();
}

run();

 })
