const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());

//MYSQL CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myapp"
});
db.connect((error) => {
  if (error) {
    console.log("DB error:", error);
  } else {
    console.log("MySQL Connected ");
  }
});

//HOME
app.get("/", (req, res) => {
  res.send("Welcome to the User API");
});

//GET USERS
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    if (error) return res.status(500).json(error);
    res.json(result);
  });
});

//CREATE
app.post("/users", (req, res) => {
  const { name } = req.body;

  db.query("INSERT INTO users (name) VALUES (?)", [name], (error, result) => {
    if (error) return res.status(500).json(error);

    res.json({
      id: result.insertId,
      name
    });
  });
});

//UPDATE
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  db.query(
    "UPDATE users SET name = ? WHERE id = ?",
    [name, id],
    (error, result) => {
      if (error) return res.status(500).json(error);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ id, name });
    }
  );
});

//DELETE 
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", [id], (error, result) => {
    if (error) return res.status(500).json(error);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Deleted successfully" });
  });
});

//START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});