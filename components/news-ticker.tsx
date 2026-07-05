import Link from 'next/link'
import { Zap } from 'lucide-react'
import { getLatestNews } from '@/lib/news'
import NewsTickerClient from './news-ticker-client'

export default function NewsTicker() {
  const items = getLatestNews(6).map((n) => ({ title: n.title, slug: n.slug }))
  
  const specialItem = {
    title: '📢 موعدنا معكم في معرض سورية الدولي للبترول سيبربيترو من 7/7/2026 إلى 10/7/2026',
    slug: '#',
    isSpecial: true
  }
  
  const allItems = [specialItem, ...items]
  
  return <NewsTickerClient items={allItems} />
}