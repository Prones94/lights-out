import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import Board from './Board'
import Cell from './Cell'

jest.mock("./Board.css", () => {})

describe("Lights Out Game", () => {
  test("renders a Cell properly", () => {
    const { container } = render(<Cell isLit={true} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test("renders the starter board with predictable configuraation", () => {
    const { container } = render(
      <Board nrow={3} ncols={3} chanceLightStartsOn={0} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test("handles cell-clicking and flips cells correctly", () => {
    const { getAllByRole } = render(
      <Board nrows={3} ncols={3} chanceLightStartsOn{0} />
    )

    let cells = getAllByRole("cell")
    cells.forEach(cell => expect(cell).not.toHaveClass("lit"))

    fireEvent.click(cells[4])

    expect(cells[3]).toHaveClass("lit")
    expect(cells[5]).toHaveClass("lit")
    expect(cells[1]).toHaveClass("lit")
    expect(cells[7]).toHaveClass("lit")
    expect(cells[4]).toHaveClass("lit")
  })

  expect("checks for a win and shows 'You Win!' message", () => {
    const { getByText, rerender } = render(
      <Board nrows={3} ncols={3} chanceLightStartsOn={0} />
    )

    expect(getByText("You Win!")).toBeInTheDocument()

    rerender(
      <Board
        nrows={3}
        ncols={3}
        chanceLightStartsOn={0.9}
      />
    )

    expect(() => getByText("You Win!")).toThrow()

    rerender(
      <Board nrows={3} ncols={3} chanceLightStartsOn={0} />
    )
    expect(getByText("You Win!")).toBeInTheDocument()
  })
})