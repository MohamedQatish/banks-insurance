import Image from 'next/image'
import { FileText, ChevronLeft, Bookmark, TrendingUp, Eye } from 'lucide-react'

const decrees = [
  {
    id: 1,
    title: 'تعميم رقم 14/2025 بشأن معايير منح الائتمان للمنشآت الصغيرة والمتوسطة',
    date: '14/06/2025',
    source: 'مصرف سوريا المركزي',
    sourceColor: '#1a56db',
  },
  {
    id: 2,
    title: 'قرار مجلس الوزراء رقم 812 المتعلق بتنظيم عمل شركات التأمين',
    date: '10/06/2025',
    source: 'مجلس الوزراء',
    sourceColor: '#0a7a42',
  },
  {
    id: 3,
    title: 'تعليمات هيئة الإشراف على التأمين بشأن متطلبات الملاءة المالية',
    date: '05/06/2025',
    source: 'هيئة الإشراف على التأمين',
    sourceColor: '#9d3c10',
  },
  {
    id: 4,
    title: 'تعميم رقم 11/2025 بشأن ضوابط التعامل بالعملات الأجنبية',
    date: '01/06/2025',
    source: 'مصرف سوريا المركزي',
    sourceColor: '#1a56db',
  },
]

const featuredReports = [
  {
    id: 1,
    image: '/images/news-5.png',
    category: 'تقرير خاص',
    categoryColor: '#c9a227',
    title: 'مستقبل القطاع المصرفي السوري بعد رفع العقوبات',
    views: '4.2K',
    date: 'يونيو 2025',
  },
  {
    id: 2,
    image: '/images/news-6.png',
    category: 'تحليل',
    categoryColor: '#b45309',
    title: 'الذهب ملجأ المدخرات في ظل التضخم المتصاعد',
    views: '3.1K',
    date: 'مايو 2025',
  },
  {
    id: 3,
    image: '/images/news-3.png',
    category: 'دراسة',
    categoryColor: '#0a7a42',
    title: 'تقييم الوضع التأميني في ظل التحولات الاقتصادية الراهنة',
    views: '2.8K',
    date: 'أبريل 2025',
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
      {/* Vertical Ad */}
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
          {/* Overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(6,14,26,0.7) 0%, transparent 50%)',
            }}
            aria-hidden="true"
          />
        </div>
        <div
          className="absolute bottom-3 right-3 left-3 text-center text-xs py-1.5 rounded-lg"
          style={{
            background: 'rgba(6,14,26,0.75)',
            color: 'rgba(201,162,39,0.8)',
            border: '1px solid rgba(201,162,39,0.25)',
            backdropFilter: 'blur(8px)',
          }}
          aria-hidden="true"
        >
          مساحة إعلانية — للإعلان: تواصل معنا
        </div>
      </div>

      {/* Featured Reports */}
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
                <a
                  href="#"
                  className="flex items-start gap-3 p-3 group transition-colors hover:bg-blue-50/40"
                >
                  {/* Thumbnail */}
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

                  {/* Text */}
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
                </a>
              </li>
            ))}
          </ul>

          <div className="px-4 py-3" style={{ borderTop: '1px solid #e8edf4' }}>
            <a
              href="#"
              className="flex items-center justify-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#c9a227' }}
            >
              <Bookmark size={12} aria-hidden="true" />
              عرض جميع التقارير والملفات
              <ChevronLeft size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Decrees & Regulations */}
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
                <a
                  href="#"
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
                </a>
              </li>
            ))}
          </ul>

          <div className="px-4 py-3" style={{ borderTop: '1px solid #e8edf4' }}>
            <a
              href="#"
              className="flex items-center justify-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#c9a227' }}
            >
              عرض جميع القرارات والتعاميم
              <ChevronLeft size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </aside>
  )
}
