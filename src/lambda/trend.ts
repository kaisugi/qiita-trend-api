import axios from 'axios'
import cheerio from 'cheerio'

const fetchTrend = (html: string) => {
  const $ = cheerio.load(html)
  const raw = $('script[data-component-name=HomeArticleTrendFeed]').html() ?? ''
  if (raw === undefined) return {}
  const rawData = JSON.parse(raw).trend.edges

  return rawData.map(obj => {
    // 不要なプロパティを削除
    delete obj.followingLikers
    delete obj.isLikedByViewer

    delete obj.node.isLikedByViewer
    delete obj.node.isStockableByViewer
    delete obj.node.isStockedByViewer
    delete obj.node.followingLikers
    delete obj.node.recentlyFollowingLikers

    return obj
  })
}

export const handler = async () => {
  const url = 'https://qiita.com/'

  return await axios
    .get(url)
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