import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import NewsTicker from '@/components/news-ticker'
import { getAllNews, getCategories } from '@/lib/news'
import NewsPageClient from '@/components/news-page-client'

export const metadata: Metadata = {
  title: 'جميع الأخبار | مجلة المصارف والتأمين',
  description: 'آخر المستجدات في القطاع المصرفي والمالي وشركات التأمين في سوريا والعالم العربي',
}

export default function NewsPage() {
  const allArticles = getAllNews()
  const categories = getCategories()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f0f4f8', direction: 'rtl' }}>
      <Navbar />
      <NewsTicker />

      {/* Page header */}
      <div
        className="w-full"
        style={{ background: 'linear-gradient(180deg, #060e1a 0%, #0a1628 100%)', borderBottom: '2px solid #c9a227' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">جميع الأخبار</h1>
          <p className="text-sm" style={{ color: 'rgba(201,162,39,0.7)' }}>
            آخر المستجدات في القطاع المصرفي والمالي وشركات التأمين
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        <NewsPageClient allArticles={allArticles} categories={categories} />
      </main>

      <Footer />
    </div>
  )
}
