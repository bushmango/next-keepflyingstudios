/* eslint-disable @next/next/no-img-element */
import { tilemaps } from '.prisma/client'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import React from 'react'
import { prismaClient } from '../../../lib/prisma'
import { Footer } from '../../../components/layout/Footer'
import { HeadTitle } from '../../../components/layout/HeadTitle'
import styles from '../../../styles/Home.module.css'

import * as ensure from '../../../lib/ensure'
import { ParsedUrlQuery } from 'querystring'

const namespace = 'impulse:app:open'

const getParam = (
  params: ParsedUrlQuery | undefined,
  key: string,
  _default: string | null = null,
) => {
  if (!params) {
    return _default
  }
  let p = params[key]
  if (p == null) {
    return _default
  }
  if (Array.isArray(p)) {
    return p[0]
  }
  return p
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { params, query, req, res } = context

  let uat = getParam(query, 'uat', '')
  let uid = getParam(query, 'uid', '')
  console.log('query', query)
  let auth_user_id = await ensure.getAuthorizedUserIdPage(
    namespace,
    req,
    res,
    uid,
    uat,
  )
  if (auth_user_id === 'unauthorized') {
    return { props: { data: [], err: 'unauthorized' } }
  }
  console.log('auth uid', uid)
  console.log('auth auid', auth_user_id)
  const data = await prismaClient.tilemaps.findMany({
    where: {
      deleted: false,
      user_id: auth_user_id,
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

  console.log('data is', data, params?.uid)
  return { props: { data, err: '' } }

  // const data = await prismaClient.tilemaps.findUnique({
  //   where: {
  //     id: '' + params?.pid,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //   },
  // })
  // return {
  //   props: { data },
  // }
}

// TODO: move to s3 bucket subpixelator-subpix-previews
const Pid: InferGetServerSidePropsType<typeof getServerSideProps> = (props: {
  data: tilemaps[]
  err: string
}) => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Open Subpixelator Subpix - Subpixelator Sub-Pixel Editing Software' />

      <main className={styles.main}>
        <h1 className={styles.title}>List Subpix</h1>
        <div>
          <div>List of subpix</div>
          <div>{props.err && <div>{props.err}</div>}</div>
          <div>
            {!props.err && (
              <div>
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
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Pid
