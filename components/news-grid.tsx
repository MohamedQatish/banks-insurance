'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import type { NewsItem } from '@/lib/news'

interface NewsGridProps {
  articles: NewsItem[]
}

function CategoryBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="text-xs font-bold px-2.5 py-0.5 rounded"
      style={{ background: `${color}20`, color, border: `1px solid ${color}45` }}
    >
      {label}
    </span>
  )
}

// ── Mobile horizontal swipe carousel ──────────────────────────────────────────
function MobileCarousel({ articles }: { articles: NewsItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const total = articles.length

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(total - 1, idx))
    setCurrent(clamped)
    trackRef.current?.children[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        onScroll={(e) => {
          const el = e.currentTarget
          const idx = Math.round(el.scrollLeft / el.offsetWidth)
          setCurrent(idx)
        }}
      >
        {articles.map((article) => (
          <article
            key={article.slug}
            className="snap-start shrink-0 rounded-xl overflow-hidden news-card flex flex-col"
            style={{
              width: 'calc(85vw)',
              maxWidth: '340px',
              background: '#ffffff',
              border: '1px solid #cfd8e6',
              boxShadow: '0 2px 8px rgba(10,22,40,0.06)',
            }}
          >
            <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: '16/9' }}>
              <Image src={article.image} alt={article.title} fill className="object-cover news-card-img" />
              <div className="absolute top-3 right-3">
                <CategoryBadge label={article.category} color={article.categoryColor} />
              </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
              <span className="flex items-center gap-1 text-xs mb-2" style={{ color: '#8a9bb8' }}>
                <Clock size={10} aria-hidden="true" />
                <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('ar-SY')}</time>
              </span>
              <h3 className="font-bold text-sm leading-relaxed line-clamp-3 flex-1 text-pretty" style={{ color: '#0a1628' }}>
                {article.title}
              </h3>
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center gap-0.5 mt-3 text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: '#c9a227' }}
              >
                اقرأ المزيد
                <ChevronLeft size={12} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 px-1">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
          style={{ background: 'rgba(10,22,40,0.07)', color: '#0a1628' }}
          aria-label="السابق"
        >
          <ChevronRight size={14} />
          السابق
        </button>
        <div className="flex items-center gap-1.5">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === current ? '20px' : '7px', height: '7px', background: i === current ? '#c9a227' : '#cfd8e6' }}
              aria-label={`الخبر ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === total - 1}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-30"
          style={{ background: 'rgba(10,22,40,0.07)', color: '#0a1628' }}
          aria-label="التالي"
        >
          التالي
          <ChevronLeft size={14} />
        </button>
      </div>
    </div>
  )
}

// ── Desktop grid ───────────────────────────────────────────────────────────────
function DesktopGrid({ articles }: { articles: NewsItem[] }) {
  const [featured, second, ...small] = articles

  if (!featured) return null

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: featured + second */}
      <div className="grid grid-cols-2 gap-5">
        <article
          className="rounded-xl overflow-hidden news-card group"
          style={{ background: '#ffffff', border: '1px solid #cfd8e6', boxShadow: '0 2px 8px rgba(10,22,40,0.06)' }}
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image src={featured.image} alt={featured.title} fill className="object-cover news-card-img" priority />
            <div className="absolute top-3 right-3">
              <CategoryBadge label={featured.category} color={featured.categoryColor} />
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.35) 0%, transparent 60%)' }} aria-hidden="true" />
          </div>
          <div className="p-4">
            <span className="flex items-center gap-1 text-xs mb-2" style={{ color: '#8a9bb8' }}>
              <Clock size={11} aria-hidden="true" />
              <time dateTime={featured.date}>{new Date(featured.date).toLocaleDateString('ar-SY')}</time>
            </span>
            <h3 className="font-bold text-base leading-relaxed mb-2 text-balance" style={{ color: '#0a1628' }}>{featured.title}</h3>
            <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: '#5a6a85' }}>{featured.excerpt}</p>
            <Link href={`/news/${featured.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: '#c9a227' }}>
              اقرأ المزيد <ChevronLeft size={13} aria-hidden="true" />
            </Link>
          </div>
        </article>

        {second && (
          <article
            className="rounded-xl overflow-hidden news-card group"
            style={{ background: '#ffffff', border: '1px solid #cfd8e6', boxShadow: '0 2px 8px rgba(10,22,40,0.06)' }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image src={second.image} alt={second.title} fill className="object-cover news-card-img" />
              <div className="absolute top-3 right-3">
                <CategoryBadge label={second.category} color={second.categoryColor} />
              </div>
            </div>
            <div className="p-4">
              <span className="flex items-center gap-1 text-xs mb-2" style={{ color: '#8a9bb8' }}>
                <Clock size={11} aria-hidden="true" />
                <time dateTime={second.date}>{new Date(second.date).toLocaleDateString('ar-SY')}</time>
              </span>
              <h3 className="font-bold text-sm leading-relaxed mb-2 line-clamp-2 text-pretty" style={{ color: '#0a1628' }}>{second.title}</h3>
              <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: '#5a6a85' }}>{second.excerpt}</p>
              <Link href={`/news/${second.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: '#c9a227' }}>
                اقرأ المزيد <ChevronLeft size={13} aria-hidden="true" />
              </Link>
            </div>
          </article>
        )}
      </div>

      {/* Row 2: small cards */}
      {small.length > 0 && (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {small.map((article) => (
            <article
              key={article.slug}
              className="rounded-xl overflow-hidden news-card group flex flex-col"
              style={{ background: '#ffffff', border: '1px solid #cfd8e6', boxShadow: '0 2px 8px rgba(10,22,40,0.06)' }}
            >
              <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: '16/9' }}>
                <Image src={article.image} alt={article.title} fill className="object-cover news-card-img" />
                <div className="absolute top-2 right-2">
                  <CategoryBadge label={article.category} color={article.categoryColor} />
                </div>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <span className="flex items-center gap-1 text-xs mb-1.5" style={{ color: '#8a9bb8' }}>
                  <Clock size={10} aria-hidden="true" />
                  <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('ar-SY')}</time>
                </span>
                <h3 className="font-bold text-xs leading-relaxed line-clamp-3 flex-1 text-pretty" style={{ color: '#0a1628' }}>{article.title}</h3>
                <Link href={`/news/${article.slug}`} className="inline-flex items-center gap-0.5 mt-2 text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: '#c9a227' }}>
                  اقرأ المزيد <ChevronLeft size={12} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NewsGrid({ articles }: NewsGridProps) {
  return (
    <section aria-label="آخر الأخبار" id="news">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: '#0a1628' }}>
          <span className="inline-block w-1 h-6 rounded-sm" style={{ background: '#c9a227' }} aria-hidden="true" />
          آخر الأخبار
        </h2>
        <Link href="/news" className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: '#c9a227' }}>
          عرض الكل
          <ChevronLeft size={14} aria-hidden="true" />
        </Link>
      </div>

      {/* Mobile: swipe carousel */}
      <div className="sm:hidden">
        <MobileCarousel articles={articles} />
      </div>

      {/* Desktop: multi-row grid */}
      <div className="hidden sm:block">
        <DesktopGrid articles={articles} />
      </div>
    </section>
  )
}
