import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const columns = [
  {
    title: 'أقسام المجلة',
    links: [
      { label: 'الأخبار المصرفية', href: '/news' },
      { label: 'أخبار التأمين', href: '/news' },
      { label: 'الأسواق المالية', href: '/news' },
      { label: 'التقنية المالية', href: '/news' },
      { label: 'المؤتمرات والفعاليات', href: '/news' },
    ],
  },
  {
    title: 'خدمات المجلة',
    links: [
      { label: 'الإعلان معنا', href: '#' },
      { label: 'إرسال خبر أو مقال', href: '#' },
      { label: 'النشرة الإخبارية', href: '#' },
      { label: 'أرشيف الإصدارات', href: '#' },
      { label: 'خريطة الموقع', href: '#' },
    ],
  },
  {
    title: 'روابط مهمة',
    links: [
      { label: 'مصرف سوريا المركزي', href: '#' },
      { label: 'هيئة الأوراق المالية', href: '#' },
      { label: 'اتحاد المصارف العربية', href: '#' },
      { label: 'هيئة الإشراف على التأمين', href: '#' },
      { label: 'مجلس الوزراء السوري', href: '#' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#060e1a' }} role="contentinfo">
      {/* Gold accent line */}
      <div
        className="w-full"
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, #a07d18 15%, #c9a227 50%, #a07d18 85%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Logo — clean, no box, no border */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="الرئيسية">
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src="/logo.png"
                  alt="مجلة المصارف والتأمين"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <p
                  className="text-xs tracking-widest"
                  style={{ color: 'rgba(201,162,39,0.6)', letterSpacing: '0.13em' }}
                >
                  مجلة متخصصة
                </p>
                <p className="font-bold text-xl text-white leading-tight">المصارف والتأمين</p>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.42)', maxWidth: '340px' }}
            >
              مجلة متخصصة في شؤون القطاع المصرفي والمالي وشركات التأمين في سوريا والعالم العربي، تُصدر دورياً وتُعدّ مرجعاً موثوقاً للمهنيين والمتخصصين الماليين.
            </p>

            {/* Director info */}
            <div
              className="flex flex-col gap-1 p-4 rounded-xl self-start"
              style={{
                background: 'rgba(201,162,39,0.06)',
                border: '1px solid rgba(201,162,39,0.15)',
              }}
            >
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>المدير العام</p>
              <p className="text-base font-bold text-white">خالد قطيش</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                القطاع المصرفي · التأمين · الاقتصاد
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/963966906262"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group/contact"
                aria-label="تواصل عبر واتساب"
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-transform group-hover/contact:scale-110"
                  style={{ background: '#25d366', color: '#fff' }}
                >
                  <WhatsAppIcon />
                </span>
                <span
                  className="text-sm transition-colors group-hover/contact:text-white"
                  style={{ color: 'rgba(255,255,255,0.55)', direction: 'ltr' }}
                >
                  +963 966 906 262
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                  style={{ background: 'rgba(201,162,39,0.1)', color: '#c9a227' }}
                >
                  <MapPin size={15} aria-hidden="true" />
                </span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  دمشق — الجمهورية العربية السورية
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                  style={{ background: 'rgba(201,162,39,0.1)', color: '#c9a227' }}
                >
                  <Mail size={15} aria-hidden="true" />
                </span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  info@banksinsurancemag.com
                </span>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3
                className="text-sm font-bold pb-2"
                style={{
                  color: '#c9a227',
                  borderBottom: '1px solid rgba(201,162,39,0.2)',
                }}
              >
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm group transition-colors"
                      style={{ color: 'rgba(255,255,255,0.42)' }}
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0 transition-all group-hover:w-2"
                        style={{ background: 'rgba(201,162,39,0.5)' }}
                        aria-hidden="true"
                      />
                      <span className="group-hover:text-white transition-colors">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mt-10 mb-6 h-px"
          style={{ background: 'rgba(201,162,39,0.1)' }}
          aria-hidden="true"
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            &copy; {year} مجلة المصارف والتأمين — جميع الحقوق محفوظة
          </p>

          {/* Social + legal */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/banksinsurancemag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-110"
              style={{ background: '#1877f2', color: '#fff' }}
              aria-label="فيسبوك"
            >
              <FacebookIcon />
              فيسبوك
            </a>

            {/* WhatsApp channel */}
            <a
              href="https://wa.me/963966906262"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-110"
              style={{ background: '#25d366', color: '#fff' }}
              aria-label="واتساب"
            >
              <WhatsAppIcon />
              واتساب
            </a>

            {/* Legal links */}
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {['سياسة الخصوصية', 'شروط الاستخدام'].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-2">
                  <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                  {i < arr.length - 1 && (
                    <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.15)' }} aria-hidden="true" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
