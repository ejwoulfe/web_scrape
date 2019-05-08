const puppeteer = require('puppeteer');
const processing_url = 'https://bdocodex.com/us/mrecipes/';
const alchemy_url = 'https://bdocodex.com/us/recipes/alchemy/';
const cook_url = 'https://bdocodex.com/us/recipes/culinary/';
const fs = require('fs');
const { parse } = require('json2csv');
const fields = ['itemName']
const opts = {fields};


function writeToCsv(array){
  const csv = parse(array);
  fs.appendFileSync("./sub_materials.csv", csv);
}



(async() =>{

  const browser = await puppeteer.launch({headless:true});

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 })

  await page.goto(processing_url, {waitUntil: 'domcontentloaded'});
  await page.waitFor(2000);
  await page.select('select.form-control', '200')
  await page.waitFor(2000);
  
  //page 2
  await page.click('li.paginate_button.next');
  await page.waitFor(2000);
  //page 3
  await page.click('li.paginate_button.next');
  await page.waitFor(2000);
  //page 4
  await page.click('li.paginate_button.next');
  await page.waitFor(2000);
  //page 5
  await page.click('li.paginate_button.next');
  await page.waitFor(2000);
  //page 6
  await page.click('li.paginate_button.next');
  await page.waitFor(2000);
  // //page 7
  // await page.click('li.paginate_button.next');
  // await page.waitFor(2000);
  // //page 8
  // await page.click('li.paginate_button.next');
  // await page.waitFor(2000);


// Page 3 has 4 empty elements
// Page 6 has 2 empty elements







// for(var i = 0; i<8;i++){
  let episodes_details = await page.evaluate(() => {

    let table = document.querySelector("table.table tbody");
    let episode_panels = Array.from(table.children);



    let episodes_info = episode_panels.map(episode_panel => {
     //let title = episode_panel.querySelector(".dt-title").textContent;
     //let craft_name = episode_panel.querySelector('.dt-title a b')
     //const names = [];
     let materials_list = episode_panel.querySelectorAll("td:nth-child(7) a");
     const items = [];


    //  names.push(craft_name.textContent);

     for (let element of materials_list) {
       items.push(element.href);
     }

    

     return items;
   });

   return episodes_info;

});
 writeToCsv(episodes_details);
 // await page.click('li.paginate_button.next');
 // await page.waitFor(2000);

//}


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
