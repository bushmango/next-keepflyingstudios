import { tilemaps } from ".prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import prisma from "../../../lib/prisma";
import { Footer } from "../../../components/layout/Footer";
import { HeadTitle } from "../../../components/layout/HeadTitle";
import styles from "../../../styles/Home.module.css";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await prisma.tilemaps.findUnique({
    where: {
      id: "" + params?.pid,
    },
    select: {
      id: true,
      title: true,
    },
  });
  return {
    props: { data },
  };
};

const Pid: InferGetServerSidePropsType<typeof getServerSideProps> = (props: {
  data: tilemaps | null;
}) => {
  return (
    <div className={styles.container}>
      <HeadTitle title="List Pixelettas - Impulse Sub-Pixel Editing Software" />

      <main className={styles.main}>
        <h1 className={styles.title}>List Pixelettas</h1>
        <div>
          <div>Tilemap</div>
          <div style={{ marginLeft: "1em" }}>{props.data?.title}</div>
        </div>
        <div>
          <a href="/impulse-sub-pixel/list">Back to list</a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pid;
