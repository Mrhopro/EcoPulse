import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { users } from "./auth.js";

const router = Router();

// In-memory store
let challenges = [
  { id: 1, title: "Zero Plastic Week", date: "2025-05-10", status: "Completed" },
  { id: 2, title: "Bike to Work", date: "2025-05-08", status: "Completed" },
  { id: 3, title: "Plant a Tree", date: "2025-05-05", status: "Missed" },
  { id: 4, title: "Meatless Monday", date: "2025-05-04", status: "Pending" },
  { id: 5, title: "Cleanup the Riverbank", date: "2025-05-02", status: "Pending" }
];

// Отримати останні N челенджів
router.get("/last", authMiddleware, (req, res) => {
  const last = challenges
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  res.json(last);
});

// Поставити маркер «Completed»
router.post("/:id/complete", authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const ch = challenges.find(c => c.id === id);
  if (!ch) return res.status(404).json({ message: "Challenge not found" });
  ch.status = "Completed";
  res.json(ch);
});

// POST /challenges/:id/complete
router.post("/:id/complete", authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const ch = challenges.find(c => c.id === id);
  if (!ch) return res.status(404).json({ message: "Challenge not found" });

  if (ch.status !== "Completed") {
    ch.status = "Completed";

    const user = users.find(u => u.id === req.user.id);
    if (user) {
      const POINTS_PER_CHALLENGE = 10;
      user.points += POINTS_PER_CHALLENGE;
      user.challengesCompleted += 1;

      console.log(`🟢 User ${user.name} now has ${user.points} points`);
    }
  }

  res.json(ch);
});




// (Опціонально)
router.get("/", authMiddleware, (req, res) => {
  res.json(challenges);
});

export default router;