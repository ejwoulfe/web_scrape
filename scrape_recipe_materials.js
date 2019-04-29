const puppeteer = require('puppeteer');
const url = 'https://bdocodex.com/us/recipes/culinary/';
const fs = require('fs');
const { parse } = require('json2csv');


function writeToCsv(array){
  const csv = parse(array);
  fs.appendFileSync("./sub_materials.csv", csv);
}



(async() =>{

  const browser = await puppeteer.launch({headless:false});

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 })

  await page.goto(url, {waitUntil: 'domcontentloaded'});
  await page.waitFor(2000);
  await page.select('select.form-control', '200')
  await page.waitFor(3000);

  let episodes_details = await page.evaluate(() => {

    let table = document.querySelector("table.table tbody");
    let episode_panels = Array.from(table.children);
    console.log(episode_panels);



    let episodes_info = episode_panels.map(episode_panel => {
     //let title = episode_panel.querySelector(".dt-title").textContent;
     let craft_name = episode_panel.querySelector('.dt-title a b').textContent
    let craft_quantity = episode_panel.querySelectorAll(".dt-reward a div");
     let materials_list = episode_panel.querySelectorAll(".dt-reward a");
     const items = [];
     const quantities = [];
     for (let element of materials_list) {
       items.push(element.href);
     }
     for (let element of craft_quantity) {
       if(element.textContent===''){
       quantities.push('1');
     }else{
       quantities.push(element.textContent);
     }
     }
     // return {craft_name, quantities, items};
     return items
   });
   return episodes_info;

});
  //console.log(episodes_details);
  writeToCsv(episodes_details);



// let items = await page.evaluate(extractItems);
// console.log(items);


  // writeToCsv(result);
  // function subMaterialsForEachRow(rowArray){
  //
  //   console.log((rowArray[0]));
  //
  //
  // }
  //
  // subMaterialsForEachRow(data)


await browser.close();


})();
