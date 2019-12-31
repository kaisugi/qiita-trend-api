import axios from 'axios'
import cheerio from 'cheerio'

const fetchTrend = (html: string) => {
  const $ = cheerio.load(html)
  const raw = $('div[data-hyperapp-app="Trend"]').attr('data-hyperapp-props')
  if (raw === undefined) return {}
  const rawData = JSON.parse(raw).trend.edges

  return rawData.map(obj => {
    // 不要なプロパティを削除
    delete obj.followingLikers
    delete obj.isLikedByViewer
    return obj
  })
}

export const handler = async () => {
  const url = 'https://qiita.com/?scope=weekly'

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_ACCESS_TOKEN}`
      }
    })
    .then(({ data }) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(fetchTrend(data)),
      }
    })
    .catch(err => {
      return {
        statusCode: 500,
        body: err,
      }
    })
}