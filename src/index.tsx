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
        <p><a href="/.netlify/functions/trend">トレンド記事一覧（JSON）</a></p>
        <p><Link to="/trend">トレンド記事一覧（テキスト）</Link></p>
        <p>Qiita 側の仕様変更などにより、予告なくサービスを終了する場合があります。<br/>
        何かありましたら <a href="https://github.com/7ma7X/qiita-trend-api/issues">Issue</a> にてお願いいたします。</p>
        <p>@ 2019 HelloRusk</p>
      </div>
    </div>
  )
}

const Trend = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const f = async () => {
      const res = await axios(
        "https://qiita-api.netlify.com/.netlify/functions/trend"
      )

      setData(res.data)
    }
    f()
  })

  const renderTrends = (data) => {
    const arr: JSX.Element[] = []

    for (const trend of data){
      const id = trend.node.uuid
      const link = `https://qiita.com/taknya/items/${id}`
      const title = trend.node.title

      arr.push(<p><a href={link}>{title}</a></p>)
    }

    return arr
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Qiita Trend API</h1>
      <div>
        {renderTrends(data)}
      </div>
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