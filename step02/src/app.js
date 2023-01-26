const express = require("express");
const app = express();
const fs = require("fs");

const PORT = 3000;

app.get("/", (req, res) => res.json({ ok: true }));

app.get("/createFile", (req, res) => {
  fs.writeFile(__dirname + "/files/test.txt", "Hello World", (err) => {
    if (err) {
      console.error(err);
      res.send("error");
    } else {
      console.log("File is created successfully.");
      res.send("File is created successfully.");
    }
  });
});

app.get("/readfile", (req, res) => {
  fs.readFile(__dirname + "/files/test.txt", "utf8", (err, data) => {
    if (err) res.send("error");
    else {
      console.log(data);
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
