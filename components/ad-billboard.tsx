'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/images/slide-1.png',
    category: 'قطاع مصرفي',
    headline: 'القطاع المصرفي السوري نحو مرحلة تحول تاريخية',
    sub: 'إصلاحات شاملة وانفتاح على الأسواق العربية والدولية في أعقاب المرحلة الجديدة',
    cta: 'اقرأ التفاصيل',
    categoryColor: '#1a56db',
  },
  {
    id: 2,
    image: '/images/slide-2.png',
    category: 'مؤتمرات',
    headline: 'قمة المصارف العربية 2025 تنطلق من دمشق',
    sub: 'أكثر من 500 مشارك من 20 دولة يناقشون مستقبل التمويل والمصارف في المنطقة',
    cta: 'تابع الفعاليات',
    categoryColor: '#0a7a42',
  },
  {
    id: 3,
    image: '/images/slide-3.png',
    category: 'تأمين',
    headline: 'شركات التأمين السورية تُعيد رسم خريطة السوق',
    sub: 'منتجات جديدة وتغطيات موسّعة تواكب متطلبات المرحلة الراهنة',
    cta: 'اعرف المزيد',
    categoryColor: '#c9a227',
  },
]

export default function AdBillboard() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrent(idx)
      setTimeout(() => setIsTransitioning(false), 600)
    },
    [isTransitioning],
  )

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  // Auto-advance every 5 s
  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  const slide = slides[current]

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(220px, 36vw, 460px)' }}
      aria-label="سلايدر إعلاني"
      role="region"
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.headline}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Dark gradient overlay — stronger at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(6,14,26,0.88) 0%, rgba(6,14,26,0.45) 45%, rgba(6,14,26,0.15) 100%)',
            }}
            aria-hidden="true"
          />
          {/* Right vignette for extra depth */}
          <div
            className="absolute inset-0 hidden md:block"
            style={{
              background: 'linear-gradient(to left, rgba(6,14,26,0.5) 0%, transparent 55%)',
            }}
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Text content — positioned bottom-right (RTL) */}
      <div
        className="absolute bottom-0 right-0 left-0 z-10 max-w-7xl mx-auto px-5 md:px-8 pb-6 md:pb-9"
        style={{ direction: 'rtl' }}
      >
        <div
          className="transition-all duration-500"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
          }}
        >
          {/* Category badge */}
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
            style={{
              background: `${slide.categoryColor}28`,
              color: slide.categoryColor,
              border: `1px solid ${slide.categoryColor}60`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {slide.category}
          </span>

          {/* Headline */}
          <h2
            className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2 md:mb-3 text-balance"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)', maxWidth: '680px' }}
          >
            {slide.headline}
          </h2>

          {/* Subtext */}
          <p
            className="text-xs md:text-sm text-white/70 leading-relaxed mb-4 hidden sm:block"
            style={{ maxWidth: '520px' }}
          >
            {slide.sub}
          </p>

          {/* CTA */}
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #c9a227, #a07d18)',
              color: '#060e1a',
              boxShadow: '0 4px 16px rgba(201,162,39,0.35)',
            }}
          >
            {slide.cta}
            <ChevronLeft size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute top-1/2 right-3 md:right-5 z-20 -translate-y-1/2 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'rgba(6,14,26,0.55)',
          border: '1px solid rgba(201,162,39,0.3)',
          color: '#fff',
          backdropFilter: 'blur(8px)',
        }}
        aria-label="السلايد السابق"
      >
        <ChevronRight size={18} />
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 left-3 md:left-5 z-20 -translate-y-1/2 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'rgba(6,14,26,0.55)',
          border: '1px solid rgba(201,162,39,0.3)',
          color: '#fff',
          backdropFilter: 'blur(8px)',
        }}
        aria-label="السلايد التالي"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        aria-label="مؤشرات السلايدر"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              background: i === current ? '#c9a227' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`الانتقال إلى السلايد ${i + 1}`}
            aria-current={i === current}
          />
        ))}
      </div>
    </div>
  )
}
