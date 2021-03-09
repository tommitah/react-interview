import React, { useState } from "react"
import "./App.css"

const todosList = [
  { id: 1, name: "Go to the supermarket", complete: false },
  { id: 2, name: "Call Alice", complete: false },
  { id: 3, name: "Ask Alice to call Bob", complete: false },
  { id: 4, name: "Do the dishes", complete: false },
  { id: 5, name: "Change car tyres", complete: false },
]

const InputBar = ({ onSubmit }) => {
  const [input, setInput] = useState("")

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

const TaskRow = ({ name, complete, index, onComplete, onRemove }) => {
  const [text, setText] = useState("Incomplete")
  const [color, setColor] = useState("pink")

  // Not sure if this is better than the cc example...
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

  const removeTask = () => onRemove(index)

  return (
    <div className="wrapper" style={{ backgroundColor: color }}>
      <h3>{name}</h3>
      <button className="btn" onClick={completeTask}>
        {text}
      </button>
      <button className="btn" onClick={removeTask}>
        Remove from list
      </button>
    </div>
  )
}

const ToDoList = () => {
  const [todos, setTodos] = useState(todosList)

  const handleSubmit = (value) => {
    let newTodos = [...todos]
    newTodos.push({ id: newTodos.length + 1, name: value, complete: false })
    setTodos(newTodos)
  }

  const handleComplete = (complete, index) => {
    let newTodos = [...todos]
    newTodos[index].complete = complete
    setTodos(newTodos)
  }

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
      <button onClick={console.log(todos)} />
    </>
  )
}

const Hooks = () => {
  return (
    <>
      <ToDoList />
    </>
  )
}

export default Hooks