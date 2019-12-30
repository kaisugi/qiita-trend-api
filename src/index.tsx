import React from "react"
import ReactDom from "react-dom"

import * as style from "./style.css"

const Main = () => {
  return (
    <div className={style.main}>
      <h1 className={style.h1}>Qiita Trend API</h1>
      <div>
        <p>Qiita のトレンド記事の一覧を JSON で返す非公式 API です。</p>
        <p><a href="/.netlify/functions/trend">トレンド記事一覧</a></p>
        <p>Qiita 側の仕様変更などにより、予告なくサービスを終了する場合があります。<br/>
        何かありましたら <a href="https://github.com/7ma7X/qiita-trend-api/issues">Issue</a> にてお願いいたします。</p>
        <p>@ 2019 HelloRusk</p>
      </div>
    </div>
  )
}

ReactDom.render(
  <Main />,
  document.getElementById('root')
)