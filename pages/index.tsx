import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Presentation | SYNES</title>
        <meta name="description" content="Plateforme regroupant tout les membres du SYNES" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Main page
      </main>

      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  )
}

export default Home
