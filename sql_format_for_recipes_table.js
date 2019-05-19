const fs = require('fs');
var readline = require('readline');
let writeStream = fs.createWriteStream('sql_format.txt');
var recipeNamesByLine = fs.readFileSync('Processing/Recipes_Table_Data/Processing_recipe_name.txt').toString().split("\n");
//var recipeIdsByLine = fs.readFileSync('Alchemy/Recipes_Table_Data/Alchemy_recipes_ids.txt').toString().split("\n");
var id = 226;

for(var z = 0; z < recipeNamesByLine.length; z++){
  writeStream.write("(" + String(id) + ", " );
for(var i = 0; i < 1;i++){
  // console.log(quantitiesByLine[z].split(",")[i]);
  // console.log(materialsByLine[z].split(",")[i]);
    writeStream.write('"' + recipeNamesByLine[z].split(",")[i].trim() + '"' + ", " + '"' + "../assets/item_images/" + recipeNamesByLine[z].split(",")[i].trim() + '.png", ' + String(id) + "),");

}
id++;
writeStream.write("\n");
}