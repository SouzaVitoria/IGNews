import { render, screen } from "@testing-library/react"
import { mocked } from 'jest-mock'
import Posts, { getStaticProps } from "../../pages/posts"
import { getPrismicClient } from "../../services/prismic"

const posts = [
  {
    slug: "fake-slug",
    title: "fake-title",
    excerpt: "fake-excerpt",
    updatedAt: "fake-updatedAt"
  }
]

jest.mock("../../services/prismic")

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />)
    expect(screen.getByText("fake-title")).toBeInTheDocument()
  })

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "fake-slug",
            data: {
              title: [
                { type: "heading", text: "fake-title" }
              ],
              content: [
                { type: "paragraph", text: "fake-excerpt" }
              ]
            },
            last_publication_date: "04/01/2022"
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: "fake-slug",
            title: "fake-title",
            excerpt: "fake-excerpt",
            updatedAt: "01 de abril de 2022"
          }]
        }
      })
    )
  })
})