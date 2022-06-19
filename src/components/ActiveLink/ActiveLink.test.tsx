import { render } from "@testing-library/react"
import { ActiveLink } from "./ActiveLink"

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
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Test</a>
      </ActiveLink>
    )

    expect(getByText("Test")).toBeInTheDocument()
  })

  it("adds active class if the link as currently active", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Test</a>
      </ActiveLink>
    )

    expect(getByText("Test")).toHaveClass("active")
  })
})