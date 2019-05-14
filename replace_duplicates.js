const puppeteer = require('puppeteer');
const fs = require('fs');
const { parse } = require('json2csv');
var readline = require('readline');
let writeStream = fs.createWriteStream('fast_sql.txt');
var id = 2105;


fs.readFile('Processing/Processing_sub_materials.txt', function(err, data) {
   if(err) throw err;
   var array = data.toString().split("\n");
  // for(var i = 0; i< array.length;i++) {
//     let unique = [...new Set(array)];
     
     for(var i = 571; i< 668;i++) {
       writeStream.write("(" + id++ + ', ' + '"' +  array[i].replace(",", '') + '",' + '"' + "../assets/item_images/" + array[i].replace(",", '') + '.png", ' + '"Base"'  + "),");
       writeStream.write("\n");
 
     }

   //}
});
