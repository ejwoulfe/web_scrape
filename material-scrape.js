const request = require('request');
const cheerio = require('cheerio');
require('events').EventEmitter.prototype._maxListeners = 25;
var itemName;
var imgSource;
var tab;



request('http://edwoulfe.com/', (error, response, html) =>

{
if(!error && response.statusCode == 200){
  const $= cheerio.load(html);

 //  itemName = $('.smallertext').find('td:nth-child(1) span:nth-child(1) b').text().replace(/\s\s+/g, '');
 // imgSource = $('.smallertext').find('tr:nth-child(4) img').attr("src");
 //tab = $('.tabbed_content').find('a').html();
 //  console.log(itemName);
 // console.log('https://bdocodex.com'+imgSource);
 //console.log(tab);

}
});
