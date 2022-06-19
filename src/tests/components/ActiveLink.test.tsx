import { render, screen } from "@testing-library/react"
import { ActiveLink } from "../../components/ActiveLink/ActiveLink"

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      }
    }
  }
})

describe("ActiveLink component", () => {
  it("renders correctly", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Test</a>
      </ActiveLink>
    )

    expect(screen.getByText("Test")).toBeInTheDocument()
  })

  it("adds active class if the link as currently active", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Test</a>
      </ActiveLink>
    )

    expect(screen.getByText("Test")).toHaveClass("active")
  })
})