const puppeteer = require('puppeteer');
const processing_url = 'https://bdocodex.com/us/mrecipes/';
const alchemy_url = 'https://bdocodex.com/us/recipes/alchemy/';
const cook_url = 'https://bdocodex.com/us/recipes/culinary/';
const fs = require('fs');
let writeStream = fs.createWriteStream('Processing_rewards_quantites.txt');



async function run() {
  const browser = await puppeteer.launch({headless:false});

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 })

  await page.goto(processing_url, {waitUntil: 'domcontentloaded'});
  await page.waitFor(1000);
  await page.select('select.form-control', '200')
  await page.waitFor(5000);

  // const data = await page.evaluate(() => {
  //     const tds = Array.from(document.querySelectorAll('table.table tbody tr td:nth-child(7)'))
  //     const quantity = tds.map(td => td.querySelector('div a div.quantity_small').innerHTML);
  //
  //
  //     console.log(quantity);
  //     //return quantity
  //
  //
  //   //   if(quantity.textContext===null){
  //   //     return 1;
  //   //   }else{
  //   //   return quantity.textContext;
  //   // }
  //   });

 for(var j = 0; j<8;j++){
  let materials_quantities = await page.evaluate(() => {

    let table = document.querySelector("table.table tbody");
    let table_rows = Array.from(table.children);



    let rows_info = table_rows.map(row => {
     //let title = row.querySelector(".dt-title").textContent;
     //let craft_name = row.querySelector('.dt-title a b')
     //const names = [];
     let material_amount = row.querySelectorAll('td:nth-child(8) a');
     let materials = Array.from(material_amount);
     let ayy = materials.map(row2 => {
     var divs = [];

     let ayy2 = row2.querySelector('div:nth-child(2)');
     if(ayy2===null){
       divs.push('1');
     }else{
     divs.push(ayy2.textContent);
   }
     return divs

   });


     return ayy
   });

   return rows_info;

});



    for(var i = 0; i < materials_quantities.length;i++){
      for(var key in materials_quantities[i]){
        var iterator = (materials_quantities[i][key].values());
        writeStream.write((iterator.next().value + ", "));
      }
      // for(var z = 0; z < materials_quantities[i].length;z++){
      //   console.log((materials_quantities[i][z]).value);
      // }
      writeStream.write("\n");
    }
     await page.click('li.paginate_button.next');
     await page.waitFor(2000);

    }
    // await browser.close();

}
run();
