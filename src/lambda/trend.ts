import axios from 'axios'
import cheerio from 'cheerio'

const fetchTrend = (html: string) => {
  const $ = cheerio.load(html)
  const raw = $('div[data-hyperapp-app="Trend"]').attr('data-hyperapp-props')
  return JSON.parse(raw ?? '{}').trend.edges
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