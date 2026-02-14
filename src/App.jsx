import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(new Map()); // text: date added
  const [dones, setDones] = useState(new Map()); // text: date completed

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
      handleDelete(habit);

      const updatedTodos = new Map(todos);
      updatedTodos.set(habit, Date.now());
      setTodos(updatedTodos);
    }
  }

  function handleDelete(habit) {
    const updatedDones = new Map(dones);
    updatedDones.delete(habit);
    setDones(updatedDones);
  }

  return (
    <>
      <h1>Track your Habits!</h1>
      <p>Add a habit: </p>
      <form onSubmit={(e) => addHabit(e, document.getElementById("habit").value)}>
        <input type="text" id="habit" name="new-habit" size="20"></input>
        <input type="submit" name="submit" value="Add"></input>
      </form>

      <p>To Do:</p>
      { todos.size !== 0 && Array.from(todos.keys()).map(habit => (
        <form>
          <input type="checkbox" id="habit-checkbox" name="habits" key={habit} 
            onClick={() => handleCheckboxClick(true, habit)} />
          <label for="habits">{habit}</label>
        </form>
      )) }

      <p>Completed:</p>
      { dones.size !== 0 && Array.from(dones.keys()).map(habit => (
        <form>
          <input type="checkbox" id="habit-checkbox" name="habits" key={habit} checked
            onClick={() => {
              return handleCheckboxClick(false, habit)} 
            }
          />
          <label for="habits">{habit}</label>
          <button onClick={() => handleDelete(habit)}>Delete?</button>
        </form>
      )) }
    </>
  )
}

export default App