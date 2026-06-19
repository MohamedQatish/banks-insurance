import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Clock, User, BookOpen, Home, Newspaper, Share2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import NewsTicker from '@/components/news-ticker'
import Footer from '@/components/footer'
import {
  getAllNews,
  getNewsBySlug,
  getNewsByCategory,
  formatDate,
  readingTime,
} from '@/lib/news'

// ── Static params for SSG ──────────────────────────────────────────────────────
export async function generateStaticParams() {
  const all = getAllNews()
  return all.map((n) => ({ slug: n.slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | مجلة المصارف والتأمين`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

// ── Share button (client) ─────────────────────────────────────────────────────
import ShareButtons from '@/components/share-buttons'

// ── Markdown renderer ─────────────────────────────────────────────────────────
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="text-xl font-bold mt-8 mb-4 text-balance"
          style={{ color: 'var(--foreground)', borderRight: '4px solid var(--accent)', paddingRight: '12px' }}
        >
          {line.slice(3)}
        </h2>
      )
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="text-lg font-bold mt-6 mb-3"
          style={{ color: 'var(--card-foreground)' }}
        >
          {line.slice(4)}
        </h3>
      )
      continue
    }

    // Unordered list item
    if (line.startsWith('- ')) {
      const textContent = line.slice(2)
      elements.push(
        <li
          key={key++}
          className="flex items-start gap-2 text-sm leading-relaxed mb-2"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <span
            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: 'var(--accent)' }}
            aria-hidden="true"
          />
          <span dangerouslySetInnerHTML={{ __html: renderInline(textContent) }} />
        </li>
      )
      continue
    }

    // Blank line
    if (line.trim() === '') {
      continue
    }

    // Paragraph
    elements.push(
      <p
        key={key++}
        className="text-sm leading-loose mb-4 text-pretty"
        style={{ color: 'var(--muted-foreground)' }}
        dangerouslySetInnerHTML={{ __html: renderInline(line) }}
      />
    )
  }

  return (
    <div className="prose-custom" style={{ direction: 'rtl' }}>
      {elements}
    </div>
  )
}

/** Render inline Markdown: **bold** */
function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--foreground);font-weight:700">$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getNewsBySlug(slug)
  if (!article) notFound()

  const related = getNewsByCategory(article.category)
    .filter((n) => n.slug !== article.slug)
    .slice(0, 3)

  const minutes = readingTime(article.content)
  const pageUrl = `https://banks-insurance.vercel.app/news/${article.slug}`

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', direction: 'rtl' }}>
      <Navbar />
      <NewsTicker />

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav
        className="w-full max-w-7xl mx-auto px-4 md:px-8 py-3"
        aria-label="مسار التنقل"
      >
        <ol className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'var(--muted-foreground)' }}>
          <li>
            <Link href="/" className="flex items-center gap-1 hover:text-[#c9a227] transition-colors">
              <Home size={12} aria-hidden="true" />
              الرئيسية
            </Link>
          </li>
          <li aria-hidden="true"><ChevronLeft size={12} /></li>
          <li>
            <Link href="/news" className="flex items-center gap-1 hover:text-[#c9a227] transition-colors">
              <Newspaper size={12} aria-hidden="true" />
              الأخبار
            </Link>
          </li>
          <li aria-hidden="true"><ChevronLeft size={12} /></li>
          <li className="line-clamp-1 max-w-[200px]" style={{ color: 'var(--accent)' }} aria-current="page">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Article column ────────────────────────────────────────────── */}
          <article
            className="lg:col-span-2 rounded-2xl overflow-hidden"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: '0 4px 24px rgba(10,22,40,0.07)',
            }}
          >
            {/* Cover image */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4">
                <span
                  className="px-3 py-1.5 rounded text-xs font-bold"
                  style={{ background: article.categoryColor, color: '#fff' }}
                >
                  {article.category}
                </span>
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 50%)' }}
                aria-hidden="true"
              />
            </div>

            {/* Article body */}
            <div className="p-6 md:p-8">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mb-5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} aria-hidden="true" />
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={13} aria-hidden="true" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} aria-hidden="true" />
                  وقت القراءة: {minutes} {minutes === 1 ? 'دقيقة' : 'دقائق'}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-2xl md:text-3xl font-black leading-relaxed mb-6 text-balance"
                style={{ color: 'var(--foreground)' }}
              >
                {article.title}
              </h1>

              {/* Lead / excerpt */}
              <p
                className="text-base leading-loose font-medium mb-8 p-4 rounded-xl text-pretty"
                style={{
                  color: 'var(--card-foreground)',
                  background: 'rgba(201,162,39,0.06)',
                  border: '1px solid rgba(201,162,39,0.2)',
                  borderRight: '4px solid var(--accent)',
                }}
              >
                {article.excerpt}
              </p>

              {/* ── Body ── */}
              <MarkdownContent content={article.content} />

              {/* ── إعلان منتصف المقال (بعد 40% من المحتوى) ── */}
              {article.content.split('\n\n').length > 2 && (
                <div className="my-6">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-xl overflow-hidden group"
                    style={{
                      border: "1px solid rgba(201,162,39,0.2)",
                      boxShadow: "0 2px 12px rgba(10,22,40,0.08)",
                    }}
                  >
                    <div className="relative w-full" style={{ aspectRatio: "3/1" }}>
                      <Image
                        src="/images/ad-article.png"
                        alt="إعلان"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </a>
                </div>
              )}

              {/* Share row */}
              <div
                className="mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <span className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                  <Share2 size={16} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  مشاركة الخبر
                </span>
                <ShareButtons url={pageUrl} title={article.title} />
              </div>
            </div>
          </article>

          {/* ── Sidebar: related news ────────────────────────────────────── */}
          <aside aria-label="أخبار ذات صلة">
            <div className="sticky top-[80px] flex flex-col gap-6">
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
                }}
              >
                <h2
                  className="text-base font-bold mb-4 flex items-center gap-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  <span
                    className="inline-block w-1 h-5 rounded-sm"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden="true"
                  />
                  أخبار ذات صلة
                </h2>

                {related.length === 0 ? (
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>لا توجد أخبار ذات صلة حالياً.</p>
                ) : (
                  <div className="flex flex-col gap-5">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/news/${r.slug}`}
                        className="flex gap-3 group"
                      >
                        <div
                          className="relative shrink-0 rounded-lg overflow-hidden"
                          style={{ width: '80px', height: '60px' }}
                        >
                          <Image
                            src={r.image}
                            alt={r.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span
                            className="text-xs font-bold"
                            style={{ color: r.categoryColor }}
                          >
                            {r.category}
                          </span>
                          <h3
                            className="text-xs font-semibold leading-relaxed line-clamp-3 text-pretty group-hover:text-[#c9a227] transition-colors"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {r.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Back to news */}
              <Link
                href="/news"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: 'var(--primary)', color: 'var(--accent)', border: '1px solid rgba(201,162,39,0.3)' }}
              >
                <ChevronLeft size={16} aria-hidden="true" />
                العودة إلى الأخبار
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}