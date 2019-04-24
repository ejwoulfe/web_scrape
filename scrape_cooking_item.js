 const puppeteer = require('puppeteer');
const url = 'https://bdocodex.com/us/recipes/culinary/';
const fs = require('fs');
const { parse } = require('json2csv');
var readline = require('readline');
let writeStream = fs.createWriteStream('sql.txt');
var filename = 'file.txt';
var id = 1;


fs.readFile('file.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(var i = 0; i< array.length;i++) {
      writeStream.write(id++ + ',' +  array[i] + '\n');



    }
});
