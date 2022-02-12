import styles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Trend: NextPage = () => {
  const [data, setData] = useState<JSX.Element[] | undefined>(undefined)

  useEffect(() => {
    const f = async () => {
      const res = await axios(
        "/api/trend"
      )

      setData(res.data)
    }
    f()
  }, [])

  const renderTrends = (data: any) => {
    if (data === undefined) {
      return (
        <p>Loading...</p>
      )
    }

    const arr: JSX.Element[] = []

    for (const trend of data){
      const link = `https://qiita.com/${trend.node.author.urlName}/items/${trend.node.uuid}`
      const title = trend.node.title

      arr.push(<p><a target="_blank" className={styles.a} href={link} rel="noreferrer">{title}</a></p>)
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

export default Trend