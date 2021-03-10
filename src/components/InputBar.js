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
