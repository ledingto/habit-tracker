import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(new Map()); // text: date added
  const [dones, setDones] = useState(new Map()); // text: date completed
  const [habitInput, setHabitInput] = useState("");

  useEffect(() => {}, [todos, dones])

  function addHabit(e, habit) {    
    e.preventDefault();

    const updated = new Map(todos);
    updated.set(habit, Date.now());

    todos.has(habit) ? 
      console.log("You already have this habit!") :
      setTodos(updated);
  }

  function handleCheckboxClick(isChecked, habit) {
    if (isChecked) {
      // move from todos to done
      const updatedTodos = new Map(todos);
      updatedTodos.delete(habit);
      setTodos(updatedTodos);

      const updatedDones = new Map(dones);
      updatedDones.set(habit, Date.now());
      setDones(updatedDones);
    } else {
      // move from done to todos
      const updatedDones = new Map(dones);
      updatedDones.delete(habit);
      setDones(updatedDones);

      const updatedTodos = new Map(todos);
      updatedTodos.set(habit, Date.now());
      setTodos(updatedTodos);
    }
  }

  function handleDelete(e, habit) {
    e.preventDefault();

    const updatedDones = new Map(dones);
    updatedDones.delete(habit);
    setDones(updatedDones);
  }

  function handleDeleteAll(e) {
    e.preventDefault();

    setDones(new Map());
  }

  function handleCompleteAll(e) {
    e.preventDefault();

    const updatedDones = new Map(dones);
    Array.from(todos.keys()).forEach((habit) => updatedDones.set(habit, Date.now()))

    setDones(updatedDones);
    setTodos(new Map());
  }

  return (
    <>
      <h1>Track your Habits!</h1>
      <p>Add a habit: </p>
      <form onSubmit={(e) => addHabit(e, habitInput)}>
        <input type="text" id="habit" name="new-habit" size="20" key="new-habit" onChange={(e) => setHabitInput(e.target.value)}></input>
        <input type="submit" name="submit" value="Add"></input>
      </form>

      <p>To Do:</p>
      <button onClick={(e) => handleCompleteAll(e)}>Mark All Habits as Completed</button>
      { todos.size !== 0 && Array.from(todos.keys()).map(habit => (
        <form key={habit}>
          <input type="checkbox" name="habits" onClick={() => handleCheckboxClick(true, habit)} />
          <label htmlFor="habits">{habit}</label>
        </form>
      )) }

      <p>Completed:</p>
      <button onClick={(e) => handleDeleteAll(e)}>Delete All Completed</button>
      { dones.size !== 0 && Array.from(dones.keys()).map(habit => (
        <form key={habit}>
          <input type="checkbox" name="habits" defaultChecked onClick={() => handleCheckboxClick(false, habit)} />
          <label htmlFor="habits">{habit}</label>
          <button onClick={(e) => handleDelete(e, habit)}>Delete?</button>
        </form>
      )) }
    </>
  )
}

export default App