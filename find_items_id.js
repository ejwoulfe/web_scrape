const fs = require('fs');
var mysql = require('mysql');
let writeStream = fs.createWriteStream('all_items_ids.txt');
var arr = [];
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: "8890",
  database: "bdowolf_database"
});

con.connect(function(err) {
  if (err) throw err;



var data = fs.readFileSync('Alchemy/Alchemy_sub_materials.txt', 'utf8');
var hold = data.split("\r");

// for(var i = 0; i < hold.length;i++){
for(var i = 0; i < hold.length;i++){
    var itemList = (hold[i].split(","));
    for(var z = 0; z < itemList.length-1;z++){
      var item = itemList[z].trim();
      con.query("SELECT material_id FROM materials_table WHERE material_name = " + "\"" + item + "\"", function (err, result, fields) {
    if (err) throw err;
    if(result===[]){
      console.log(result)
      console.log(item)
    }
    console.log(result)
     writeStream.write(JSON.stringify(result));
     writeStream.write("\n")




  });

 }
}
// for (var i = 0; i < hold.length-1; i++) {
//
// for (var i = 0; i < 6; i++) {
// var amountOfMaterials = (hold[i].split(",").length-1);
//
//  var split = (hold[i].split("\r"))
//  for (var z = 0; z < split[0].split(",").length-1; z++) {


   //
   // arr.push(split[0].split(",")[z].trim());
 // con.query("SELECT * FROM materials_table", function (err, result, fields) {
 //   // if any error while executing above query, throw error
 //     if (err) throw err;
 //     // if there is no error, you have the result
 //     // iterate for all the rows in result
 //     Object.keys(result).forEach(function(key) {
 //       var row = result[key];
 //       console.log(row.material_name)
 //     });
 //   });

con.end()
});
