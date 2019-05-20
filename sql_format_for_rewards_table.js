const fs = require('fs');
var readline = require('readline');
let writeStream = fs.createWriteStream('sql_format.txt');
var rewardQuantitiesByLine = fs.readFileSync('Processing/Rewards_Table_Data/Processing_rewards_quantities.txt').toString().split("\n");
var rewardIDsByLine = fs.readFileSync('Processing/Rewards_Table_Data/Processing_rewards_ids.txt').toString().split("\n");
var id = 226;

//console.log(rewardIDsByLine);
for(var z = 0; z < rewardQuantitiesByLine.length; z++){
  writeStream.write("(" + String(id) + ", " );
for(var i = 0; i < rewardIDsByLine[z].split(",").length;i++){
  //console.log()
  if(i == rewardIDsByLine[z].split(",").length-1){
    writeStream.write(rewardQuantitiesByLine[z].split(",")[i].trim() + ", " + rewardIDsByLine[z].split(",")[i].trim() + "),");
  }else{
  writeStream.write(rewardQuantitiesByLine[z].split(",")[i].trim() + ", " + rewardIDsByLine[z].split(",")[i].trim() + ", ");
}
}
id++;
writeStream.write("\n");
}