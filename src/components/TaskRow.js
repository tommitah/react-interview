import React, { useState } from "react"
import "../App.css"

/**
 * Renders the Task name, state (complete), and sends callbacks to parent to modify state.
 */
export const TaskRow = ({ name, complete, index, onComplete, onRemove }) => {
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
    <div className="wrapper " style={{ backgroundColor: color }}>
      <h3>{name}</h3>
      <button className="btn" onClick={completeTask}>
        {text}
      </button>
      <button
        className="btn"
        onClick={removeTask}
        style={{ backgroundColor: "rgb(160, 57, 57)" }}
      >
        Remove from list
      </button>
    </div>
  )
}
