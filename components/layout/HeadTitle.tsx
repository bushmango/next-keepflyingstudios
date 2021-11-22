import Head from 'next/head'
import React from 'react'

export const HeadTitle = (props: { title: string }) => {
  return (
    <Head>
      <title>{props.title} - Keep Flying Studios LLC</title>
      <meta name='description' content='Generated by create next app' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
