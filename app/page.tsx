import Image from 'next/image'
import Link from 'next/link'
import { FileText, ChevronLeft, TrendingUp, BookOpen } from 'lucide-react'
import Navbar from '@/components/navbar'
import NewsTicker from '@/components/news-ticker'
import AdBillboard from '@/components/ad-billboard'
import HeroCard from '@/components/hero-card'
import NewsGrid from '@/components/news-grid'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import { getLatestNews } from '@/lib/news'

// ── Ad slot component ──────────────────────────────────────────────────────────
function AdSlot({
  image,
  alt,
  label = 'مساحة إعلانية',
  href = '#',
  portrait = false,
}: {
  image: string
  alt: string
  label?: string
  href?: string
  portrait?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-xl overflow-hidden group"
      style={{
        border: '1px solid rgba(201,162,39,0.2)',
        boxShadow: '0 2px 12px rgba(10,22,40,0.08)',
      }}
      aria-label={label}
    >
      <div style={{ aspectRatio: portrait ? '3/4' : '3/1' }} className="relative">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: portrait ? 'linear-gradient(to top, rgba(6,14,26,0.65) 0%, transparent 45%)' : 'linear-gradient(to left, rgba(6,14,26,0.55) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
      </div>
      <div
        className="absolute bottom-2 right-2 text-xs px-2.5 py-1 rounded-md"
        style={{
          background: 'rgba(6,14,26,0.72)',
          color: 'rgba(201,162,39,0.8)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(201,162,39,0.18)',
        }}
        aria-hidden="true"
      >
        {label}
      </div>
    </a>
  )
}

// ── Section heading ────────────────────────────────────────────────────────────
function SectionHeading({
  icon,
  title,
  viewAllHref,
}: {
  icon: React.ReactNode
  title: string
  viewAllHref?: string
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2
        className="flex items-center gap-2 text-lg font-bold"
        style={{ color: '#0a1628' }}
      >
        <span style={{ color: '#c9a227' }} aria-hidden="true">{icon}</span>
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: '#c9a227' }}
        >
          عرض الكل
          <ChevronLeft size={14} aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

const quickReads = [
  { id: 1, category: 'قرارات', categoryColor: '#1a56db', title: 'تعميم رقم 14/2025 بشأن معايير منح الائتمان للمنشآت الصغيرة والمتوسطة', date: '14/06/2025' },
  { id: 2, category: 'تعاميم', categoryColor: '#0a7a42', title: 'قرار مجلس الوزراء رقم 812 المتعلق بتنظيم عمل شركات التأمين', date: '10/06/2025' },
  { id: 3, category: 'تأمين', categoryColor: '#9d3c10', title: 'تعليمات هيئة الإشراف على التأمين بشأن متطلبات الملاءة المالية', date: '05/06/2025' },
  { id: 4, category: 'مصارف', categoryColor: '#c9a227', title: 'تعميم رقم 11/2025 بشأن ضوابط التعامل بالعملات الأجنبية', date: '01/06/2025' },
]

const opinionPieces = [
  { id: 1, image: '/images/ad1.png', author: 'د. رامي سلطان', title: 'مستقبل التمويل الإسلامي في السوق السورية', date: '15 يونيو 2025' },
  { id: 2, image: '/images/ad2.png', author: 'سمر النجار', title: 'التأمين الزراعي: فرص وتحديات في مرحلة إعادة الإعمار', date: '12 يونيو 2025' },
]

