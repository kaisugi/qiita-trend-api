import styles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <Head>
        <title>Qiita Trend API</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Qiita のトレンド記事の一覧を JSON で返す非公式 API です。" />
      </Head>
      <h1>Qiita Trend API</h1>
      <div>
        <p>Qiita のトレンド記事の一覧を JSON で返す非公式 API です。Zenn 版は<a href="https://zenn-api.vercel.app/">こちら</a></p>
        <p><Link href="/api/trend">トレンド記事一覧（JSON）</Link><br/>
        <Link href="/trend">トレンド記事一覧（テキスト）</Link></p>
        <p>Qiita 側の仕様変更などにより、予告なくサービスを終了する場合があります。<br/>
        何かありましたら <a href="https://github.com/kaisugi/qiita-trend-api/issues">Issue</a> にてお願いいたします。</p>
        <p>@ 2023 Kaito Sugimoto</p>
      </div>
    </div>
  )
}

export default Home
