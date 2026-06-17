'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react'

interface Article {
  id: number
  image: string
  category: string
  categoryColor: string
  time: string
  title: string
  excerpt: string
}

const articles: Article[] = [
  {
    id: 1,
    image: '/images/news-1.png',
    category: 'مصارف',
    categoryColor: '#1a56db',
    time: 'منذ ساعتين',
    title: 'مصارف خاصة تُطلق خدمات التحويل الفوري عبر المنصات الرقمية',
    excerpt:
      'أعلنت مجموعة من المصارف الخاصة السورية عن إطلاق خدمة التحويل الفوري للأموال عبر تطبيقات الهاتف الذكي في إطار خطتها لتحقيق التحول الرقمي الشامل.',
  },
  {
    id: 2,
    image: '/images/news-2.png',
    category: 'تأمين',
    categoryColor: '#0a7a42',
    time: 'منذ 4 ساعات',
    title: 'شركات التأمين تُناقش تطوير منتجات التأمين الزراعي في سوريا',
    excerpt:
      'عقد اتحاد شركات التأمين السورية اجتماعاً موسعاً ناقش خلاله آليات تطوير منتجات التأمين الزراعي وتوسيع نطاق التغطية لشريحة أوسع من المزارعين.',
  },
  {
    id: 3,
    image: '/images/news-3.png',
    category: 'أسواق مالية',
    categoryColor: '#9d3c10',
    time: 'منذ 6 ساعات',
    title: 'استقرار نسبي في أسواق المال السورية وسط تحسن في منسوب الثقة',
    excerpt:
      'شهدت الأسواق المالية السورية استقراراً نسبياً مع تسجيل حركة تداول إيجابية وانعكاسات مشجعة على مستوى الثقة لدى المستثمرين.',
  },
  {
    id: 4,
    image: '/images/news-4.png',
    category: 'تقنية مالية',
    categoryColor: '#6b21a8',
    time: 'منذ 8 ساعات',
    title: 'التحول الرقمي في القطاع المصرفي السوري يُحقق قفزات نوعية',
    excerpt:
      'كشف تقرير حديث صادر عن اتحاد المصارف العربية أن القطاع المصرفي السوري حقق تقدماً لافتاً في مجال التحول الرقمي خلال الأشهر الماضية.',
  },
  {
    id: 5,
    image: '/images/news-5.png',
    category: 'مؤتمرات',
    categoryColor: '#0369a1',
    time: 'منذ 10 ساعات',
    title: 'انطلاق فعاليات قمة المصارف العربية في دمشق بمشاركة دولية واسعة',
    excerpt:
      'انطلقت في العاصمة دمشق فعاليات القمة السنوية للمصارف العربية بمشاركة وفود من أكثر من عشرين دولة عربية وأجنبية.',
  },
  {
    id: 6,
    image: '/images/news-6.png',
    category: 'استثمار',
    categoryColor: '#b45309',
    time: 'منذ أمس',
    title: 'الذهب يستقر عند مستويات مرتفعة وسط مخاوف اقتصادية دولية',
    excerpt:
      'يواصل الذهب تحليقه عند مستويات مرتفعة وسط تنامي الطلب على الملاذات الآمنة في ظل الضبابية الاقتصادية التي تسود الأسواق الدولية.',
  },
]

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
function MobileCarousel() {
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
      {/* Scroll track */}
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
            key={article.id}
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
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover news-card-img"
              />
              <div className="absolute top-3 right-3">
                <CategoryBadge label={article.category} color={article.categoryColor} />
              </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
              <span className="flex items-center gap-1 text-xs mb-2" style={{ color: '#8a9bb8' }}>
                <Clock size={10} aria-hidden="true" />
                <time>{article.time}</time>
              </span>
              <h3
                className="font-bold text-sm leading-relaxed line-clamp-3 flex-1 text-pretty"
                style={{ color: '#0a1628' }}
              >
                {article.title}
              </h3>
              <Link
                href="/news"
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

      {/* Prev/Next arrows */}
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

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '20px' : '7px',
                height: '7px',
                background: i === current ? '#c9a227' : '#cfd8e6',
              }}
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
function DesktopGrid() {
  const [featured, second, ...small] = articles

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: featured (large) + second (medium) */}
      <div className="grid grid-cols-2 gap-5">
        {/* Featured */}
        <article
          className="rounded-xl overflow-hidden news-card group"
          style={{ background: '#ffffff', border: '1px solid #cfd8e6', boxShadow: '0 2px 8px rgba(10,22,40,0.06)' }}
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image src={featured.image} alt={featured.title} fill className="object-cover news-card-img" priority />
            <div className="absolute top-3 right-3">
              <CategoryBadge label={featured.category} color="#fff" />
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.35) 0%, transparent 60%)' }}
              aria-hidden="true"
            />
          </div>
          <div className="p-4">
            <span className="flex items-center gap-1 text-xs mb-2" style={{ color: '#8a9bb8' }}>
              <Clock size={11} aria-hidden="true" />
              <time>{featured.time}</time>
            </span>
            <h3 className="font-bold text-base leading-relaxed mb-2 text-balance" style={{ color: '#0a1628' }}>
              {featured.title}
            </h3>
            <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: '#5a6a85' }}>
              {featured.excerpt}
            </p>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#c9a227' }}
            >
              اقرأ المزيد <ChevronLeft size={13} aria-hidden="true" />
            </Link>
          </div>
        </article>

        {/* Second */}
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
              <time>{second.time}</time>
            </span>
            <h3 className="font-bold text-sm leading-relaxed mb-2 line-clamp-2 text-pretty" style={{ color: '#0a1628' }}>
              {second.title}
            </h3>
            <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: '#5a6a85' }}>
              {second.excerpt}
            </p>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#c9a227' }}
            >
              اقرأ المزيد <ChevronLeft size={13} aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>

      {/* Row 2: 4 small cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {small.map((article) => (
          <article
            key={article.id}
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
                <time>{article.time}</time>
              </span>
              <h3
                className="font-bold text-xs leading-relaxed line-clamp-3 flex-1 text-pretty"
                style={{ color: '#0a1628' }}
              >
                {article.title}
              </h3>
              <Link
                href="/news"
                className="inline-flex items-center gap-0.5 mt-2 text-xs font-semibold transition-opacity hover:opacity-70"
                style={{ color: '#c9a227' }}
              >
                اقرأ المزيد <ChevronLeft size={12} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function NewsGrid() {
  return (
    <section aria-label="آخر الأخبار" id="news">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2
          className="text-lg font-bold flex items-center gap-2"
          style={{ color: '#0a1628' }}
        >
          <span
            className="inline-block w-1 h-6 rounded-sm"
            style={{ background: '#c9a227' }}
            aria-hidden="true"
          />
          آخر الأخبار
        </h2>
        <Link
          href="/news"
          className="text-xs font-semibold flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{ color: '#c9a227' }}
        >
          عرض الكل
          <ChevronLeft size={14} aria-hidden="true" />
        </Link>
      </div>

      {/* Mobile: swipe carousel */}
      <div className="sm:hidden">
        <MobileCarousel />
      </div>

      {/* Desktop: multi-row grid */}
      <div className="hidden sm:block">
        <DesktopGrid />
      </div>
    </section>
  )
}
