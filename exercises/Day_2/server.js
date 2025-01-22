const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const myServer = http.createServer((req, res) => {
  const myURL = url.parse(req.url, true);
  const filename = myURL.query.name;
  const content = myURL.query.content;
  const dirpath = path.join(__dirname, "scrap");
  switch (myURL.pathname) {
    //CASE 1: FOR SHOWING ALL FILES IN THE DIRECTORY
    case "/list":
      fs.readdir(dirpath, (err, files) => {
        if (err) {
          console.error("Error reading directory:");
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          console.log("Succesful to show all files");
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write("List of files:\n");
          files.forEach((file) => {
            res.write(`${file}\n`);
          });
          res.end();
        }
      });
      break;

    //   CASE 2: READING A TEXT FILE
    case "/file":
      if (!filename) {
        console.error("Bad request from the user");
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request: No query parameter provided.");
        break;
      } else if (!fs.existsSync(path.join(dirpath,filename))) {
        console.error("File does not exists");
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File Not Found");
      } else {
        fs.readFile(path.join(dirpath,filename), "utf-8", (err, data) => {
          if (err) {
            console.error("Error in reading the file");
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Interal Server Error");
          } else {
            console.log("Succesfully read the file content");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
          }
        });
      }
      break;

    //   CASE 3: CREATING A FILE WITH CONTENT
    case "/create":
      if (!path.join(dirpath,filename)|| !content) {
        console.error("Bad request from the user");
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request: Not enough query parameters.");
        return;
      } else if (fs.existsSync(path.join(dirpath,filename))) {
        console.error("User trying to change the existing resource");
        res.writeHead(409, { "Content-Type": "text/plain" });
        res.end("Conflict: File already exists.");
        return;
      } else {
        fs.writeFile(path.join(dirpath,filename), content, (err) => {
          if (err) {
            console.error("Error creating the file");
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            console.log("File succesfully created");
            res.writeHead(201, { "Content-Type": "text/plain" });
            res.end(`File successfully created with content: ${content}`);
          }
        });
      }
      break;

    //   CASE 4: APPENDING TO THE FILE CONTENT
    case "/append":
      if (!path.join(dirpath,filename) || !content) {
        console.error("Bad request from the user");
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request: Not enough query parameters.");
        return;
      } else if (!fs.existsSync(path.join(dirpath,filename))) {
        console.error("User is trying to change on a non existing file");
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
        return;
      } else {
        fs.appendFile(path.join(dirpath,filename), `\n${content}`, (err) => {
          if (err) {
            console.error("Error creating the file");
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            console.log("File succesfully created");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`File successfully updated with content: ${content}`);
          }
        });
      }
      break;

    //   DELETING A FILE
    case "/delete":
      if (!path.join(dirpath,filename)) {
        console.error("Bad request from the user");
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request: Not enough query parameters.");
        return;
      } else if (!fs.existsSync(path.join(dirpath,filename))) {
        console.error("User is trying to delete a non existing file");
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
        return;
      } else {
        fs.unlink(path.join(dirpath,filename), (err) => {
          if (err) {
            console.error("Error deleting the file");
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            console.log("File succesfully deleted");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`File successfully deleted`);
          }
        });
      }
      break;
  }
});
myServer.listen(4000, () => {
  console.log("Server started");
});
