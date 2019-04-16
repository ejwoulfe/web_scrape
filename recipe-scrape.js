//
// const request = require('request');
// const cheerio = require('cheerio');
// var start = 106;
// var end = 235;
// var materials = [];
// var recipe = new Object();
// var ID;
// var type = 'Cooking';
// var results = [];
// var itemName;
//
// // for (start; start <= end; start++) {
// //   console.log('https://bdocodex.com/us/recipe/' + start + "/ ");
// // }
// request('https://bdocodex.com/us/recipe/1/', (error, response, html) =>
//
// {
// if(!error && response.statusCode == 200){
//   const $= cheerio.load(html);
// const item = $('.smallertext').find('tr:nth-child(5) td a').text().replace(/[^A-Za-z]\s+/g,',');
// const resultItems = $('.smallertext').find('tr:nth-child(6) td a').text().replace(/[^A-Za-z]\s+/g,',');
// itemName = $('.smallertext').find('td b').text().replace(/\s\s+/g, '');
// var temp = new Array();
// var tempTwo = new Array();
// // temp = item.split(',');
//
// //item.replace(/\s\s+/g, ',');
// for(var i =0; i < item.length; i++){
//   if(item.includes('\n')){
//     item.replace(/\n/g, '');
//   }
//   temp = item.split(',');
// }
// for(var i =0; i < resultItems.length; i++){
//   if(resultItems.includes('\n')){
//     resultItems.replace(/\n/g, '');
//   }
//   tempTwo = resultItems.split(',');
// }
//
// var filtered = temp.filter(function(value, index, arr){
//
//     return value !== '';
//
// });
// var filteredTwo = tempTwo.filter(function(value, index, arr){
//
//     return value !== '';
//
// });
//
//
//
// }
// console.log('ID:0,\n ' + itemName + ',\n ' + type + ',\n ' + filtered + ',\n ' + filteredTwo);
// });
