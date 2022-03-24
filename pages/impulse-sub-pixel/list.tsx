/* eslint-disable @next/next/no-img-element */
import { tilemaps } from '.prisma/client'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import React from 'react'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import { prismaClient } from '../../lib/prisma'
import styles from '../../styles/Home.module.scss'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await prismaClient.tilemaps.findMany({
    where: {
      deleted: false,
    },
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
  })

  console.log('data is', data)
  return { props: { data } }
}

const List: InferGetServerSidePropsType<typeof getServerSideProps> = (props: {
  data: tilemaps[]
}) => {
  return (
    <div className={styles.container}>
      <HeadTitle title='List Pixelettas - Impulse Sub-Pixel Editing Software' />

      <h1 className={styles.title}>List Pixelettas</h1>
      <div>
        <div>List of tilemaps</div>
        <div style={{ marginLeft: '1em' }}>
          {props.data.map((c) => (
            <div key={c.id}>
              <Link href={`/impulse-sub-pixel/tilemaps/${c.id}`}>
                {c.title}
              </Link>
              <img
                alt={`${c.title} preview`}
                src={`https://impulse-tilemap-previews.s3.amazonaws.com/public/${c.id}.png`}
              />
              {/* <a href={`/impulse-sub-pixel/tilemaps/${c.id}`}>{c.title}</a> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default List
