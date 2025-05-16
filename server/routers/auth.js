import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const users = []; // TODO: БД замість масиву
const JWT_SECRET = process.env.JWT_SECRET;

// Реєстрація нового користувача
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Перевірка обов'язкових полів
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Усі поля є обов’язковими' });
    }

    // 2. Нормалізуємо email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Перевірка на існуючий користувач
    if (users.find(u => u.email === normalizedEmail)) {
      return res.status(409).json({ message: 'Цей email вже зареєстровано' });
    }

    // 4. Хешуємо пароль і зберігаємо
    const hash = await bcrypt.hash(password, 10);
    users.push({ id: Date.now(), name, email: normalizedEmail, password: hash });

    // 5. Відповідь про успіх
    return res.status(201).json({ message: 'Користувача успішно створено' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Внутрішня помилка сервера' });
  }
});

// Логін користувача
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email та пароль обов’язкові' });
    }
    const normalized = email.trim().toLowerCase();
    const user = users.find(u => u.email === normalized);
    if (!user) {
      return res.status(401).json({ message: 'Невірний email або пароль' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Невірний email або пароль' });
    }
    // Створюємо токен
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({ token, name: user.name });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Серверна помилка' });
  }
});


export default router;
