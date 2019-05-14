const fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: "8890",
  database: "bdowolf_database"
});

con.connect(function(err) {
  if (err) throw err;



var data = fs.readFileSync('Processing/Processing_sub_materials.txt', 'utf8');
var hold = data.split("\r");
//for(var i = 0; i < hold.length;i++){
for(var i = 800; i < 900;i++){
    var itemList = (hold[i].split(","));
    for(var z = 0; z < itemList.length-1;z++){
      //console.log(itemList[z].trim());
      var item = itemList[z].trim();
      con.query("SELECT material_id, material_name FROM materials_table WHERE material_name = " + "\"" + item + "\"", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });



    }
}


});
