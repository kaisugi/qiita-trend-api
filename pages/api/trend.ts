// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import cheerio from 'cheerio'

type TrendObjectType = {
  isLikedByViewer?: boolean
  isNewArrival?: boolean
  followingLikers?: object[]
  node?: TrendObjectNodeType
}

type TrendObjectNodeType = {
  encryptedId?: string
  isLikedByViewer?: boolean
  isStockableByViewer?: boolean
  isStockedByViewer?: boolean
  likesCount?: number
  linkUrl?: string
  publishedAt?: string
  title?: string
  uuid?: string
  author?: object
  organization?: object
  recentlyFollowingLikers?: object[]
  tags?: object[]
}

const fetchTrend = (html: string) => {
  const $ = cheerio.load(html)
  const raw = $('script[data-component-name=New2HomeTrendPage]').html() ?? ''
  if (raw === undefined) return {}
  const rawData = JSON.parse(raw).trend.edges

  return rawData.map((obj: TrendObjectType) => {
    // 不要なプロパティを削除
    delete obj.followingLikers
    delete obj.isLikedByViewer

    delete obj?.node?.isLikedByViewer
    delete obj?.node?.isStockableByViewer
    delete obj?.node?.isStockedByViewer
    delete obj?.node?.recentlyFollowingLikers

    return obj
  })
}

type Data = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = 'https://qiita.com/'

  res.setHeader('Access-Control-Allow-Origin', '*')

  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json(fetchTrend(data))
    })
}