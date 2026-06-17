'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChevronLeft, Search, Filter } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import NewsTicker from '@/components/news-ticker'

const categories = ['الكل', 'مصارف', 'تأمين', 'أسواق مالية', 'تقنية مالية', 'مؤتمرات', 'استثمار', 'قرارات']

const allArticles = [
  { id: 1, image: '/images/news-1.png', category: 'مصارف', categoryColor: '#1a56db', time: 'منذ ساعتين', title: 'مصارف خاصة تُطلق خدمات التحويل الفوري عبر المنصات الرقمية', excerpt: 'أعلنت مجموعة من المصارف الخاصة السورية عن إطلاق خدمة التحويل الفوري للأموال عبر تطبيقات الهاتف الذكي في إطار خطتها لتحقيق التحول الرقمي الشامل.' },
  { id: 2, image: '/images/news-2.png', category: 'تأمين', categoryColor: '#0a7a42', time: 'منذ 4 ساعات', title: 'شركات التأمين تُناقش تطوير منتجات التأمين الزراعي في سوريا', excerpt: 'عقد اتحاد شركات التأمين السورية اجتماعاً موسعاً ناقش خلاله آليات تطوير منتجات التأمين الزراعي وتوسيع نطاق التغطية لشريحة أوسع من المزارعين.' },
  { id: 3, image: '/images/news-3.png', category: 'أسواق مالية', categoryColor: '#9d3c10', time: 'منذ 6 ساعات', title: 'استقرار نسبي في أسواق المال السورية وسط تحسن في منسوب الثقة', excerpt: 'شهدت الأسواق المالية السورية استقراراً نسبياً مع تسجيل حركة تداول إيجابية وانعكاسات مشجعة على مستوى الثقة لدى المستثمرين.' },
  { id: 4, image: '/images/news-4.png', category: 'تقنية مالية', categoryColor: '#6b21a8', time: 'منذ 8 ساعات', title: 'التحول الرقمي في القطاع المصرفي السوري يُحقق قفزات نوعية', excerpt: 'كشف تقرير حديث صادر عن اتحاد المصارف العربية أن القطاع المصرفي السوري حقق تقدماً لافتاً في مجال التحول الرقمي خلال الأشهر الماضية.' },
  { id: 5, image: '/images/news-5.png', category: 'مؤتمرات', categoryColor: '#0369a1', time: 'منذ 10 ساعات', title: 'انطلاق فعاليات قمة المصارف العربية في دمشق بمشاركة دولية واسعة', excerpt: 'انطلقت في العاصمة دمشق فعاليات القمة السنوية للمصارف العربية بمشاركة وفود من أكثر من عشرين دولة عربية وأجنبية.' },
  { id: 6, image: '/images/news-6.png', category: 'استثمار', categoryColor: '#b45309', time: 'منذ أمس', title: 'الذهب يستقر عند مستويات مرتفعة وسط مخاوف اقتصادية دولية', excerpt: 'يواصل الذهب تحليقه عند مستويات مرتفعة وسط تنامي الطلب على الملاذات الآمنة في ظل الضبابية الاقتصادية التي تسود الأسواق الدولية.' },
  { id: 7, image: '/images/hero-banking.png', category: 'مصارف', categoryColor: '#1a56db', time: 'منذ يومين', title: 'البنك المركزي السوري يُعلن عن حزمة إصلاحات شاملة لتطوير البنية التحتية للقطاع المصرفي', excerpt: 'أعلن مصرف سوريا المركزي عن إطلاق حزمة إصلاحات تشريعية وتنظيمية شاملة تهدف إلى تحديث البنية التحتية للقطاع المصرفي وتعزيز الاستقرار المالي.' },
  { id: 8, image: '/images/slide-2.png', category: 'مؤتمرات', categoryColor: '#0369a1', time: 'منذ 3 أيام', title: 'ملتقى التأمين العربي يختتم أعماله بتوصيات تنظيمية متقدمة', excerpt: 'اختتم ملتقى التأمين العربي الدولي أعماله بإصدار توصيات شاملة تتضمن مقترحات تنظيمية وتشريعية لتطوير قطاع التأمين في المنطقة العربية.' },
  { id: 9, image: '/images/slide-3.png', category: 'تأمين', categoryColor: '#0a7a42', time: 'منذ أسبوع', title: 'إطلاق منصة إلكترونية متكاملة لتسهيل المطالبات التأمينية', excerpt: 'أطلقت شركة التأمين السورية الموحدة منصة إلكترونية جديدة تتيح للمؤمَّن عليهم تقديم مطالباتهم ومتابعتها بشكل كامل عبر الإنترنت.' },
  { id: 10, image: '/images/slide-1.png', category: 'أسواق مالية', categoryColor: '#9d3c10', time: 'منذ أسبوع', title: 'سوق دمشق للأوراق المالية يُعلن عن تطوير منصة التداول الإلكتروني', excerpt: 'أعلنت إدارة سوق دمشق للأوراق المالية عن خطة تطوير شاملة لمنصة التداول الإلكترونية بهدف تعزيز الشفافية وجذب مزيد من المستثمرين.' },
  { id: 11, image: '/images/news-1.png', category: 'قرارات', categoryColor: '#c9a227', time: 'منذ أسبوعين', title: 'تعميم جديد لمصرف سوريا المركزي بشأن تحديث أنظمة مكافحة غسل الأموال', excerpt: 'أصدر مصرف سوريا المركزي تعميماً جديداً يُلزم المصارف العاملة بتحديث أنظمتها للامتثال لأحدث المعايير الدولية في مكافحة غسل الأموال.' },
  { id: 12, image: '/images/news-2.png', category: 'استثمار', categoryColor: '#b45309', time: 'منذ أسبوعين', title: 'صندوق سيادي جديد لدعم قطاع الإسكان في مرحلة إعادة الإعمار السورية', excerpt: 'كشفت مصادر حكومية سورية عن خطط لإنشاء صندوق سيادي مخصص لدعم قطاع الإسكان وتمويل مشاريع إعادة الإعمار بشروط ميسّرة.' },
]

