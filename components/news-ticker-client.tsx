'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

interface TickerItem {
  title: string
  slug: string
}

export default function NewsTickerClient({ items }: { items: TickerItem[] }) {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="w-full flex items-center overflow-hidden"
      style={{
        background: '#0a1628',
        borderBottom: '2px solid #c9a227',
        height: '42px',
      }}
    >
      {/* Label */}
      <div
        className="shrink-0 flex items-center gap-2 px-4 h-full z-10"
        style={{
          background: '#c9a227',
          color: '#0a1628',
          minWidth: '120px',
        }}
        aria-label="عاجل"
      >
        <Zap size={15} fill="#0a1628" aria-hidden="true" />
        <span className="text-sm font-bold whitespace-nowrap">عاجل</span>
      </div>

      {/* Scrolling track */}
      <div
        className="relative flex-1 overflow-hidden h-full cursor-pointer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        title="مرر الفأرة للتوقف"
        aria-live="polite"
        aria-label="شريط الأخبار العاجلة"
      >
        <div
          className="ticker-track h-full items-center"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {[...items, ...items].map((item, i) => (
            <Link
              key={i}
              href={`/news/${item.slug}`}
              className="inline-flex items-center text-sm font-medium px-8 hover:opacity-80 transition-opacity"
              style={{ color: '#e8edf4', whiteSpace: 'nowrap' }}
              tabIndex={i < items.length ? 0 : -1}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full ml-4 shrink-0"
                style={{ background: '#c9a227' }}
                aria-hidden="true"
              />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
