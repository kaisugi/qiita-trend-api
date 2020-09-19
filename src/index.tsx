import React, { useState, useEffect } from "react"
import ReactDom from "react-dom"
import { BrowserRouter, Route, Link } from 'react-router-dom'
import axios from "axios"

import * as styles from "./style.css"

const Main = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Qiita Trend API</h1>
      <div>
        <p>Qiita のトレンド記事の一覧を JSON で返す非公式 API です。</p>
        <p><a href="/.netlify/functions/trend" className={styles.a}>トレンド記事一覧（JSON）</a><br/>
        <Link to="/trend" className={styles.a}>トレンド記事一覧（テキスト）</Link></p>
        <p>Qiita 側の仕様変更などにより、予告なくサービスを終了する場合があります。<br/>
        何かありましたら <a href="https://github.com/7ma7X/qiita-trend-api/issues" className={styles.a}>Issue</a> にてお願いいたします。</p>
        <p>@ 2020 HelloRusk</p>
      </div>
    </div>
  )
}

const Trend = () => {
  const [data, setData] = useState<JSX.Element[] | undefined>(undefined)

  useEffect(() => {
    const f = async () => {
      const res = await axios(
        "/.netlify/functions/trend"
      )

      setData(res.data)
    }
    f()
  })

  const renderTrends = (data) => {
    if (data === undefined) {
      return (
        <p>Loading...</p>
      )
    }

    const arr: JSX.Element[] = []

    for (const trend of data){
      const link = `https://qiita.com/${trend.node.author.urlName}/items/${trend.node.uuid}`
      const title = trend.node.title

      arr.push(<p><a target="_blank" className={styles.a} href={link}>{title}</a></p>)
    }

    return arr
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Qiita Trend API</h1>
      <div>
        {renderTrends(data)}
      </div>
      <br />
    </div>
  )
}

const Root = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/trend" component={Trend} />
    </div>
  </BrowserRouter>
)

ReactDom.render(
  <Root />,
  document.getElementById('root')
)
