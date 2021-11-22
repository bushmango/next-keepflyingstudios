import type { NextPage } from "next"
import { Email } from "../components/layout/Email"
import { Footer } from "../components/layout/Footer"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Keep Flying Studios LLC</h1>

        <p className={styles.description}>
          NextJS / React / Typescript / NodeJS Experts
        </p>

        <div className={styles.grid}>
          <a href="/impulse-sub-pixel" className={styles.card}>
            <h2>Impulse Sub-Pixel &rarr;</h2>
            <p>Sub-pixel rendering software.</p>
          </a>
          <a href="/karaoke-pro" className={styles.card}>
            <h2>Karaoke Pro &rarr;</h2>
            <p>Professional Karaoke Software.</p>
          </a>
          <a href="https://cowsayify.com" className={styles.card}>
            <h2>Cowsayify &rarr;</h2>
            <p>NextJS demo app.</p>
          </a>

          <div className={styles.card}>
            <h2>Contact Us</h2>
            <p>
              <Email />
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
