import React, { useState } from "react"
import { InputBar } from "./InputBar"
import { TaskRow } from "./TaskRow"
import "../App.css"

const todosList = [
  { id: 1, name: "Go to the supermarket", complete: false },
  { id: 2, name: "Call Alice", complete: false },
  { id: 3, name: "Ask Alice to call Bob", complete: false },
  { id: 4, name: "Do the dishes", complete: false },
  { id: 5, name: "Change car tyres", complete: false },
]

/**
 * Maps data from directory to TaskRow-components
 * and modifies the data when user interacts with the TaskRow.
 */
export const ToDoList = () => {
  const [todos, setTodos] = useState(todosList)

  /**
   * Submits:
   * Adds new task to list and sets state.
   */
  const handleSubmit = (value) => {
    const newTodos = todos.concat([
      { id: todos.length + 1, name: value, complete: false },
    ])
    setTodos(newTodos)
  }

  /**
   * "Completes":
   * Toggles complete in the specified index and sets state.
   */
  const handleComplete = (complete, index) => {
    const newTodos = todos.map((task) => {
      if (task[index]) return Object.assign({}, task, { complete })
      return task
    })
    setTodos(newTodos)
  }

  /**
   * Removes:
   * Removes task from list and sets state.
   */
  const handleRemove = (index) => {
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)]
    setTodos(newTodos)
  }

  return (
    <>
      <div className="body">
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
        <InputBar onSubmit={handleSubmit}></InputBar>
      </div>
    </>
  )
}
