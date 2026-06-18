import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Building2, Target, Award, Users, ShieldCheck, Zap, BarChart3, Briefcase, Globe, Mail, MapPin } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]" style={{ direction: 'rtl' }}>
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-10">
        {/* شريط المسار */}
        <nav className="flex items-center gap-1 text-xs text-[#8a9bb8] mb-8" aria-label="المسار">
          <Link href="/" className="hover:text-[#0a1628] transition-colors">الرئيسية</Link>
          <ChevronLeft size={12} />
          <span className="text-[#1e3a5f] font-medium">عن المجلة</span>
        </nav>

        {/* الهيدر الرئيسي الاحترافي */}
        <header className="relative bg-[#0a1628] text-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-lg mb-10 border-b-4 border-[#c9a227]">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.03] to-transparent pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <span className="text-[#c9a227] text-xs font-bold tracking-wider uppercase bg-[#c9a227]/10 px-3 py-1 rounded-full border border-[#c9a227]/20">البروفايل الرسمي</span>
            <h1 className="text-3xl md:text-5xl font-black mt-4 mb-4 leading-tight">مجلة المصارف والتأمين</h1>
            <p className="text-sm md:text-lg text-slate-300 leading-relaxed font-light">
              المرجع الإعلامي والبحثي الأول المتخصص في شؤون القطاع المصرفي والمالي وشركات التأمين في سوريا والعالم العربي.
            </p>
          </div>
        </header>

        {/* شبكة المحتوى المتقدمة */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* العمود الأيمن العريض: الرؤية، الأهداف، والقيم */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* بطاقة الرؤية والرسالة */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="space-y-3">
                <h2 className="text-base font-bold flex items-center gap-2 text-[#c9a227]">
                  <Target size={18} />
                  رؤيتنا المستقبلية
                </h2>
                <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed">
                  أن نكون المنصة الرقمية والبحثية الأولى لصنّاع القرار والخبراء الماليين، عبر تقديم قراءات تحليلية رصينة وموثوقة تدعم استدامة واستقرار الاستثمار في المنطقة.
                </p>
              </section>

              <section className="space-y-3 md:border-r md:border-[#e2e8f0] md:pr-6">
                <h2 className="text-base font-bold flex items-center gap-2 text-[#c9a227]">
                  <Building2 size={18} />
                  رسالة المجلة
                </h2>
                <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed">
                  تمكين المجتمع المالي السوري والعربي وتعميق الثقافة المصرفية، من خلال تغطية ونشر التعاميم والتشريعات الصادرة عن الجهات الحكومية بدقة متناهية فور صدورها.
                </p>
              </section>
            </div>

            {/* شبكة القيم الجوهرية (3 كروت صغيرة) */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center space-y-2 border-t-4 border-[#0a1628]">
                <ShieldCheck size={32} className="text-[#0a1628] mx-auto" />
                <h3 className="text-sm font-bold text-[#0a1628]">المصداقية المطلقة</h3>
                <p className="text-[11px] text-[#64748b] leading-relaxed">الاعتماد الكامل على المستندات والوثائق الرسمية.</p>
              </div>
              <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center space-y-2 border-t-4 border-[#c9a227]">
                <Zap size={32} className="text-[#c9a227] mx-auto" />
                <h3 className="text-sm font-bold text-[#0a1628]">السرعة والمواكبة</h3>
                <p className="text-[11px] text-[#64748b] leading-relaxed">تغطية مباشرة للقرارات والتعاميم والفعاليات الاقتصادية.</p>
              </div>
              <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center space-y-2 border-t-4 border-[#0a1628]">
                <BarChart3 size={32} className="text-[#0a1628] mx-auto" />
                <h3 className="text-sm font-bold text-[#0a1628]">التحليل المعمق</h3>
                <p className="text-[11px] text-[#64748b] leading-relaxed">قراءة أبعاد وأثر القرارات على حركة السوق المحلي.</p>
              </div>
            </section>

            {/* الهيكل الإداري والتحريري */}
            <section className="bg-white rounded-2xl border border-[#e2e8f0] p-6 md:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-[#0a1628] flex items-center gap-2 border-b border-[#f1f5f9] pb-4">
                <Users size={20} className="text-[#c9a227]" />
                الهيئة الإدارية والتحريرية
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:border-[#c9a227] transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#0a1628] text-[#c9a227] flex items-center justify-center font-bold text-lg shadow-sm">
                    خ
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0a1628]">خالد قطيش</h3>
                    <p className="text-xs text-[#8a9bb8] mt-0.5">المدير العام ورئيس التحرير</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:border-[#0a1628] transition-all">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 text-[#0a1628] flex items-center justify-center font-bold text-lg shadow-sm">
                    هـ
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0a1628]">هيئة التحرير</h3>
                    <p className="text-xs text-[#8a9bb8] mt-0.5">نخبة من الأكاديميين والمستشارين</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* العمود الأيسر: بطاقة خدمات المجلة ومعلومات الاتصال الموثقة */}
          <div className="space-y-6">
            
            {/* بطاقة الخدمات الذكية */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-[#0a1628] flex items-center gap-2 pb-2 border-b border-[#f1f5f9]">
                <Briefcase size={16} className="text-[#c9a227]" />
                خدماتنا للمؤسسات المالية
              </h2>
              <ul className="space-y-3 text-xs text-[#1e3a5f]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full mt-1.5 shrink-0" />
                  <span>حلول إعلانية ذكية تستهدف صناع القرار الاقتصادي والمستثمرين.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full mt-1.5 shrink-0" />
                  <span>تغطية ورعاية إعلامية شاملة للمؤتمرات والمنتديات المصرفية.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full mt-1.5 shrink-0" />
                  <span>إعداد ونشر التقارير والدراسات التحليلية لأسواق المال والتأمين.</span>
                </li>
              </ul>
            </div>

            {/* بطاقة العناوين والاتصال السريع */}
            <div className="bg-[#0a1628] text-white rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-[#c9a227]">قنوات التواصل الرسمية</h2>
              
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#c9a227] shrink-0" />
                  <span>دمشق — الجمهورية العربية السورية</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#c9a227] shrink-0" />
                  <span className="lowercase">info@banksinsurancemag.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-[#c9a227] shrink-0" />
                  <span className="lowercase">www.banksinsurancemag.com</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* تذييل الالتزام والترخيص المهني */}
        <footer className="mt-10 p-5 rounded-2xl bg-white border border-[#e2e8f0] flex flex-col sm:flex-row items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227] shrink-0 border border-[#c9a227]/20">
            <Award size={24} />
          </div>
          <p className="text-[11px] md:text-xs leading-relaxed text-[#64748b] text-center sm:text-right">
            تلتزم مجلة المصارف والتأمين بأعلى معايير الحوكمة الصحفية والمواثيق المهنية الاقتصادية، وتعتبر منصة دورية مستقلة ومرجعاً معتمداً لتوثيق وأرشفة القوانين والأنظمة المالية المنظمة للنشاط التجاري والمصرفي.
          </p>
        </footer>
      </main>

      <Footer />
    </div>
  )
}