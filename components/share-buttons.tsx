'use client'

import { useState } from 'react'
import { Copy, Check, Share2 } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  const links = [
    {
      label: 'واتساب',
      abbr: 'WA',
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      bg: '#25d366',
    },
    {
      label: 'تويتر / X',
      abbr: 'X',
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      bg: '#000000',
    },
    {
      label: 'لينكد إن',
      abbr: 'in',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`,
      bg: '#0a66c2',
    },
    {
      label: 'فيسبوك',
      abbr: 'f',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      bg: '#1877f2',
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2" dir="rtl">
      <span className="flex items-center gap-1 text-sm font-medium text-foreground/70">
        <Share2 size={14} aria-hidden="true" />
        مشاركة:
      </span>

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`مشاركة عبر ${link.label}`}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold transition-opacity hover:opacity-80"
          style={{ background: link.bg }}
        >
          {link.abbr}
        </a>
      ))}

      <button
        onClick={handleCopy}
        aria-label={copied ? 'تم نسخ الرابط' : 'نسخ الرابط'}
        title={copied ? 'تم النسخ' : 'نسخ الرابط'}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border bg-background hover:bg-muted transition-colors text-foreground"
      >
        {copied
          ? <Check size={14} className="text-green-500" aria-hidden="true" />
          : <Copy size={14} aria-hidden="true" />
        }
      </button>
    </div>
  )
}
