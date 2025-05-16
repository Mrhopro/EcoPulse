import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = new Router();
const users = [];             // TODO: замінити на реальну БД
const JWT_SECRET = process.env.JWT_SECRET;

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
    users.push({ id: Date.now(), name, email: normalized, password: hash });
    res.status(201).json({ message: "Користувача успішно створено" });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email та пароль обов’язкові" });
    }

    const normalized = email.trim().toLowerCase();
    const user = users.find(u => u.email === normalized);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    // Створюємо JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Віддаємо токен у HttpOnly кукі
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

export default router;
