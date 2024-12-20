import User from "../models/User.js";
import jwt from "jsonwebtoken";

class UserController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

      // Check if user already exists
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Create new user
      const user = await User.create({ username, password });

      res.status(201).json({
        message: "User created successfully",
        user: { id: user.id, username: user.username },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

      // Find user
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Validate password
      const isValidPassword = await User.validatePassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
