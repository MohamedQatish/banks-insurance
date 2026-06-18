"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, ChevronLeft, Search, Filter } from "lucide-react";
import type { NewsItem } from "@/lib/news";

interface NewsPageClientProps {
  allArticles: NewsItem[];
  categories: { name: string; color: string }[];
}

export default function NewsPageClient({
  allArticles,
  categories,
}: NewsPageClientProps) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  // تأثير لمزامنة التصنيف القادم من الرابط (Query Parameter) فور تحميل الصفحة
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setActiveCategory(catParam);
    } else {
      setActiveCategory("الكل");
    }
  }, [searchParams]);

  const filtered = allArticles.filter((a) => {
    const matchCat = activeCategory === "الكل" || a.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      a.title.includes(searchQuery) ||
      a.excerpt.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        {/* Category tabs */}
        <div
          className="flex items-center gap-2 flex-wrap flex-1"
          role="tablist"
          aria-label="فلترة بالقسم"
        >
          <button
            role="tab"
            aria-selected={activeCategory === "الكل"}
            onClick={() => setActiveCategory("الكل")}
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: activeCategory === "الكل" ? "#c9a227" : "#ffffff",
              color: activeCategory === "الكل" ? "#060e1a" : "#5a6a85",
              border:
                activeCategory === "الكل"
                  ? "1px solid #c9a227"
                  : "1px solid #cfd8e6",
              boxShadow:
                activeCategory === "الكل"
                  ? "0 2px 8px rgba(201,162,39,0.3)"
                  : "none",
            }}
          >
            الكل
          </button>

          {/* عرض الأزرار الديناميكية القادمة من الملفات */}
          {categories.map((cat) => (
            <button
              key={cat.name}
              role="tab"
              aria-selected={activeCategory === cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: activeCategory === cat.name ? cat.color : "#ffffff",
                color: activeCategory === cat.name ? "#ffffff" : "#5a6a85",
                border:
                  activeCategory === cat.name
                    ? `1px solid ${cat.color}`
                    : "1px solid #cfd8e6",
                boxShadow:
                  activeCategory === cat.name
                    ? `0 2px 8px ${cat.color}44`
                    : "none",
              }}
            >
              {cat.name}
            </button>
          ))}

          {/* Fallback tabs: تظهر فقط إذا ضغط المستخدم عليها من القائمة ولم يكن هناك مقالات منشورة بعد في هذا التصنيف */}
          {!categories.some((c) => c.name === "قرارات") &&
            activeCategory === "قرارات" && (
              <button
                role="tab"
                aria-selected={true}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: "#c9a227",
                  color: "#060e1a",
                  border: "1px solid #c9a227",
                }}
              >
                قرارات وتعاميم
              </button>
            )}
        </div>

        {/* Search */}
        <div className="relative sm:w-56" style={{ direction: "rtl" }}>
          <Search
            size={15}
            className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
            style={{ color: "#8a9bb8" }}
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="ابحث في الأخبار..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-9 pl-3 py-2 text-sm rounded-xl outline-none"
            style={{
              background: "#ffffff",
              border: "1px solid #cfd8e6",
              color: "#0a1628",
            }}
            aria-label="بحث في الأخبار"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24" style={{ color: "#8a9bb8" }}>
          <Filter
            size={40}
            className="mx-auto mb-3 opacity-30"
            aria-hidden="true"
          />
          <p className="text-lg font-semibold">
            لا توجد قرارات أو تعاميم منشورة حالياً
          </p>
          <p className="text-sm mt-1">
            المحتوى الخاص بهذا القسم قيد التجهيز وسيظهر هنا فور نشره
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Featured article */}
          {featured && (
            <article
              className="rounded-2xl overflow-hidden flex flex-col md:flex-row group transition-all hover:-translate-y-1"
              style={{
                background: "#ffffff",
                border: "1px solid #cfd8e6",
                boxShadow: "0 4px 20px rgba(10,22,40,0.08)",
              }}
              aria-label="الخبر المميز"
            >
              <div
                className="relative md:w-2/5 shrink-0 overflow-hidden"
                style={{ minHeight: "220px" }}
              >
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
                    style={{
                      background: featured.categoryColor,
                      color: "#fff",
                    }}
                  >
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span
                  className="flex items-center gap-1.5 text-xs mb-3"
                  style={{ color: "#8a9bb8" }}
                >
                  <Clock size={12} aria-hidden="true" />
                  <time dateTime={featured.date}>
                    {new Date(featured.date).toLocaleDateString("ar-SY", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>
                <h2
                  className="text-xl md:text-2xl font-bold leading-relaxed mb-3 text-balance"
                  style={{ color: "#0a1628" }}
                >
                  {featured.title}
                </h2>
                <p
                  className="text-sm leading-relaxed line-clamp-3 mb-4"
                  style={{ color: "#5a6a85" }}
                >
                  {featured.excerpt}
                </p>
                <Link
                  href={`/news/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "#c9a227" }}
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
                key={article.slug}
                className="rounded-xl overflow-hidden flex flex-col news-card group"
                style={{
                  background: "#ffffff",
                  border: "1px solid #cfd8e6",
                  boxShadow: "0 2px 8px rgba(10,22,40,0.05)",
                }}
              >
                <div
                  className="relative overflow-hidden shrink-0"
                  style={{ aspectRatio: "16/9" }}
                >
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
                    style={{ color: "#8a9bb8" }}
                  >
                    <Clock size={11} aria-hidden="true" />
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("ar-SY", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                  <h3
                    className="font-bold text-sm leading-relaxed line-clamp-2 flex-1 text-pretty"
                    style={{ color: "#0a1628" }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed line-clamp-2 mt-2"
                    style={{ color: "#5a6a85" }}
                  >
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-0.5 mt-3 text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "#c9a227" }}
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
    </>
  );
}
