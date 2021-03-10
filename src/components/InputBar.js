import React, { useState } from "react"
import "../App.css"

/**
 * Bar for inputting task.
 */
export const InputBar = ({ onSubmit }) => {
  const [input, setInput] = useState("")

  // No empties
  const toSubmit = (event) => {
    event.preventDefault()
    if (input) onSubmit(input)
    setInput("")
  }

  const updateInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <form
      name="user-input"
      role="form"
      className="wrapper"
      style={{ gridTemplateColumns: "7fr 2fr" }}
      onSubmit={toSubmit}
    >
      <input placeholder="Add new todo" value={input} onChange={updateInput} />
      <button
        className="btn btn-success"
        data-testid="submit-button"
        type="submit"
        value="Submit"
      >
        Submit
      </button>
    </form>
  )
}
