const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
//const port = 3000; // Replace with your desired port number
require("dotenv").config();
// console.log(process.env);
const port=process.env.PORT 
app.use(express.json());
app.get("/", (req, res) =>
  res.send("Welcome to the api!"))
// Route to create a file with current date and time
app.get("/createFile", (req, res) => {
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

  function pad(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  const fileName = `${timestamp}.txt`; // Example: 2024-07-03_14-30-15.txt

  const fileContent = `currenttime:${timestamp}`; 

  fs.writeFile( `./timestamp/${fileName}`, fileContent, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      res.status(500).send("Error creating file");
    } else {
      console.log(` ${fileName} created successfully.`);
      res.send(` ${fileName} created successfully.`);
    }
  });
});

// Route to read all files in the directory
app.get("/readFiles", (req, res) => {
  // Directory path
  const directoryPath =("./timestamp");

  // Read files in the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).send("Error reading directory");
      return;
    }

    // Send the list of files as JSON response
    res.json(files);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
