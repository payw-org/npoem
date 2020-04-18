import React from 'react'
import App from 'next/app'
import Head from 'next/head'
// Include globally common styles inside `globalstyle.scss`
// and import it only once
import '@/styles/global/globalstyle.scss'

export default class MyApp extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Next.js TypeScript Quickstart</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}
