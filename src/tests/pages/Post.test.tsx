import { render, screen } from "@testing-library/react"
import { mocked } from 'jest-mock'
import { getSession } from "next-auth/react"
import Post, { getServerSideProps } from "../../pages/posts/[slug]"
import { getPrismicClient } from "../../services/prismic"

const post = {
  slug: "fake-slug",
  title: "fake-title",
  content: "<p>fake-content</p>",
  updatedAt: "fake-updatedAt"
}


jest.mock("../../services/prismic")
jest.mock("next-auth/react")

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />)
    expect(screen.getByText("fake-title")).toBeInTheDocument()
    expect(screen.getByText("fake-content")).toBeInTheDocument()
  })

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce({ activeSubscription: null } as any)

    const response = await getServerSideProps({ params: { slug: "fake-slug" } } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/posts/preview/fake-slug"
        })
      })
    )
  })

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce({ activeSubscription: "fake-active-subscription" } as any)

    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: "heading", text: "fake-title" }
          ],
          content: [
            { type: "paragraph", text: "fake-content" }
          ]
        },
        last_publication_date: "04/01/2022"
      })
    } as any)

    const response = await getServerSideProps({ params: { slug: "fake-slug" } } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "fake-slug",
            title: "fake-title",
            content: "<p>fake-content</p>",
            updatedAt: "01 de abril de 2022"
          }
        }
      })
    )
  })
})