export default function HomePage() {
  // Fetch latest 6 news articles for the grid (skip the first one which is the hero)
  const latestNews = getLatestNews(6)
  // NewsGrid shows articles 2-6 on the home page (hero shows #1)
  const gridArticles = latestNews.slice(1)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f0f4f8', direction: 'rtl' }}>
      <Navbar />
      <NewsTicker />

      {/* ── Hero Slider ──────────────────────────────────────────────────────── */}
      <AdBillboard />

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">

        <div className="flex gap-5">

          {/* ── Left portrait ad column (desktop only) ───────────────────────── */}
          <aside
            className="hidden xl:flex flex-col gap-5 shrink-0"
            style={{ width: '160px' }}
            aria-label="إعلانات جانبية يسرى"
          >
            <div className="sticky top-[80px] flex flex-col gap-5">
              <AdSlot image="/images/ad1.png" alt="إعلان شخصي 1" label="إعلان" portrait />
              <AdSlot image="/images/ad2.png" alt="إعلان شخصي 2" label="إعلان" portrait />
            </div>
          </aside>

          {/* ── Center column ────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            {/* Hero feature — shows latest article */}
            <HeroCard />

            {/* Latest news grid — shows next 5 articles */}
            <NewsGrid articles={gridArticles} />

            {/* Mid-page horizontal ad */}
            <AdSlot image="/images/ad3.png" alt="إعلان أفقي" label="مساحة إعلانية" />

            {/* Quick reads: decrees & regulations */}
            <section aria-label="أحدث القرارات والتعاميم">
              <SectionHeading
                icon={<FileText size={18} />}
                title="أحدث القرارات والتعاميم"
                viewAllHref="#"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickReads.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className="flex items-start gap-3 p-4 rounded-xl group transition-all hover:-translate-y-0.5"
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cfd8e6',
                      boxShadow: '0 1px 6px rgba(10,22,40,0.05)',
                    }}
                  >
                    <FileText size={16} className="shrink-0 mt-0.5" style={{ color: '#c9a227' }} aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className="text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: `${item.categoryColor}18`,
                            color: item.categoryColor,
                            border: `1px solid ${item.categoryColor}35`,
                          }}
                        >
                          {item.category}
                        </span>
                        <time className="text-xs" style={{ color: '#8a9bb8' }}>{item.date}</time>
                      </div>
                      <p
                        className="text-xs font-semibold leading-relaxed line-clamp-2 group-hover:text-[#0a1628] text-pretty"
                        style={{ color: '#1e3a5f' }}
                      >
                        {item.title}
                      </p>
                    </div>
                    <ChevronLeft size={13} className="shrink-0 mt-1 opacity-25 group-hover:opacity-70 transition-opacity" style={{ color: '#c9a227' }} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>

            {/* Opinion / contributors strip */}
            <section aria-label="آراء وتحليلات">
              <SectionHeading icon={<BookOpen size={18} />} title="آراء وتحليلات" viewAllHref="#" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {opinionPieces.map((p) => (
                  <a
                    key={p.id}
                    href="#"
                    className="flex items-center gap-4 p-4 rounded-xl group transition-all hover:-translate-y-0.5"
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cfd8e6',
                      boxShadow: '0 1px 6px rgba(10,22,40,0.05)',
                    }}
                  >
                    <div className="relative shrink-0 rounded-xl overflow-hidden" style={{ width: '64px', height: '80px' }}>
                      <Image src={p.image} alt={p.author} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold mb-1" style={{ color: '#c9a227' }}>{p.author}</p>
                      <p className="text-sm font-semibold leading-relaxed line-clamp-2 text-pretty group-hover:text-[#0a1628]" style={{ color: '#1e3a5f' }}>
                        {p.title}
                      </p>
                      <time className="text-xs mt-1 block" style={{ color: '#8a9bb8' }}>{p.date}</time>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Bottom ad pair */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <AdSlot image="/images/ad1.png" alt="مساحة إعلانية شخصية" label="مساحة إعلانية" portrait />
              <AdSlot image="/images/ad2.png" alt="مساحة إعلانية شخصية" label="مساحة إعلانية" portrait />
            </div>

            {/* Trending section */}
            <section aria-label="الأكثر قراءة">
              <SectionHeading icon={<TrendingUp size={18} />} title="الأكثر قراءة" />
              <ol className="flex flex-col gap-2">
                {[
                  'مصرف سوريا المركزي يعتمد معايير بازل III بشكل كامل',
                  'الليرة السورية تُسجل تحسناً ملحوظاً مقابل العملات الأجنبية',
                  'شركات التأمين تُطلق منتجات جديدة لسوق المركبات الكهربائية',
                  'مؤتمر دمشق للمصارف يوصي بتبني استراتيجية للتحول الرقمي',
                  'هيئة الإشراف على التأمين تُعلن حزمة إصلاحات تنظيمية شاملة',
                ].map((title, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="flex items-center gap-4 p-3.5 rounded-xl group transition-all hover:-translate-y-0.5"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cfd8e6',
                        boxShadow: '0 1px 4px rgba(10,22,40,0.04)',
                      }}
                    >
                      <span
                        className="text-xl font-black shrink-0 w-8 text-center"
                        style={{ color: i === 0 ? '#c9a227' : '#cfd8e6' }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <p
                        className="text-sm font-medium leading-relaxed line-clamp-1 flex-1 group-hover:text-[#0a1628] text-pretty"
                        style={{ color: '#1e3a5f' }}
                      >
                        {title}
                      </p>
                      <ChevronLeft size={13} className="shrink-0 opacity-25 group-hover:opacity-70 transition-opacity" style={{ color: '#c9a227' }} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* ── Right sidebar ─────────────────────────────────────────────────── */}
          <aside className="hidden lg:block w-[300px] xl:w-[320px] shrink-0" aria-label="الشريط الجانبي">
            <div className="sticky top-[80px]">
              <Sidebar />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
