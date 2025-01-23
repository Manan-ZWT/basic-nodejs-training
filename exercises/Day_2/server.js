//REQUIRED MODULES
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

//PORT NUMBER
const port_number = 7777;

//WELCOME FUNCTION
const welcome = (request, response) => {
  console.log(`Succesfully connected to the server on port ${port_number}`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write(
    `WELCOME TO THE SERVER:
    1. TO REQUEST LIST OF FILES TYPE:"\\List"
    2. TO READ A FILE TYPE:"\\file?name=filename.txt"
    3. TO CREATE A FILE WITH CONTENT:"\\create?name=filename.txt&content=NewContent"
    4. TO APPEND CONTENT TO AN EXISTING FILE:"\\append?name=filename.txt&content=NewContent"
    5.TO DELETE A FILE:"\\delete?name=filename.txt"`
  );
  response.end("");
};

// DEFAULT ERROR FUNCTION
const default_error = (request, response) => {
  console.log(`Default error`);
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("File Not Found");
};

// LIST FUNCTION
const read_directory = (dir_path, request, response) => {
  fs.readdir(dir_path,{withFileTypes:true},(err, files) => {
    if (err) {
      console.error("Error reading directory:");
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Internal Server Error");
    } else {
      console.log("Succesful to show all files");
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write("List of files:\n");
      files.forEach((file) => {
        if(file.isFile()){
        response.write(`${file.name}\n`);
        }
      });
      response.end();
    }
  });
};

// READ FUNCTION
const read_file = (dir_path, file_name, request, response) => {
  if (!file_name) {
    console.error("Bad request from the user");
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Bad Request: No query parameter provided.");
  } else if (!fs.existsSync(path.join(dir_path, file_name))) {
    console.error("File does not exists");
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("File Not Found");
  } else {
    fs.readFile(path.join(dir_path, file_name), "utf-8", (err, data) => {
      if (err) {
        console.error("Error in reading the file");
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Interal Server Error");
      } else {
        console.log("Succesfully read the file content");
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(data);
      }
    });
  }
};

// CREATE FUNCTION
const create_file = (dir_path, file_name, data, request, response) => {
  if (!path.join(dir_path, file_name) || !data) {
    console.error("Bad request from the user");
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Bad Request: Not enough query parameters.");
    return;
  } else if (fs.existsSync(path.join(dir_path, file_name))) {
    console.error("User trying to change the existing resource");
    response.writeHead(409, { "Content-Type": "text/plain" });
    response.end("Conflict: File already exists.");
    return;
  } else {
    fs.writeFile(path.join(dir_path, file_name), data, (err) => {
      if (err) {
        console.error("Error creating the file");
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Internal Server Error");
      } else {
        console.log("File succesfully created");
        response.writeHead(201, { "Content-Type": "text/plain" });
        response.end(`File successfully created with content: ${data}`);
      }
    });
  }
};

// APPEND FUCNTION
const append_file = (dir_path, file_name, data, request, response) => {
  if (!path.join(dir_path, file_name) || !data) {
    console.error("Bad request from the user");
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Bad Request: Not enough query parameters.");
    return;
  } else if (!fs.existsSync(path.join(dir_path, file_name))) {
    console.error("User is trying to change on a non existing file");
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("File not found");
    return;
  } else {
    fs.appendFile(path.join(dir_path, file_name), `\n${data}`, (err) => {
      if (err) {
        console.error("Error creating the file");
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Internal Server Error");
      } else {
        console.log("File succesfully appended");
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(`File successfully updated with content: ${data}`);
      }
    });
  }
};

// DELETE FUCNTION
const delete_file = (dir_path, file_name, request, response) => {
  if (!path.join(dir_path, file_name)) {
    console.error("Bad request from the user");
    response.writeHead(400, { "Content-Type": "text/plain" });
    response.end("Bad Request: Not enough query parameters.");
    return;
  } else if (!fs.existsSync(path.join(dir_path, file_name))) {
    console.error("User is trying to delete a non existing file");
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("File not found");
    return;
  } else {
    fs.unlink(path.join(dir_path, file_name), (err) => {
      if (err) {
        console.error("Error deleting the file");
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Internal Server Error");
      } else {
        console.log("File succesfully deleted");
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(`File successfully deleted`);
      }
    });
  }
};

// SERVER CODE
const myServer = http.createServer((req, res) => {
  const myURL = url.parse(req.url, true);
  const filename = myURL.query.name;
  const content = myURL.query.content;
  const dirpath = path.join(__dirname, "scrap");
  switch (myURL.pathname) {
    //CASE 0: FOR WELCOME
    case "/":
      if (req.method === "GET") {
        welcome(req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
      }
      break;

    //CASE 1: FOR SHOWING ALL FILES IN THE DIRECTORY
    case "/list":
      if (req.method === "GET") {
        read_directory(dirpath, req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
      }
      break;

    //   CASE 2: READING A TEXT FILE
    case "/file":
      if (req.method === "GET") {
        read_file(dirpath, filename, req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
      }
      break;

    //   CASE 3: CREATING A FILE WITH CONTENT
    case "/create":
      if (req.method === "GET") {
        create_file(dirpath, filename, content, req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
      }
      break;

    //   CASE 4: APPENDING TO THE FILE CONTENT
    case "/append":
      if (req.method === "GET") {
        append_file(dirpath, filename, content, req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
      }
      break;

    //   CASE 5: DELETING A FILE
    case "/delete":
      if (req.method === "GET") {
        delete_file(dirpath, filename, req, res);
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
      }
      break;

    // DEFAULT
    default:
      default_error(req, res);
      break;
  }
});
myServer.listen(port_number, () => {
  console.log(`Server started on port: ${port_number}`);
});
