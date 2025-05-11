import { Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();
const users = [];

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

export default router;
