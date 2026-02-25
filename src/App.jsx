import { useState } from 'react'
import './App.css'

function App() {
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState("");
  const [error, setError] = useState("");

  // Factory
  function _createHabit(name) {
    return {
      id: crypto.randomUUID(),
      name,
      done: false,
      createdAt: Date.now(),
      completedAt: null,
    }
  }

  function addHabit(e, newHabit) {
    e.preventDefault();

    if (newHabit.length === 0) return;
    const sanitizedInput = newHabit.trim().toLowerCase();

    setHabits((prev) => {
      if (prev.some(h => h.name === sanitizedInput)) {
        setError("You already have this habit!");
        return prev;
      }
      return [...prev, _createHabit(sanitizedInput)]
    });

    setHabitInput("");
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