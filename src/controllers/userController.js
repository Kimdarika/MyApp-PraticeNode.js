const UserModel = require("../models/UserModel");

class UserController {

  async getUsers(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      console.log("MYSQL ERROR:", error);
      res.status(500).json(error);
    }
  }

  async createUser(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const user = await UserModel.create(name);
      res.status(201).json(user);

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const user = await UserModel.update(id, name);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const success = await UserModel.delete(id);

      if (!success) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Deleted successfully" });

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = new UserController();