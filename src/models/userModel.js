const db = require("../config/db");

class UserModel {

  static async getAll() {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  }

  static async create(name) {
    const [result] = await db.query(
      "INSERT INTO users (name) VALUES (?)",
      [name]
    );

    return { id: result.insertId, name };
  }

  static async update(id, name) {
    const [result] = await db.query(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, id]
    );

    if (result.affectedRows === 0) return null;

    return { id, name };
  }

  static async delete(id) {
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = UserModel;