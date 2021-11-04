import type { NextPage } from "next";
import React from "react";
import { Footer } from "../components/layout/Footer";
import { HeadTitle } from "../components/layout/HeadTitle";
import styles from "../styles/Home.module.css";

const ImpulseSubPixelPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title="Impulse Sub-Pixel Editing Software" />

      <main className={styles.main}>
        <h1 className={styles.title}>Keep Flying Studios LLC Placeholder</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div>Codename Impulse Sub-Pixel</div>
      </main>

      <Footer />
    </div>
  );
};

export default ImpulseSubPixelPage;
