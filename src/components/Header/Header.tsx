import { ActiveLink } from "../ActiveLink/ActiveLink"
import { SignInButton } from "./SignInButton/SignInButton"
import styles from "./styles.module.scss"

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <ActiveLink activeClassName={styles.active} href="/">
          <img src="/images/logo.svg" alt="Logo IG.News" />
        </ActiveLink>
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}