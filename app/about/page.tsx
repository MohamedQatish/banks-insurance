import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Building2, Target, Award, Users, ShieldCheck, Zap, BarChart3, Briefcase, Globe, Mail, MapPin, Quote } from 'lucide-react'
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
          
          {/* العمود الأيمن العريض: الرؤية، الأهداف، الكلمة، والهيكل */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* بطاقة الرؤية والرسالة المحدثة بدقة */}
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

              {/* صياغة احترافية لرسالة المجلة الميدانية والتغطيات */}
              <section className="space-y-3 md:border-r md:border-[#e2e8f0] md:pr-6">
                <h2 className="text-base font-bold flex items-center gap-2 text-[#c9a227]">
                  <Building2 size={18} />
                  رسالة المجلة
                </h2>
                <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed">
                  بناء جسر تواصل متين بين أقطاب المال والأعمال عبر تغطية ميدانية وإنتاج إعلامي متكامل؛ يشمل إجراء اللقاءات والمقابلات الحصرية المصورة مع قيادات الشركات وصناع القرار، وتغطية المعارض والمنتديات الاقتصادية، بالتوازي مع رصد ومواكبة القوانين والتشريعات الرسمية فور صدورها.
                </p>
              </section>
            </div>

            {/* شبكة القيم الجوهرية (3 كروت صغيرة) */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center space-y-2 border-t-4 border-[#0a1628]">
                <ShieldCheck size={32} className="text-[#0a1628] mx-auto" />
                <h3 className="text-sm font-bold text-[#0a1628]">المصداقية المطلقة</h3>
                <p className="text-[11px] text-[#64748b] leading-relaxed">الاعتماد الكامل على المستندات والتصريحات الرسمية الموثقة.</p>
              </div>
              <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center space-y-2 border-t-4 border-[#c9a227]">
                <Zap size={32} className="text-[#c9a227] mx-auto" />
                <h3 className="text-sm font-bold text-[#0a1628]">السرعة والمواكبة</h3>
                <p className="text-[11px] text-[#64748b] leading-relaxed">تغطية حية وميدانية لكافة المعارض، المؤتمرات، والقرارات العاجلة.</p>
              </div>
              <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl shadow-sm text-center space-y-2 border-t-4 border-[#0a1628]">
                <BarChart3 size={32} className="text-[#0a1628] mx-auto" />
                <h3 className="text-sm font-bold text-[#0a1628]">التحليل المعمق</h3>
                <p className="text-[11px] text-[#64748b] leading-relaxed">قراءة أبعاد وأثر اللقاءات والتغيرات الهيكلية في السوق.</p>
              </div>
            </section>

            {/* كلمة المدير العام الفخمة والافتتاحية */}
            <section className="bg-gradient-to-br from-[#ffffff] to-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-4 left-4 text-[#c9a227]/10 pointer-events-none">
                <Quote size={80} />
              </div>
              <h2 className="text-base font-bold text-[#0a1628] mb-4 flex items-center gap-2">
                <span className="w-2 h-4 bg-[#c9a227] rounded-sm block"></span>
                كلمة المدير العام
              </h2>
              <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed font-medium italic relative z-10">
                "إن مواكبة التحولات العميقة في القطاع المصرفي السوري وقطاع التأمين تشكل حجر الأساس في عملية البناء الاقتصادي. نحن في مجلة المصارف والتأمين، نلتزم بتقديم المادة العلمية والخبر الصحفي الموثق والتحليل الرصين لرفد المستثمر والمؤسسات وصناع القرار برؤية اقتصادية شاملة تدعم استراتيجيات التحول الرقمي وحوكمة المخاطر."
              </p>
            </section>

            {/* الهيكل الإداري والتحريري المتطور بالصور */}
            <section className="bg-white rounded-2xl border border-[#e2e8f0] p-6 md:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-[#0a1628] flex items-center gap-2 border-b border-[#f1f5f9] pb-4">
                <Users size={20} className="text-[#c9a227]" />
                الهيئة الإدارية والتحريرية
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* كرت بورتيريه المدير العام خالد قطيش */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:border-[#c9a227] hover:shadow-md transition-all duration-300">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#c9a227] shrink-0 shadow-sm bg-[#0a1628]">
                    <Image 
                      src="/images/khaled-qatish.png" 
                      alt="خالد قطيش - المدير العام"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0a1628]">خالد قطيش</h3>
                    <p className="text-xs text-[#c9a227] font-bold mt-0.5">المدير العام ورئيس التحرير</p>
                  </div>
                </div>

                {/* كرت هيئة التحرير */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:border-[#0a1628] hover:shadow-md transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-slate-200 text-[#0a1628] border-2 border-slate-300 flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
                    مت
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0a1628]">مجلس التحرير</h3>
                    <p className="text-xs text-[#8a9bb8] mt-0.5">نخبة من الأكاديميين والمستشارين الماليين</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* العمود الأيسر: بطاقة خدمات المجلة ومعلومات الاتصال المحدثة بروابط Vercel */}
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
                  <span>حلول رعاية وإعلانات ذكية تستهدف صناع القرار الاستثماري والشركات.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full mt-1.5 shrink-0" />
                  <span>تغطيات ميدانية مصورة وإنتاج لقاءات مخصصة للأجنحة في المعارض الاقتصادية.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c9a227] rounded-full mt-1.5 shrink-0" />
                  <span>إعداد اللقاءات والمقابلات الصحفية التخصصية لدعم انتشار الشركات المالية والتأمينية.</span>
                </li>
              </ul>
            </div>

            {/* بطاقة العناوين والاتصال السريع بعد التصحيح للرابط و الـ PR */}
            <div className="bg-[#0a1628] text-white rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-[#c9a227]">قنوات التواصل الرسمية</h2>
              
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#c9a227] shrink-0" />
                  <span>دمشق — الجمهورية العربية السورية</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#c9a227] shrink-0" />
                  <a href="mailto:pr@banks-insurance.com" className="lowercase hover:text-[#c9a227] transition-colors">
                    pr@banks-insurance.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-[#c9a227] shrink-0" />
                  <a href="https://banks-insurance.vercel.app" target="_blank" rel="noopener noreferrer" className="lowercase hover:text-[#c9a227] transition-colors">
                    banks-insurance.vercel.app
                  </a>
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