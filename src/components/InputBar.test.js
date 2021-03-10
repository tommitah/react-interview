import { cleanup, render, fireEvent } from "@testing-library/react"
import React from "react"
import { InputBar } from "./InputBar"

afterEach(cleanup)

it("renders correctly", () => {
  const { queryByTestId, queryByPlaceholderText } = render(<InputBar />)

  expect(queryByTestId("submit-button")).toBeTruthy()
  expect(queryByPlaceholderText("Add new todo")).toBeTruthy()
})

describe("Testing input", () => {
  it("updates on change", () => {
    const { queryByPlaceholderText } = render(<InputBar />)

    const taskInput = queryByPlaceholderText("Add new todo")
    fireEvent.change(taskInput, { target: { value: "Adopt a dog" } })
    expect(taskInput.value).toBe("Adopt a dog")
  })
})

describe("Testing Submit button", () => {
  describe("without input", () => {
    it("doesn't submit to list", () => {
      const onSubmit = jest.fn()
      const { queryByTestId } = render(<InputBar onSubmit={onSubmit} />)
      fireEvent.click(queryByTestId("submit-button"))
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe("with input", () => {
    it("submits input as task to list", () => {
      const onSubmit = jest.fn()
      const { queryByTestId, queryByPlaceholderText } = render(
        <InputBar onSubmit={onSubmit} />
      )
      const taskInput = queryByPlaceholderText("Add new todo")
      fireEvent.change(taskInput, { target: { value: "Adopt a dog" } })

      fireEvent.click(queryByTestId("submit-button"))
      expect(onSubmit).toHaveBeenCalled()
    })
  })
})
