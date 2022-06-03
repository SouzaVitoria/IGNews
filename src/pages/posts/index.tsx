import Head from "next/head"
import { GetStaticProps } from "next"
import Prismic from "@prismicio/client"
import { RichText } from "prismic-dom"
import { getPrismicClient } from "../../services/prismic"
import styles from "./posts.module.scss"

type Post = {
  slug: string
  title: string
  excerpt: string,
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | IGNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {
            posts.map(post => (
              <a key={post.slug} href="#">
                <time> {post.updatedAt} </time>
                <strong> {post.title} </strong>
                <p> {post.excerpt} </p>
              </a>
            ))
          }
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()
  const response = await prismic.query([
    Prismic.predicates.at("document.type", "posts")
  ], {
    fetch: ["posts.title", "posts.content"],
    pageSize: 10
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }
  })

  return {
    props: {
      posts
    }
  }
}