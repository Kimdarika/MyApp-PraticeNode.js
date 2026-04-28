const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

// HOME
router.get("/", (req, res) => {
  res.send("The API is working ");
});

// GET
router.get("/users", userController.getUsers);

// POST (FIXED)
router.post("/users", userController.createUser);

// PUT
router.put("/users/:id", userController.updateUser);

// DELETE
router.delete("/users/:id", userController.deleteUser);

module.exports = router;