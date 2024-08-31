const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
require("dotenv").config();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: 3307,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "records",
});

app.post("/create-record", (req, res) => {
  const { name, age } = req.body;
  pool.query(
    "INSERT INTO records_table SET ?",
    { name, age },
    (err, result) => {
      if (err) {
        console.error("Error creating record: ", err.stack);
        res
          .status(500)
          .json({ status: "error", message: "Error creating record" });
        return;
      }
      res.json({
        status: "success",
        message: "Record created successfully",
        data: result,
      });
    }
  );
});

app.get("/retrieve-records", (req, res) => {
  pool.query("SELECT * FROM records_table", (err, rows) => {
    if (err) {
      console.error("Error retrieving records: ", err.stack);
      res
        .status(500)
        .json({ status: "error", message: "Error retrieving records" });
      return;
    }
    res.json({ status: "success", data: rows });
  });
});

app.get("/records/:id", (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM records_table WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error retrieving record: ", err.stack);
      res
        .status(500)
        .json({ status: "error", message: "Error retrieving record" });
      return;
    }
    if (row.length === 0) {
      res.status(404).json({ status: "error", message: "Record not found" });
      return;
    }
    res.json({ status: "success", data: row });
  });
});

app.put("/update-record/:id", (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  pool.query(
    "UPDATE records_table SET name = ?, age = ? WHERE id = ?",
    [name, age, id],
    (err, result) => {
      if (err) {
        console.error("Error updating record: ", err.stack);
        res
          .status(500)
          .json({ status: "error", message: "Error updating record" });
        return;
      }
      res.json({ status: "success", message: "Record updated successfully" });
    }
  );
});

app.delete("/delete-record/:id", (req, res) => {
  const id = req.params.id;
  pool.query("DELETE FROM records_table WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting record: ", err.stack);
      res
        .status(500)
        .json({ status: "error", message: "Error deleting record" });
      return;
    }
    res.json({ status: "success", message: "Record deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server started and listening on port ${port}`);
});
