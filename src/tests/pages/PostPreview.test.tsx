import { render, screen } from "@testing-library/react"
import { mocked } from 'jest-mock'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import PostPreview, { getStaticProps } from "../../pages/posts/preview/[slug]"
import { getPrismicClient } from "../../services/prismic"

const post = {
  slug: "fake-slug",
  title: "fake-title",
  content: "<p>fake-content</p>",
  updatedAt: "fake-updatedAt"
}

jest.mock("../../services/prismic")
jest.mock("next-auth/react")
jest.mock("next/router")

describe("Post Preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<PostPreview post={post} />)

    expect(screen.getByText("fake-title")).toBeInTheDocument()
    expect(screen.getByText("fake-content")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
  })

  it("redirects user to full post when user is subscribe", async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: "fake-active-subscription"
      },
      status: 'authenticated'
    } as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<PostPreview post={post} />)

    expect(pushMock).toHaveBeenCalledWith("/posts/fake-slug")
  })

  it("loads initial data", async () => {
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

    const response = await getStaticProps({ params: { slug: "fake-slug" } })

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