const puppeteer = require('puppeteer');
const fs = require('fs');
const { parse } = require('json2csv');
let writeStream = fs.createWriteStream('gathering_names.txt');




fs.readFile('materials.txt', function(err, data) {
   if(err) throw err;
   var array = data.toString().split("\n");
   // console.log(array[0].replace(/"/g, '').split(",")[0])
   
   for(var i = 0; i<2;i++){
     for(var z = 0; z< array[i].split(",").length;z++){
       if(array[i].replace(/"/g, '').split(",")[z]==='\r'){
         z+1;
       }
       else{
        console.log(array[i].split(",")[z]) 
      }
  }
   }

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  for(var i = 0; i<2;i++){
    for(var z = 0; z< array[i].split(",").length;z++){ 
      if(array[i].replace(/"/g, '').split(",")[z]==='\r'){
        z+1;
      }
      else{
       await page.goto(array[i].replace(/"/g, '').split(",")[z]);
     }
 }
 await page.waitFor(2000);
 console.log("end of first item")
  }
  


  browser.close();
}

run();

 })