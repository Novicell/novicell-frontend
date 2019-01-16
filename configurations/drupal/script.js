var glob = require("glob")
 
glob(__dirname + "**/*.js", function (er, files) {
  console.log(files);
})