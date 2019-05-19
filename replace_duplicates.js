const puppeteer = require('puppeteer');
const fs = require('fs');
const { parse } = require('json2csv');
var readline = require('readline');
let writeStreamOneItem = fs.createWriteStream('Sub_Materials_Inserts/oneItem.txt');
let writeStreamTwoItem = fs.createWriteStream('Sub_Materials_Inserts/twoItem.txt');
let writeStreamThreeItem = fs.createWriteStream('Sub_Materials_Inserts/threeItem.txt');
let writeStreamFourItem = fs.createWriteStream('Sub_Materials_Inserts/fourItem.txt');
let writeStreamFiveItem = fs.createWriteStream('Sub_Materials_Inserts/fiveItem.txt');


fs.readFile('Processing/FormattedIDs/sql_format.txt', function(err, data) {
   if(err) throw err;
   var array = data.toString().split("\n");
  // for(var i = 0; i< array.length;i++) {

for(var i = 0; i < array.length; i++){
  //  console.log(array[i].split(",").length -1);
    if(array[i].split(",").length - 1 == 4){
      writeStreamOneItem.write(array[i]);
      writeStreamOneItem.write("\n");
    }else if(array[i].split(",").length - 1 == 6){
      writeStreamTwoItem.write(array[i]);
      writeStreamTwoItem.write("\n");
    }else if(array[i].split(",").length - 1 == 8){
      writeStreamThreeItem.write(array[i]);
      writeStreamThreeItem.write("\n");
    }else if(array[i].split(",").length - 1 == 10){
      writeStreamFourItem.write(array[i]);
      writeStreamFourItem.write("\n");
    }else if(array[i].split(",").length - 1 == 12){
      writeStreamFiveItem.write(array[i]);
      writeStreamFiveItem.write("\n");
    }
  
}
     

   //}
});
