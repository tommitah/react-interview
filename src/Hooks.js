import React, { useState } from "react"
import "./App.css"

const todosList = [
  { id: 1, name: "Go to the supermarket", complete: false },
  { id: 2, name: "Call Alice", complete: false },
  { id: 3, name: "Ask Alice to call Bob", complete: false },
  { id: 4, name: "Do the dishes", complete: false },
  { id: 5, name: "Change car tyres", complete: false },
]

/**
 * Bar for inputting task.
 */
const InputBar = ({ onSubmit }) => {
  const [input, setInput] = useState("")

  // No empties
  const toSubmit = (event) => {
    event.preventDefault()
    if (input !== "") onSubmit(input)
    setInput("")
  }

  return (
    <form
      className="wrapper"
      style={{ gridTemplateColumns: "7fr 2fr" }}
      onSubmit={toSubmit}
    >
      <input
        placeholder="Add new todo"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
      />
      <button className="btn btn-success" type="submit" value="Submit">
        Submit
      </button>
    </form>
  )
}

/**
 * Renders the Task name, state (complete), and sends callbacks to parent to modify state.
 */
const TaskRow = ({ name, complete, index, onComplete, onRemove }) => {
  const [text, setText] = useState("Incomplete")
  const [color, setColor] = useState("pink")

  /**
   * Not sure if this is better than the cc example...
   * Conditional statement sets internal tag attributes only
   * then callback to parent to edit state (no side effect?)
   */
  const completeTask = () => {
    if (text === "Incomplete") {
      setText("Complete")
      setColor("lightgreen")
    } else {
      setText("Incomplete")
      setColor("pink")
    }
    onComplete(!complete, index)
  }

  /**
   * Removes task from list.
   * callback to parent to edit state.
   */
  const removeTask = () => onRemove(index)

  return (
    <div className="wrapper" style={{ backgroundColor: color }}>
      <h3>{name}</h3>
      <button className="btn" onClick={completeTask}>
        {text}
      </button>
      <button
        className="btn"
        onClick={removeTask}
        style={{ backgroundColor: "rgb(146, 31, 27)" }}
      >
        Remove from list
      </button>
    </div>
  )
}

/**
 * Maps data from directory to TaskRow-components
 * and modifies the data when user interacts with the TaskRow.
 */
const ToDoList = () => {
  const [todos, setTodos] = useState(todosList)

  /**
   * Submits:
   * Adds new task to list and sets state.
   */
  const handleSubmit = (value) => {
    let newTodos = [...todos]
    newTodos.push({ id: newTodos.length + 1, name: value, complete: false })
    setTodos(newTodos)
  }

  /**
   * "Completes":
   * Toggles complete in the specified index and sets state.
   */
  const handleComplete = (complete, index) => {
    let newTodos = [...todos]
    newTodos[index].complete = complete
    setTodos(newTodos)
  }

  /**
   * Removes:
   * Removes task from list and sets state.
   */
  const handleRemove = (index) => {
    let newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <>
      <div>
        {todos.map((todo, index) => (
          <TaskRow
            key={index}
            index={index}
            name={todo.name}
            complete={todo.complete}
            onComplete={handleComplete}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <InputBar onSubmit={handleSubmit}></InputBar>
    </>
  )
}

/**
 * "Sugar"
 */
const Hooks = () => {
  return (
    <>
      <ToDoList />
    </>
  )
}

export default Hooks
