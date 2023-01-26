require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysql",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "exampleDB",
});

// We create the table if it's not already present
connection.query(
  "CREATE TABLE IF NOT EXISTS todo (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255))"
);

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true }));

app.post("/todo", (req, res) => {
  const { title } = req.body;
  // We insert the new todo
  connection.query(
    `INSERT INTO todo (title) VALUES ('${title}')`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      res.json({ result });
    }
  );
});

app.get("/todo", (req, res) => {
  connection.query("SELECT * FROM todo", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    res.json({ result });
  });
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
