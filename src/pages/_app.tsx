// Include globally common styles inside `globalstyle.scss`
// and import it only once
import '@/styles/global/globalstyle.scss'

import App from 'next/app'
import Head from 'next/head'
import React from 'react'

export default class MyApp extends App {
  // componentDidMount() {
  //   const app = document.getElementById('__next')

  //   app && (app.id = 'npoem')
  // }

  public render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>N poem</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}
