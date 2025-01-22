const fs = require("fs");
const readline = require("readline");
const path = require("path");

const scrapfilepath = path.join(__dirname, "scrap\\a.txt")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the content you want to add to the file:", (data) => {
  fs.writeFile(scrapfilepath, data, (err) => {
    if (err) {
      console.log(err);
      rl.close();
    }
    else{
    console.log("File created and content has been written to ");
    rl.close();
    }
  });
});
