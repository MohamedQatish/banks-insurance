import Image from 'next/image'
import Link from 'next/link'
import { FileText, ChevronLeft, Bookmark, TrendingUp, Eye } from 'lucide-react'

const decrees = [
  {
    id: 1,
    title: 'قرار حاكم مصرف سورية المركزي رقم 327/ح القاضي بتمديد مهلة استبدال فئات العملة القديمة',
    date: '15/06/2026',
    source: 'مصرف سورية المركزي',
    sourceColor: '#1a56db',
  },
  {
    id: 2,
    title: 'قرار وزير المالية رقم 773/ق.و القاضي بتمديد مهلة تقديم البيانات والبيان الضريبي للشركات',
    date: '11/06/2026',
    source: 'وزارة المالية',
    sourceColor: '#0a7a42',
  },
  {
    id: 3,
    title: 'قرار مجلس مفوضي هيئة الأوراق المالية رقم 31/م الناظم لتعديل كميات الحدود الدنيا للتأثير بالسعر المرجعي لأسهم البورصة',
    date: '08/06/2026',
    source: 'هيئة الأوراق المالية',
    sourceColor: '#9d3c10',
  },
  {
    id: 4,
    title: 'قرار لجنة إدارة مصرف سورية المركزي المعدل للقرار رقم 235/ل لمنح مرونة تسليم الحوالات الخارجية بالعملة الأجنبية أو الليرة',
    date: '02/06/2026',
    source: 'مصرف سورية المركزي',
    sourceColor: '#1a56db',
  },
]

const featuredReports = [
  {
    id: 1,
    image: '/images/news-5.png',
    category: 'تقرير خاص',
    categoryColor: '#c9a227',
    title: 'آفاق التحول الرقمي الشامل في المنظومة المصرفية السورية لعام 2026',
    views: '4.2K',
    date: 'يونيو 2026',
  },
  {
    id: 2,
    image: '/images/news-6.png',
    category: 'تحليل',
    categoryColor: '#b45309',
    title: 'سوق الذهب المحلي: قراءة في تقلبات الأسعار وملاذات الادخار البديلة',
    views: '3.1K',
    date: 'مايو 2026',
  },
  {
    id: 3,
    image: '/images/news-3.png',
    category: 'دراسة',
    categoryColor: '#0a7a42',
    title: 'واقع قطاع التأمين الصحي في سوريا: التحديات وحلول الاستدامة المقترحة',
    views: '2.8K',
    date: 'أبريل 2026',
  },
]

const SectionHeading = ({
  children,
  icon,
}: {
  children: React.ReactNode
  icon?: React.ReactNode
}) => (
  <div
    className="flex items-center gap-2 px-4 py-3 rounded-t-xl"
    style={{
      background: 'linear-gradient(135deg, #0a1628 0%, #112240 100%)',
      borderBottom: '2px solid #c9a227',
    }}
  >
    {icon && (
      <span style={{ color: '#c9a227' }} aria-hidden="true">
        {icon}
      </span>
    )}
    <h2 className="text-sm font-bold text-white">{children}</h2>
  </div>
)

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-6" aria-label="الشريط الجانبي">
      <div
        className="rounded-xl overflow-hidden relative"
        style={{ border: '1px solid rgba(201,162,39,0.25)' }}
        role="complementary"
        aria-label="مساحة إعلانية"
      >
        <div className="relative w-full" style={{ aspectRatio: '9/14', maxHeight: '420px' }}>
          <Image
            src="/images/ad-sidebar.png"
            alt="مساحة إعلانية"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <section
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid #cfd8e6' }}
        aria-label="أبرز التقارير والملفات"
      >
        <SectionHeading icon={<TrendingUp size={15} />}>أبرز التقارير والملفات</SectionHeading>

        <div style={{ background: '#ffffff' }}>
          <ul>
            {featuredReports.map((report, i) => (
              <li
                key={report.id}
                style={{
                  borderBottom:
                    i < featuredReports.length - 1 ? '1px solid #e8edf4' : 'none',
                }}
              >
                <Link
                  href="/news?category=تقارير"
                  className="flex items-start gap-3 p-3 group transition-colors hover:bg-blue-50/40"
                >
                  <div
                    className="relative shrink-0 rounded-lg overflow-hidden"
                    style={{ width: '72px', height: '54px' }}
                  >
                    <Image
                      src={report.image}
                      alt={report.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="text-xs font-bold px-1.5 py-0.5 rounded"
                        style={{
                          background: `${report.categoryColor}18`,
                          color: report.categoryColor,
                          border: `1px solid ${report.categoryColor}35`,
                        }}
                      >
                        {report.category}
                      </span>
                    </div>
                    <p
                      className="text-xs font-semibold leading-relaxed line-clamp-2 group-hover:text-[#0a1628]"
                      style={{ color: '#1e3a5f' }}
                    >
                      {report.title}
                    </p>
                    <div
                      className="flex items-center gap-3 mt-1 text-xs"
                      style={{ color: '#8a9bb8' }}
                    >
                      <span>{report.date}</span>
                      <span className="flex items-center gap-0.5">
                        <Eye size={10} aria-hidden="true" />
                        {report.views}
                      </span>
                    </div>
                  </div>

                  <ChevronLeft
                    size={13}
                    className="shrink-0 mt-2 opacity-30 group-hover:opacity-80 transition-opacity"
                    style={{ color: '#c9a227' }}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-4 py-3" style={{ borderTop: '1px solid #e8edf4' }}>
            <Link
              href="/news?category=تقارير"
              className="flex items-center justify-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#c9a227' }}
            >
              <Bookmark size={12} aria-hidden="true" />
              عرض جميع التقارير والملفات
              <ChevronLeft size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid #cfd8e6' }}
        aria-label="أحدث القرارات والتعاميم"
      >
        <SectionHeading icon={<FileText size={15} />}>أحدث القرارات والتعاميم</SectionHeading>

        <div style={{ background: '#ffffff' }}>
          <ul>
            {decrees.map((decree, i) => (
              <li
                key={decree.id}
                style={{
                  borderBottom:
                    i < decrees.length - 1 ? '1px solid #e8edf4' : 'none',
                }}
              >
                <Link
                  href="/news?category=قرارات"
                  className="flex items-start gap-3 px-4 py-3.5 group transition-colors hover:bg-blue-50/40"
                >
                  <FileText
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: '#c9a227' }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-medium leading-relaxed line-clamp-2 group-hover:text-[#0a1628]"
                      style={{ color: '#1e3a5f' }}
                    >
                      {decree.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <time className="text-xs" style={{ color: '#8a9bb8' }}>
                        {decree.date}
                      </time>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${decree.sourceColor}12`,
                          color: decree.sourceColor,
                          border: `1px solid ${decree.sourceColor}30`,
                        }}
                      >
                        {decree.source}
                      </span>
                    </div>
                  </div>
                  <ChevronLeft
                    size={13}
                    className="shrink-0 mt-1 opacity-30 group-hover:opacity-80 transition-opacity"
                    style={{ color: '#c9a227' }}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-4 py-3" style={{ borderTop: '1px solid #e8edf4' }}>
            <Link
              href="/news?category=قرارات"
              className="flex items-center justify-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#c9a227' }}
            >
              عرض جميع القرارات والتعاميم
              <ChevronLeft size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </aside>
  )
}
export { decrees }