const fs = require('fs');
var readline = require('readline');
let writeStream = fs.createWriteStream('organized_sql.txt');
var textByLine = fs.readFileSync('all_items_ids.txt').toString().split("\n");
fs.readFile('Alchemy/Alchemy_rewards.txt', function(err, data) {
   if(err) throw err;
   var array = data.toString().split("\n");
   //array.length-1
   for(var i = 0; i < array.length ;i++){
   var amountOfMaterials = array[i].split(",").length-1;
   
   for(var z = 0; z < amountOfMaterials; z++){
     
  
     if(z===amountOfMaterials-1){
       writeStream.write(textByLine[0]);
     }else{
     writeStream.write(textByLine[0] + ", ");
   }
   textByLine.shift()
    
   }
    writeStream.write("\n");
 }
  //console.log(textByLine);
   });