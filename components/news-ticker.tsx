import Link from 'next/link'
import { Zap } from 'lucide-react'
import { getLatestNews } from '@/lib/news'
import NewsTickerClient from './news-ticker-client'

export default function NewsTicker() {
  const items = getLatestNews(6).map((n) => ({ title: n.title, slug: n.slug }))
  return <NewsTickerClient items={items} />
}
