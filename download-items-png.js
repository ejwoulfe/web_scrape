const puppeteer = require("puppeteer");
const fs = require("fs");
const request = require("request");
var csv = require('csv');
var csv = require('fast-csv');
var names = [];
var links = [];

function putDataIntoArray(name, link){
  names.push(name);
  links.push(link);
}

function getName(count, namesArr){
  return namesArr[count];
}

function getLink(count, linksArr){
  return linksArr[count];
}

function getArraysLength(arr){
  return arr.length;
}


function downloadImages(){csv.fromPath('itemList.csv')
.on('data', function(data) {
  
  putDataIntoArray(data[0], data[1]);
})
.on('end', function() {
  
  
  (async () => {
    
    const browser = await puppeteer.launch({ headless: true });
    for(var i = 0; i<getArraysLength(links);i++){
      const page = await browser.newPage();
      var url = String(getLink(i, links));
      var file = String(getName(i, names));
      
      var viewSource = await page.goto(url);
      await page.waitFor(2000);
      const imageUrl = await page.evaluate(() =>
      document.querySelector("img").src
    ); 
    
    fs.writeFile("images/" + file + ".png", await viewSource.buffer(), function(err) {
      if(err) {
        return console.log(err);
      }
            
    });
    await page.close();
  }
  await browser.close();
  
})();

})
}

downloadImages();
