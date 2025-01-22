const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the directory path: ", (dirpath) => {
  try {
    if (!fs.existsSync(dirpath)) {
      throw "No such directory has been found";
    } else {
      fs.readdir(dirpath, (err, files) => {
        if (err) {
          console.error("Error reading directory:", err.message);
        } else {
          console.log(`List of files in ${dirpath}:`);
          files.forEach((file) => {
            console.log(file);
          });
        }

        rl.close();
      });
    }
  } catch (err) {
    console.error(err);
    rl.close();
  }
});
