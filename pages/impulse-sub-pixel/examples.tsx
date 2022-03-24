import type { NextPage } from 'next'
import React from 'react'
import { TwitterFollowButton, TwitterTimelineEmbed } from 'react-twitter-embed'
import { HeadTitle } from '../../components/layout/HeadTitle'
import stylesH from '../../styles/Home.module.scss'
import styles from './examples.module.scss'

const twitterScreenName = 'KeepFlyingBee'
const twitterId = '1506129400550539267'
const ImpulseSubPixelPage: NextPage = () => {
  return (
    <>
      <HeadTitle title='Subpixelator.io Sub-Pixel Editing Software' />
      <div className={styles.flex}>
        <div className={styles.flexTop}>
          <h1 className={stylesH.title}>Subpixelator.io Sub-Pixel Editor</h1>
          {/* <h2>Examples</h2> */}
        </div>
        <div className={styles.flexMiddle}>
          <TwitterTimelineEmbed
            sourceType='profile'
            // screenName={twitterScreenName}
            userId={twitterId}
            //options={{ height: 400 }}
            options={{ width: 800 }}
            autoHeight={true}
            placeholder={<div>Loading tweets...</div>}
          />
          <TwitterFollowButton screenName={twitterScreenName} />
        </div>
        <div className={styles.flexBottom}>
          <p style={{ fontSize: '2rem' }}>
            <a href='/impulse-sub-pixel/sub-pixel-app.html'>
              Try Subpixelator.io and make your own Subpixelettes
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default ImpulseSubPixelPage
