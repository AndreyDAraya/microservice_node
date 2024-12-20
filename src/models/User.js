import pool from "../config/database.js";
import bcrypt from "bcrypt";

class User {
  static async create({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username";
    const values = [username, hashedPassword];

    try {
      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  static async findByUsername(username) {
    const query = "SELECT * FROM users WHERE username = $1";

    try {
      const { rows } = await pool.query(query, [username]);
      return rows[0];
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

  static async findById(id) {
    const query = "SELECT id, username FROM users WHERE id = $1";

    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

  static async validatePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default User;