export default function NewsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = allArticles.filter((a) => {
    const matchCat = activeCategory === 'الكل' || a.category === activeCategory
    const matchSearch = searchQuery === '' || a.title.includes(searchQuery) || a.excerpt.includes(searchQuery)
    return matchCat && matchSearch
  })

  const [featured, ...rest] = filtered

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f0f4f8', direction: 'rtl' }}>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <NewsTicker />

      {/* Page header */}
      <div
        className="w-full"
        style={{ background: 'linear-gradient(180deg, #060e1a 0%, #0a1628 100%)', borderBottom: '2px solid #c9a227' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">جميع الأخبار</h1>
          <p className="text-sm" style={{ color: 'rgba(201,162,39,0.7)' }}>
            آخر المستجدات في القطاع المصرفي والمالي وشركات التأمين
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          {/* Category tabs */}
          <div
            className="flex items-center gap-2 flex-wrap flex-1"
            role="tablist"
            aria-label="فلترة بالقسم"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeCategory === cat ? '#c9a227' : '#ffffff',
                  color: activeCategory === cat ? '#060e1a' : '#5a6a85',
                  border: activeCategory === cat ? '1px solid #c9a227' : '1px solid #cfd8e6',
                  boxShadow: activeCategory === cat ? '0 2px 8px rgba(201,162,39,0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div
            className="relative sm:w-56"
            style={{ direction: 'rtl' }}
          >
            <Search
              size={15}
              className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
              style={{ color: '#8a9bb8' }}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="ابحث في الأخبار..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2 text-sm rounded-xl outline-none"
              style={{
                background: '#ffffff',
                border: '1px solid #cfd8e6',
                color: '#0a1628',
              }}
              aria-label="بحث في الأخبار"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: '#8a9bb8' }}>
            <Filter size={40} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p className="text-lg font-semibold">لا توجد نتائج</p>
            <p className="text-sm mt-1">جرّب تغيير الفلتر أو كلمة البحث</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Featured article */}
            {featured && (
              <article
                className="rounded-2xl overflow-hidden flex flex-col md:flex-row group transition-all hover:-translate-y-1"
                style={{
                  background: '#ffffff',
                  border: '1px solid #cfd8e6',
                  boxShadow: '0 4px 20px rgba(10,22,40,0.08)',
                }}
                aria-label="الخبر المميز"
              >
                <div className="relative md:w-2/5 shrink-0 overflow-hidden" style={{ minHeight: '220px' }}>
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded"
                      style={{ background: featured.categoryColor, color: '#fff' }}
                    >
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <span
                    className="flex items-center gap-1.5 text-xs mb-3"
                    style={{ color: '#8a9bb8' }}
                  >
                    <Clock size={12} aria-hidden="true" />
                    <time>{featured.time}</time>
                  </span>
                  <h2
                    className="text-xl md:text-2xl font-bold leading-relaxed mb-3 text-balance"
                    style={{ color: '#0a1628' }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: '#5a6a85' }}>
                    {featured.excerpt}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: '#c9a227' }}
                  >
                    اقرأ المزيد
                    <ChevronLeft size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            )}

            {/* Rest of articles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((article) => (
                <article
                  key={article.id}
                  className="rounded-xl overflow-hidden flex flex-col news-card group"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cfd8e6',
                    boxShadow: '0 2px 8px rgba(10,22,40,0.05)',
                  }}
                >
                  <div className="relative overflow-hidden shrink-0" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover news-card-img"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className="text-xs font-bold px-2.5 py-0.5 rounded"
                        style={{
                          background: `${article.categoryColor}22`,
                          color: article.categoryColor,
                          border: `1px solid ${article.categoryColor}45`,
                        }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span
                      className="flex items-center gap-1 text-xs mb-2"
                      style={{ color: '#8a9bb8' }}
                    >
                      <Clock size={11} aria-hidden="true" />
                      <time>{article.time}</time>
                    </span>
                    <h3
                      className="font-bold text-sm leading-relaxed line-clamp-2 flex-1 text-pretty"
                      style={{ color: '#0a1628' }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed line-clamp-2 mt-2"
                      style={{ color: '#5a6a85' }}
                    >
                      {article.excerpt}
                    </p>
                    <Link
                      href="#"
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
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
