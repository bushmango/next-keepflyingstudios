/* eslint-disable @next/next/no-img-element */
import { tilemaps } from '.prisma/client'
import { DateTime } from 'luxon'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import * as ensure from '../../lib/ensure'
import { prismaClient } from '../../lib/prisma'
import stylesHome from '../../styles/Home.module.css'
import { Footer } from '../layout/Footer'
import { HeadTitle } from '../layout/HeadTitle'
import styles from './app.module.scss'

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
      updated_at: true,
    },
    orderBy: [
      {
        updated_at: 'desc',
      },
    ],
    // where: { published: true },
    // include: {
    //   author: {
    //     select: { name: true },
    //   },
    // },
  })
  let dataMapped = data.map((c) => {
    return {
      id: c.id,
      title: c.title,
      updated_at: c.updated_at?.toISOString(),
    }
  })

  // console.log('data is', dataMapped, params?.uid)
  return { props: { data: dataMapped, err: '' } }
}

// TODO: move to s3 bucket subpixelator-subpix-previews
export const ListPage: InferGetServerSidePropsType<
  typeof getServerSideProps
> = (props: {
  data: { id: string; title: string; updated_at: string }[]
  err: string
}) => {
  return (
    <div className={stylesHome.container}>
      <HeadTitle title='List Subpixelator Subpix - Subpixelator Sub-Pixel Editing Software' />

      <main className={stylesHome.main}>
        <h1 className={stylesHome.title}>Open a Subpix Image</h1>
        <div>
          {/* <div>List of subpix</div> */}
          <div>{props.err && <div>{props.err}</div>}</div>
          <div>
            {!props.err && (
              <div>
                <div className={styles.listItems}>
                  {props.data.map((c) => {
                    let date = DateTime.fromISO(c.updated_at)
                    const onClick = () => {
                      alert('open ' + c.id)
                    }
                    return (
                      <React.Fragment key={c.id}>
                        <div className={styles.listLeft} onClick={onClick}>
                          <div className={styles.listText}>
                            <div>
                              {/* <Link href={`/impulse-sub-pixel/tilemaps/${c.id}`}> */}
                              <strong>{c.title}</strong>
                              <br />
                              {date.toLocaleString(DateTime.DATE_SHORT)}
                              <br />
                              {date.toLocaleString(DateTime.TIME_SIMPLE)}
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                        <div className={styles.listRight} onClick={onClick}>
                          <div className={styles.listImg}>
                            <img
                              alt={`${c.title} preview`}
                              src={`https://impulse-tilemap-previews.s3.amazonaws.com/public/${c.id}.png`}
                            />
                          </div>
                        </div>
                        {/* <a href={`/impulse-sub-pixel/tilemaps/${c.id}`}>{c.title}</a> */}
                      </React.Fragment>
                    )
                  })}
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
