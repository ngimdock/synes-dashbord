import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Button } from "@roketid/windmill-react-ui";
import { Colors } from "utils";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Présentation | SYNES</title>
        <meta
          name="description"
          content="Plateforme regroupant tout les membres du SYNES"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.logoText}>SYNES</span>

          <Link href="/auth/signin">
            <Button size="regular" style={{ backgroundColor: Colors.primary }}>
              Connexion
            </Button>
          </Link>
        </header>

        <div className={styles.hero}>
          <h1 className={styles.title}>
            <span>SYNES</span>, SYNDICAT DES ENSEIGNANTS DU CAMEROUN
          </h1>

          <p className={styles.description}>
            Un regroupement de plusieurs enseignants d’université du secteur
            public qui luttent pour une même cause.
          </p>

          <div className={styles.grid}>
            <Link href="/api/download-status">
              <Button style={{ paddingInline: 30, color: "#fff" }} size="regular" layout="outline">
                Télécharger le status
              </Button>
            </Link>

            <Link href="/rooms/general/communique">
              <Button
                style={{
                  paddingInline: 30,
                  backgroundColor: Colors.primary,
                }}
                size="regular"
              >
                Accédez à votre espace
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <div className={styles.bg} />
    </div>
  );
};

export default Home;
