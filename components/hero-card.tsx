import Image from 'next/image'
import { Clock, ChevronLeft } from 'lucide-react'

export default function HeroCard() {
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
          src="/images/hero-banking.png"
          alt="الخبر الرئيسي - قطاع المصارف السوري"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
        {/* Category badge over image */}
        <div className="absolute top-4 right-4">
          <span
            className="px-3 py-1.5 rounded text-xs font-bold"
            style={{ background: '#c9a227', color: '#0a1628' }}
          >
            مصارف
          </span>
        </div>
        {/* Gradient overlay at bottom */}
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
            dateTime="2025-06-16"
          >
            16 يونيو 2025
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
          البنك المركزي السوري يُعلن عن حزمة إصلاحات شاملة لتطوير البنية التحتية للقطاع المصرفي وتعزيز الاستقرار المالي
        </h2>

        <p
          className="text-sm leading-relaxed mb-5 line-clamp-3"
          style={{ color: '#5a6a85' }}
        >
          أعلن مصرف سوريا المركزي عن إطلاق حزمة إصلاحات تشريعية وتنظيمية شاملة تهدف إلى تحديث البنية التحتية للقطاع المصرفي وتعزيز الاستقرار المالي في ضوء المتطلبات الاقتصادية الراهنة، وتشمل الإصلاحات مراجعة اشتراطات كفاية رأس المال وتطوير منظومة الرقابة الداخلية في المصارف التجارية.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all duration-200 hover:shadow-lg"
          style={{
            background: '#c9a227',
            color: '#0a1628',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = '#a07d18'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = '#c9a227'
          }}
        >
          اقرأ المزيد
          <ChevronLeft size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
