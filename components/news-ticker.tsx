'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'

const tickerItems = [
  'البنك المركزي السوري يُصدر تعميماً جديداً بشأن ضوابط تمويل المشاريع الصغيرة والمتوسطة',
  'ارتفاع ملحوظ في مؤشرات قطاع التأمين خلال الربع الأول من عام 2025',
  'انعقاد منتدى المصارف العربية في دمشق بمشاركة 18 دولة عربية',
  'شركة التأمين الوطنية تُطلق منتجاً جديداً لتأمين المنشآت الصناعية',
  'الاتحاد العام لشركات التأمين يناقش آليات تطوير الإطار التنظيمي',
  'ارتفاع احتياطيات المصارف السورية بنسبة 12% مقارنةً بالعام الماضي',
]

export default function NewsTicker() {
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
      >
        <Zap size={15} fill="#0a1628" />
        <span className="text-sm font-bold whitespace-nowrap">عاجل</span>
      </div>

      {/* Scrolling track */}
      <div
        className="relative flex-1 overflow-hidden h-full cursor-pointer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        title="مرر الفأرة للتوقف"
      >
        <div
          className="ticker-track h-full items-center"
          style={{
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center text-sm font-medium px-8"
              style={{ color: '#e8edf4', whiteSpace: 'nowrap' }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full ml-4 shrink-0"
                style={{ background: '#c9a227' }}
                aria-hidden="true"
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
