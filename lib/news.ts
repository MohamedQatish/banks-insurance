import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface NewsItem {
  slug: string
  title: string
  date: string
  category: string
  categoryColor: string
  excerpt: string
  image: string
  author: string
  content: string
  weight?: number // حقل اختياري للتحكم بالترتيب (الأعلى يظهر أولاً)
}

const newsDirectory = path.join(process.cwd(), 'content', 'news')

function getNewsFiles(): string[] {
  if (!fs.existsSync(newsDirectory)) return []
  return fs.readdirSync(newsDirectory).filter((f) => f.endsWith('.md'))
}

function parseNewsFile(fileName: string): NewsItem | null {
  try {
    const filePath = path.join(newsDirectory, fileName)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // الـ slug الافتراضي هو اسم الملف بدون الامتداد، وإذا وجد حقل slug بالداخل نستخدمه كـ fallback
    const fileSlug = fileName.replace(/\.md$/, '')

    return {
      slug: (data.slug as string) || fileSlug,
      title: data.title as string,
      date: data.date as string,
      category: data.category as string,
      categoryColor: data.categoryColor as string,
      excerpt: data.excerpt as string,
      image: data.image as string,
      author: data.author as string,
      weight: data.weight ? Number(data.weight) : 0, // قراءة الوزن الرقمي
      content,
    }
  } catch {
    return null
  }
}

/** All news articles sorted by weight descending, then by date descending */
export function getAllNews(): NewsItem[] {
  const files = getNewsFiles()
  const items = files
    .map((f) => parseNewsFile(f))
    .filter((item): item is NewsItem => item !== null)

  return items.sort((a, b) => {
    // 1. الترتيب حسب الأولوية (weight) أولاً
    if ((b.weight || 0) !== (a.weight || 0)) {
      return (b.weight || 0) - (a.weight || 0)
    }
    // 2. إذا تساوت الأولوية، يتم الترتيب حسب التاريخ الأحدث
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/** Single article by slug - بـأداء فوري مباشر دون مروق على كل الملفات */
export function getNewsBySlug(slug: string): NewsItem | null {
  try {
    // محاولة قراءة الملف مباشرة بناءً على اسمه الإنجليزي (الـ slug)
    const fileName = slug.endsWith('.md') ? slug : `${slug}.md`
    const filePath = path.join(newsDirectory, fileName)
    
    if (fs.existsSync(filePath)) {
      return parseNewsFile(fileName)
    }
    
    // Fallback في حال لم يتطابق اسم الملف مع الـ slug (لضمان عدم كسر التوافقية)
    const files = getNewsFiles()
    for (const file of files) {
      const item = parseNewsFile(file)
      if (item && item.slug === slug) return item
    }
    return null
  } catch {
    return null
  }
}

/** Latest N articles */
export function getLatestNews(limit: number): NewsItem[] {
  return getAllNews().slice(0, limit)
}

/** Articles in a given category */
export function getNewsByCategory(category: string): NewsItem[] {
  return getAllNews().filter((item) => item.category === category)
}

/** Unique categories with their colours */
export function getCategories(): { name: string; color: string }[] {
  const all = getAllNews()
  const seen = new Map<string, string>()
  for (const item of all) {
    if (!seen.has(item.category)) {
      seen.set(item.category, item.categoryColor)
    }
  }
  return Array.from(seen.entries()).map(([name, color]) => ({ name, color }))
}

/** Estimated reading time in minutes */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

/** Format an ISO date string to Arabic locale */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ar-SY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Relative time label (Arabic) */
export function relativeTime(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffHours < 1) return 'منذ أقل من ساعة'
  if (diffHours < 24) return `منذ ${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'منذ أمس'
  if (diffDays < 7) return `منذ ${diffDays} أيام`
  const diffWeeks = Math.floor(diffDays / 7)
  if (diffWeeks === 1) return 'منذ أسبوع'
  if (diffWeeks < 4) return `منذ ${diffWeeks} أسابيع`
  return formatDate(dateStr)
}