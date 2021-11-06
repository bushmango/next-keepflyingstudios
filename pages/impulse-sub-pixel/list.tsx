import type {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import { Footer } from "../../components/layout/Footer";
import { HeadTitle } from "../../components/layout/HeadTitle";
import styles from "../../styles/Home.module.css";

import prisma from "../../lib/prisma";
import { tilemaps } from ".prisma/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await prisma.tilemaps.findMany({
    select: {
      id: true,
      title: true,
    },
    // where: { published: true },
    // include: {
    //   author: {
    //     select: { name: true },
    //   },
    // },
  });

  console.log("data is", data);
  return { props: { data } };
};

const ImpulseSubPixelPage: InferGetServerSidePropsType<
  typeof getServerSideProps
> = (props: { data: tilemaps[] }) => {
  return (
    <div className={styles.container}>
      <HeadTitle title="List Pixelettas - Impulse Sub-Pixel Editing Software" />

      <main className={styles.main}>
        <h1 className={styles.title}>List Pixelettas</h1>
        <div>
          <div>List of tilemaps</div>
          <div style={{ marginLeft: "1em" }}>
            {props.data.map((c) => (
              <div key={c.id}>{c.title}</div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImpulseSubPixelPage;
