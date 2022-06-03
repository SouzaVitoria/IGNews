import Head from "next/head"
import styles from "./posts.module.scss"

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | IGNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time> 02/06/2022 </time>
            <strong> Título do Post </strong>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </a>
          <a href="#">
            <time> 02/06/2022 </time>
            <strong> Título do Post </strong>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </a>
          <a href="#">
            <time> 02/06/2022 </time>
            <strong> Título do Post </strong>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
          </a>
        </div>
      </main>
    </>
  )
}