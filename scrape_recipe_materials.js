const puppeteer = require('puppeteer');
const url = 'https://bdocodex.com/us/recipes/culinary/';
const fs = require('fs');
const { parse } = require('json2csv');
const rowSelector = "table.table tbody tr";




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

  //
  //   var result = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll('tbody tr')).map(tr =>({
  //     recipe_name: tr.querySelector('tbody tr td.dt-title a b').innerHTML,
  //     material1_quantity: tr.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(1)').innerText,
  //     material2_quantity: tr.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(2)').innerText,
  //     material3_quantity: tr.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(3)').innerText
  //     // material2_quantity: tr.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(4)').innerText,
  //     // material2_quantity: tr.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(5)').innerText
  //
  //
  //   }))
  //
  // );

 const nameAndMats = await page.$$eval(rowSelector,
   rows =>
  {
    var sub_materials =  rows.map((row =>({
      recipe_name: row.querySelector('tbody tr td.dt-title a b').innerHTML,
      material1_quantity: row.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(1)').innerText,
      material2_quantity: row.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(2)').innerText,
      material3_quantity: row.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(3)').innerText
      // material4_quantity: row.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(4)').innerText,
      // material5_quantity: row.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(5)').innerText
})))
return sub_materials
})


  console.log(nameAndMats);

   // const  allMaterialTwo = await page.$$eval(rowSelector,
   //   rows =>
   //  {return rows.map((row)=>row.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(2)').innerText)});
   //
   //  const  allMaterialThree = await page.$$eval(rowSelector,
   //    rows =>
   //   {return rows.map((row)=>row.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(3)').innerText)});
   //

//      if (await page.$('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(4)') !== null){
//      const  allMaterialFour = await page.$$eval(rowSelector,
//        rows =>
//        {return rows.map((row)=>row.querySelector('tbody tr td.dt-reward div.iconset_wrapper_medium:nth-child(4)').innerText)});
// }else{
//
//     return "cheese"
// }

//
//   if (await page.$(selector) !== null) console.log('found');
// else console.log('not found');

  // writeToCsv(result);


await browser.close();


})();
