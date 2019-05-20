const fs = require('fs');
var readline = require('readline');
let writeStream = fs.createWriteStream('sql_format.txt');
var mysql = require('mysql');
var recipeNamesByLine = fs.readFileSync('Processing/Rewards_Table_Data/Processing_rewards.txt').toString().split("\n");
//var recipeIdsByLine = fs.readFileSync('Alchemy/Recipes_Table_Data/Alchemy_recipes_ids.txt').toString().split("\n");
var id = 2348;
var arr = [];
var arrCount = [];
var location = 0;
var count= 0;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: "8890",
  database: "bdowolf_database"
});

// for(var z = 0; z < recipeNamesByLine.length; z++){
// for(var i = 0; i < recipeNamesByLine[z].split(",").length -1 ;i++){
//   // console.log(quantitiesByLine[z].split(",")[i]);
//   // console.log(materialsByLine[z].split(",")[i]);
//     // writeStream.write('"' + recipeNamesByLine[z].split(",")[i].trim() + '"' + ", " + '"' + "../assets/item_images/" + recipeNamesByLine[z].split(",")[i].trim() + '.png", ' + String(id) + "),");
//     //console.log('"' + recipeNamesByLine[z].split(",")[i].trim() + '"' + ", " + '"' + "../assets/item_images/" + recipeNamesByLine[z].split(",")[i].trim() + '.png", ' + '"' + "Cooking" + '"' + "),")
//   writeStream.write("(" + String(id++) + ", " + '"' + recipeNamesByLine[z].split(",")[i].trim() + '"' + ", " + '"' + "../assets/item_images/" + recipeNamesByLine[z].split(",")[i].trim() + '.png", ' + '"' + "Cooking" + '"' + "),");
//   writeStream.write("\n");
//
// }
// //id++;
//
// }


function checkIfItemExists(name){

      con.connect(function(err) {
          if (err) throw err;
        for(var z = 0; z < name.length; z++){
        for(var i = 0; i < name[z].split(",").length -1 ;i++){
          var item = name[z].split(",")[i].trim();

          arr.push(item);
            con.query("SELECT material_id, material_name FROM materials_table WHERE material_name = " + "\"" + item + "\"", function (err, result, fields) {
                if (err) throw err;

                if(JSON.stringify(result)==="[]"){
                  arrCount.push(count);

                //  console.log(arrCount);
                  // writeStream.write("(" + String(id++) + ", " + '"' + recipeNamesByLine[z].split(",")[i].trim() + '"' + ", " + '"' + "../assets/item_images/" + recipeNamesByLine[z].split(",")[i].trim() + '.png", ' + '"' + "Cooking" + '"' + "),");
                  // writeStream.write("\n");
                }

                console.log(arrCount[0]);
                count++;
                if(arr[arrCount[0]]!=undefined){
                writeStream.write("(" + String(id++) + ", " + '"' + arr[arrCount[0]] + '"' + ", " + '"' + "../assets/item_images/" + arr[arrCount[0]] + '.png", ' + '"' + "Cooking" + '"' + "),");
                 writeStream.write("\n");
               }
                arrCount.pop();



        })


       }
      }

      con.end()
      })

    }

checkIfItemExists(recipeNamesByLine);
