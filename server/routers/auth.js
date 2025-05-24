import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();
const users = [];
const JWT_SECRET = process.env.JWT_SECRET;

// POST /auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Усі поля обов’язкові" });
    }

    const normalized = email.trim().toLowerCase();
    if (users.find(u => u.email === normalized)) {
      return res.status(409).json({ message: "Цей email вже зареєстровано" });
    }

    const hash = await bcrypt.hash(password, 10);
    users.push({
      id: Date.now(),
      name,
      email: normalized,
      password: hash,
      points: 0,
      activitiesCompleted: 0,
      challengesCompleted: 0,
      localEcologyPoints: 0,
      leaderboardPosition: null,
    });

    res.status(201).json({ message: "Користувача успішно створено" });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email та пароль обов’язкові" });
    }

    const normalized = email.trim().toLowerCase();
    const user = users.find(u => u.email === normalized);
    if (!user) {
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ name: user.name });
  } catch (err) {
    next(err);
  }
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// GET /auth/me
router.get("/me", authMiddleware, (req, res) => {
  // Після authMiddleware в req.user є payload токена
  const fullUser = users.find(u => u.id === req.user.id);
  if (!fullUser) {
    return res.status(404).json({ message: "Користувача не знайдено" });
  }

  res.json({
    id: fullUser.id,
    name: fullUser.name,
    email: fullUser.email,
    points: fullUser.points,
    activitiesCompleted: fullUser.activitiesCompleted,
    challengesCompleted: fullUser.challengesCompleted,
    localEcologyPoints: fullUser.localEcologyPoints,
    leaderboardPosition: fullUser.leaderboardPosition,
  });
});

export default router;
export { users };