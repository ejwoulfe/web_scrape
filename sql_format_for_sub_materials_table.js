const fs = require('fs');
var readline = require('readline');
let writeStream = fs.createWriteStream('sql_format.txt');
var quantitiesByLine = fs.readFileSync('organized_quantities.txt').toString().split("\n");
var materialsByLine = fs.readFileSync('organized_sub_materials.txt').toString().split("\n");
var id = 1;

for(var z = 0; z < quantitiesByLine.length; z++){
  writeStream.write("(" + String(id) + ", " );
for(var i = 0; i < materialsByLine[z].split(",").length;i++){
  // console.log(quantitiesByLine[z].split(",")[i]);
  // console.log(materialsByLine[z].split(",")[i]);
  if(i == materialsByLine[z].split(",").length-1){
    writeStream.write(quantitiesByLine[z].split(",")[i].trim() + ", " + materialsByLine[z].split(",")[i].trim() +  ", " + String(id) + "),");
  }else{
  writeStream.write(quantitiesByLine[z].split(",")[i].trim() + ", " + materialsByLine[z].split(",")[i].trim() + ", ");
}
}
id++;
writeStream.write("\n");
}