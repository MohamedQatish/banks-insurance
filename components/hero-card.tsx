import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChevronLeft } from 'lucide-react'
import { getLatestNews, formatDate } from '@/lib/news'

export default function HeroCard() {
  const news = getLatestNews(1)
  const article = news[0]

  if (!article) return null

  return (
    <article
      className="rounded-xl overflow-hidden"
      style={{
        background: '#ffffff',
        border: '1px solid #cfd8e6',
        boxShadow: '0 2px 16px rgba(10,22,40,0.08)',
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span
            className="px-3 py-1.5 rounded text-xs font-bold"
            style={{ background: '#c9a227', color: '#0a1628' }}
          >
            {article.category}
          </span>
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.6), transparent)' }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={13} style={{ color: '#c9a227' }} aria-hidden="true" />
          <time
            className="text-xs font-medium"
            style={{ color: '#5a6a85' }}
            dateTime={article.date}
          >
            {formatDate(article.date)}
          </time>
          <span style={{ color: '#cfd8e6' }} aria-hidden="true">•</span>
          <span className="text-xs font-medium" style={{ color: '#5a6a85' }}>
            خبر رئيسي
          </span>
        </div>

        <h2
          className="text-xl md:text-2xl font-bold leading-relaxed mb-3 text-balance"
          style={{ color: '#0a1628' }}
        >
          {article.title}
        </h2>

        <p
          className="text-sm leading-relaxed mb-5 line-clamp-3"
          style={{ color: '#5a6a85' }}
        >
          {article.excerpt}
        </p>

        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          style={{ background: '#c9a227', color: '#0a1628' }}
        >
          اقرأ المزيد
          <ChevronLeft size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
