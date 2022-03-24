import { ReactElement } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

import styles from './layout.module.scss'
export function DefaultLayout(page: ReactElement) {
  return (
    <div className={styles.body}>
      <Header />
      <main className={styles.main}>{page}</main>
      <Footer />
    </div>
  )
}
