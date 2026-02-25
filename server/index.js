import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* In-memory storage - next step to add sqlite or similar */
const habits = [];

function createHabit(name) {
  return {
    id: crypto.randomUUID(),
    name,
    done: false,
    createdAt: Date.now(),
    completedAt: null
  }
}

app.get('/api/habits', (req, res) => {
  res.json(habits);
});

app.post('/api/habits/habit', (req, res) => {
  if (!req.body.name) res.status(400).json({ error: "Empty" });
  
  const sanitizedName = (req.body.name).trim().toLowerCase();
  if (habits.some(h => h.name === sanitizedName)) res.status(400).json({ error: "Duplicate" });
  else {
    const habit = createHabit(sanitizedName);
    habits.push(habit);
    res.status(201).json(habit);
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});