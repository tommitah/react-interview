import { cleanup } from "@testing-library/react"
import Enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
import { InputBar } from "./InputBar"
import { ToDoList } from "./ToDoList"

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup)

describe("Testing form", () => {
  test("should render children inside form", () => {
    const wrapper = shallow(<InputBar />)
    const form = wrapper.find("form")
    expect(form).toBeTruthy()
    expect(form.find("input")).toBeTruthy()
    expect(form.find("button")).toBeTruthy()
  })

  test("should update input-state when user types in input", () => {})

  test("should call onSubmit when user clicks button", () => {
    const onSubmit = jest.fn()
    const wrapper = shallow(<InputBar onSubmit={onSubmit} />)

    wrapper
      .find("form")
      .find("button")
      .invoke("onSubmit", { target: { value: "user input" } })
    expect(onSubmit).toBeCalledWith(expect.anything())
  })
})
