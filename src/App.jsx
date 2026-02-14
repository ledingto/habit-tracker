import { useState } from 'react'
import Checkbox from './Checkbox';
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

  return (
    <>
      <h1>Track your Habits!</h1>
      <p>Add a habit: </p>
      <form onSubmit={(e) => addHabit(e, document.getElementById("habit").value)}>
        <input type="text" id="habit" name="new-habit" size="20"></input>
        <input type="submit" name="submit" value="Add"></input>
      </form>

      <p>To Do:</p>
      { todos.size !== 0 && Array.from(todos.keys()).map(habit => <Checkbox text={habit} />) }
      { dones.size !== 0 && todos.map(habit => <Checkbox text={habit} />) }

    </>
  )
}

export default App