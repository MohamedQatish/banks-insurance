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

    return {
      slug: data.slug as string,
      title: data.title as string,
      date: data.date as string,
      category: data.category as string,
      categoryColor: data.categoryColor as string,
      excerpt: data.excerpt as string,
      image: data.image as string,
      author: data.author as string,
      content,
    }
  } catch {
    return null
  }
}

/** All news articles sorted by date descending (newest first) */
export function getAllNews(): NewsItem[] {
  const files = getNewsFiles()
  const items = files
    .map((f) => parseNewsFile(f))
    .filter((item): item is NewsItem => item !== null)

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/** Single article by slug */
export function getNewsBySlug(slug: string): NewsItem | null {
  const files = getNewsFiles()
  for (const file of files) {
    const item = parseNewsFile(file)
    if (item && item.slug === slug) return item
  }
  return null
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
