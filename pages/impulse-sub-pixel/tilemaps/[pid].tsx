/* eslint-disable @next/next/no-img-element */
import { tilemaps } from ".prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import React from "react"
import { prismaClient } from "../../../lib/prisma"
import { Footer } from "../../../components/layout/Footer"
import { HeadTitle } from "../../../components/layout/HeadTitle"
import styles from "../../../styles/Home.module.css"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await prismaClient.tilemaps.findUnique({
    where: {
      id: "" + params?.pid,
    },
    select: {
      id: true,
      title: true,
    },
  })
  return {
    props: { data },
  }
}

const Pid: InferGetServerSidePropsType<typeof getServerSideProps> = (props: {
  data: tilemaps | null
}) => {
  return (
    <div className={styles.container}>
      <HeadTitle title="List Pixelettas - Impulse Sub-Pixel Editing Software" />

      <main className={styles.main}>
        <h1 className={styles.title}>List Pixelettas</h1>
        <div>
          <div>Tilemap</div>
          <div style={{ marginLeft: "1em" }}>{props.data?.title}</div>
          <div>
            <img
              alt={`${props.data?.title} preview`}
              src={`https://impulse-tilemap-previews.s3.amazonaws.com/public/${props.data?.id}.png`}
            />
          </div>
        </div>
        <div>
          <Link href="/impulse-sub-pixel/list">Back to list</Link>
          {/* <a href="/impulse-sub-pixel/list">Back to list</a> */}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Pid
