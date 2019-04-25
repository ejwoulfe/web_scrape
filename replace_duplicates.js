const puppeteer = require('puppeteer');
const fs = require('fs');
const { parse } = require('json2csv');
var readline = require('readline');
let writeStream = fs.createWriteStream('items_for_sql.txt');
var id = 947;


fs.readFile('look_for_duplicates.txt', function(err, data) {
   if(err) throw err;
   var array = data.toString().split("\n");
  // for(var i = 0; i< array.length;i++) {
     let unique = [...new Set(array)];
     
     for(var i = 1; i< unique.length;i++) {
       writeStream.write("(" + id++ + ',' +  unique[i] + "),\n");
 
     }

   //}
});
