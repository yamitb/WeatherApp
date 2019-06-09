
console.log("runnnnnnnnnnn");

var page = require('webpage').create();
page.open('https://www.google.com/search?q=haifa+weather', function(status) {
  console.log(page.content);
  phantom.exit();

});
