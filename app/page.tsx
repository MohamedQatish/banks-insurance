import Image from "next/image";
import Link from "next/link";
import { FileText, ChevronLeft, TrendingUp, BookOpen } from "lucide-react";
import Navbar from "@/components/navbar";
import NewsTicker from "@/components/news-ticker";
import AdBillboard from "@/components/ad-billboard";
import HeroCard from "@/components/hero-card";
import NewsGrid from "@/components/news-grid";
import Sidebar, { decrees } from "@/components/sidebar";
import Footer from "@/components/footer";
import { getLatestNews } from "@/lib/news";

function AdSlot({
  image,
  alt,
  label = "مساحة إعلانية",
  href = "#",
  portrait = false,
}: {
  image: string;
  alt: string;
  label?: string;
  href?: string;
  portrait?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-xl overflow-hidden group"
      style={{
        border: "1px solid rgba(201,162,39,0.2)",
        boxShadow: "0 2px 12px rgba(10,22,40,0.08)",
      }}
      aria-label={label}
    >
      <div
        style={{ aspectRatio: portrait ? "3/4" : "3/1" }}
        className="relative"
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: portrait
              ? "linear-gradient(to top, rgba(6,14,26,0.65) 0%, transparent 45%)"
              : "linear-gradient(to left, rgba(6,14,26,0.55) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
      </div>
    </a>
  );
}

function SectionHeading({
  icon,
  title,
  viewAllHref,
}: {
  icon: React.ReactNode;
  title: string;
  viewAllHref?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2
        className="flex items-center gap-2 text-lg font-bold"
        style={{ color: "var(--foreground)" }}
      >
        <span style={{ color: "var(--accent)" }} aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          عرض الكل
          <ChevronLeft size={14} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

// مصفوفة الآراء والتحليلات المحدثة بالأيقونات الرمزية المحترفة
const opinionPieces = [
  {
    id: 1,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    author: "د. رامي سلطان",
    title: "مستقبل التمويل الإسلامي في السوق السورية",
    date: "15 يونيو 2026",
  },
  {
    id: 2,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
    author: "سمر النجار",
    title: "التأمين الزراعي: فرص وتحديات في مرحلة إعادة الإعمار",
    date: "12 يونيو 2026",
  },
];

export default function HomePage() {
  const latestNews = getLatestNews(6);
  const gridArticles = latestNews.slice(1);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--background)", direction: "rtl" }}
    >
      <Navbar />
      <NewsTicker />
      <AdBillboard />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex gap-5">
          <aside
            className="hidden xl:flex flex-col gap-5 shrink-0"
            style={{ width: "160px" }}
            aria-label="إعلانات جانبية يسرى"
          >
            <div className="sticky top-[80px] flex flex-col gap-5">
              <AdSlot
                image="/images/ad1.png"
                alt="إعلان شخصي 1"
                label="إعلان"
                portrait
              />
              <AdSlot
                image="/images/ad2.png"
                alt="إعلان شخصي 2"
                label="إعلان"
                portrait
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <HeroCard />
            <NewsGrid articles={gridArticles} />

            <section aria-label="أحدث القرارات والتعاميم">
              <SectionHeading
                icon={<FileText size={18} />}
                title="أحدث القرارات والتعاميم"
                viewAllHref="/news?category=قرارات"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {decrees.map((item) => (
                  <Link
                    key={item.id}
                    href="/news?category=قرارات"
                    className="flex items-start gap-3 p-4 rounded-xl group transition-all hover:-translate-y-0.5"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      boxShadow: "0 1px 6px rgba(10,22,40,0.05)",
                    }}
                  >
                    <FileText
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className="text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: `${item.sourceColor}12`,
                            color: item.sourceColor,
                            border: `1px solid ${item.sourceColor}35`,
                          }}
                        >
                          {item.source}
                        </span>
                        <time className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          {item.date}
                        </time>
                      </div>
                      <p
                        className="text-xs font-semibold leading-relaxed line-clamp-2 group-hover:text-[#0a1628] text-pretty"
                        style={{ color: "var(--card-foreground)" }}
                      >
                        {item.title}
                      </p>
                    </div>
                    <ChevronLeft
                      size={13}
                      className="shrink-0 mt-1 opacity-25 group-hover:opacity-70 transition-opacity"
                      style={{ color: "var(--accent)" }}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </section>

            <AdSlot
              image="/images/ad3.png"
              alt="إعلان أفقي"
              label="مساحة إعلانية"
            />

            {/* قسم آراء وتحليلات بعد التعديل والتوجيه المباشر لصفحة الأخبار */}
            <section aria-label="آراء وتحليلات">
              <SectionHeading
                icon={<BookOpen size={18} />}
                title="آراء وتحليلات"
                viewAllHref="/news"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {opinionPieces.map((p) => (
                  <Link
                    key={p.id}
                    href="/news"
                    className="flex items-center gap-4 p-4 rounded-xl group transition-all hover:-translate-y-0.5"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      boxShadow: "0 1px 6px rgba(10,22,40,0.05)",
                    }}
                  >
                    <div
                      className="relative shrink-0 rounded-xl overflow-hidden"
                      style={{ width: "64px", height: "80px" }}
                    >
                      <Image
                        src={p.image}
                        alt={p.author}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-bold mb-1"
                        style={{ color: "var(--accent)" }}
                      >
                        {p.author}
                      </p>
                      <p
                        className="text-sm font-semibold leading-relaxed line-clamp-2 text-pretty group-hover:text-[#0a1628]"
                        style={{ color: "var(--card-foreground)" }}
                      >
                        {p.title}
                      </p>
                      <time
                        className="text-xs mt-1 block"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {p.date}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <AdSlot
                image="/images/ad1.png"
                alt="مساحة إعلانية شخصية"
                label="مساحة إعلانية"
                portrait
              />
              <AdSlot
                image="/images/ad2.png"
                alt="مساحة إعلانية شخصية"
                label="مساحة إعلانية"
                portrait
              />
            </div>

            <section aria-label="الأكثر قراءة">
              <SectionHeading
                icon={<TrendingUp size={18} />}
                title="الأكثر قراءة"
              />
              <ol className="flex flex-col gap-2">
                {[
                  "المركزي السوري يمدد مهلة استبدال الليرة القديمة لـ 5 سنوات",
                  "استقرار سعر الصرف الرسمي لليرة الجديدة مقابل الدولار",
                  "تعديلات لمنح مرونة أكبر للمستفيدين من الحوالات الخارجية",
                  "سوريا توقع 21 عقداً دولياً لإعادة الإعمار ونظام ضريبي جديد",
                  "إعادة هيكلة قطاع التأمين وحل مجالس الاتحادات",
                ].map((title, i) => (
                  <li key={i}>
                    <div
                      className="flex items-center gap-4 p-3.5 rounded-xl"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        boxShadow: "0 1px 4px rgba(10,22,40,0.04)",
                        cursor: "default",
                      }}
                    >
                      <span
                        className="text-xl font-black shrink-0 w-8 text-center"
                        style={{ color: i === 0 ? "var(--accent)" : "var(--border)" }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <p
                        className="text-sm font-medium leading-relaxed line-clamp-1 flex-1"
                        style={{ color: "var(--card-foreground)" }}
                      >
                        {title}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside
            className="hidden lg:block w-[300px] xl:w-[320px] shrink-0"
            aria-label="الشريط الجانبي"
          >
            <div className="sticky top-[80px]">
              <Sidebar />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}