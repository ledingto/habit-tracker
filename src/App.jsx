import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHabits() {
      const data = await fetch("/api/habits");
      const storedHabits = await data.json();
      setHabits(storedHabits);
    }
    loadHabits()
  }, []);

  function _handleError(data) {
    if (data.error.toLowerCase().includes("duplicate")) setError("You already have this habit!")
    else setError("Something went wrong. Please try again.")
  }

  async function addHabit(e, newHabit) {
    e.preventDefault();

    if (newHabit.length === 0) return;
    const sanitizedInput = newHabit.trim().toLowerCase();

    try {
      const res = await fetch("/api/habits/habit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: sanitizedInput })
      });
      if (!res.ok) _handleError(await res.json());
      else {
        const createdHabit = await res.json();
        setHabits(prev => [...prev, createdHabit]);
      }
    } catch(e) {
      console.error("Something went wrong: ", e);
    } finally {
      setHabitInput("");
    }
  }

  function toggleHabit(id) {
    setHabits((prev) => prev.map(h => h.id === id ? { ...h, done: !h.done } : h ))
  }

  function deleteHabit(id) {
    setHabits((prev) => prev.filter(h => h.id !== id));
  }

  function deleteAllDone() {
    setHabits((prev) => prev.filter(h => !h.done));
  }

  function completeAllTodo() {
    setHabits((prev) => prev.map(h => ({ ...h, done: true})));
  }

  const todos = habits.filter(habit => !habit.done);
  const dones = habits.filter(habit => habit.done);

  return (
    <>
      <h1>Track your Habits!</h1>
      <form onSubmit={(e) => addHabit(e, habitInput)}>
        <label htmlFor="add-habit">Add a habit: </label>
        <input type="text" id="add-habit" value={habitInput} onChange={(e) => { setHabitInput(e.target.value); setError(""); }}></input>
        <input type="submit" disabled={!habitInput.length} />
      </form>
      { error ?? <p>{error}</p>}

      <h2>To Do:</h2>
      <button onClick={() => completeAllTodo()} disabled={!todos.length}>Complete All To Dos</button>
      <ul>
        { todos.map(habit => {
          return (
            <li key={`${habit.id}`}>
              <label>
                <input type="checkbox" checked={habit.done} onChange={() => toggleHabit(habit.id)}/>
                {habit.name}
              </label>
            </li>
          )
        })}
      </ul>

      <h2>Done:</h2>
      <button onClick={() => deleteAllDone()} disabled={!dones.length}>Delete All Completed</button>
      <ul>
        { dones.map(habit => {
          return (
            <li key={`${habit.id}`}>
              <label>
                <input type="checkbox" checked={habit.done} onChange={() => toggleHabit(habit.id)}/>
                {habit.name}
              </label>
              <button onClick={() => deleteHabit(habit.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App