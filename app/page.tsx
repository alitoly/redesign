"use client";

/* eslint-disable @next/next/no-img-element -- the platform ships pre-optimised AVIF/WebP
   derivatives (see scripts/optimize-images.mjs) plus the client's original partner logos */

import { CSSProperties, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import MagicBento from "./components/MagicBento";
import SpotlightCard from "./components/SpotlightCard";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";
import RoadmapGoals from "./components/RoadmapGoals";
import Icon from "./components/Icon";
import { libraryCategories } from "./library/categories";

const wixMedia = "https://static.wixstatic.com/media";
const photo = "/images/opt";

/** Responsive srcset for a photograph optimised by scripts/optimize-images.mjs. */
function frames(slug: string) {
  return {
    src: `${photo}/${slug}-1600.webp`,
    srcSet: [640, 1024, 1600, 2000].map((w) => `${photo}/${slug}-${w}.avif ${w}w`).join(", "),
  };
}

const heroFrames = [
  { slug: "0q8a4986", alt: "قاعة تضم مشاركات في ملتقى للقيادات النسائية العمانية" },
  { slug: "0q8a3336", alt: "اجتماع لقيادات نسائية عمانية حول طاولة مستديرة" },
  { slug: "0q8a4920", alt: "قيادية عمانية تلقي كلمة من على المنصة" },
  { slug: "0q8a3199", alt: "لقاء رسمي يجمع عددًا من القيادات النسائية" },
];

/** The 23 sectors, grouped into five themes. A flat grid of 23 identical cards is
 *  twelve rows of scrolling on a phone and reads as undifferentiated; grouping gives
 *  the list structure and lets each entry shrink to a chip. */
const sectorGroups: { title: string; items: { label: string; icon: string; tone: string }[] }[] = [
  {
    title: "الاقتصاد والأعمال",
    items: [
      { label: "قطاع الأعمال", icon: "business", tone: "gold" },
      { label: "الاقتصاد", icon: "economy", tone: "gold" },
      { label: "الاستثمار", icon: "investment", tone: "gold" },
      { label: "قطاع البنوك", icon: "banking", tone: "gold" },
      { label: "ريادة الأعمال", icon: "entrepreneurship", tone: "rose" },
      { label: "التأمين", icon: "insurance", tone: "sky" },
    ],
  },
  {
    title: "التقنية والابتكار",
    items: [
      { label: "الابتكار", icon: "innovation", tone: "teal" },
      { label: "الذكاء الاصطناعي", icon: "ai", tone: "teal" },
      { label: "الأمن السيبراني", icon: "cybersecurity", tone: "teal" },
      { label: "الفضاء", icon: "space", tone: "navy" },
    ],
  },
  {
    title: "الطاقة والمشاريع",
    items: [
      { label: "النفط والغاز", icon: "oil", tone: "amber" },
      { label: "الطاقة", icon: "energy", tone: "amber" },
      { label: "المشاريع الكبرى", icon: "projects", tone: "navy" },
      { label: "الطيران", icon: "aviation", tone: "sky" },
    ],
  },
  {
    title: "الأمن والتمثيل الدولي",
    items: [
      { label: "الأمن والدفاع", icon: "defense", tone: "navy" },
      { label: "الشرطة", icon: "police", tone: "navy" },
      { label: "المناصب الدولية", icon: "international", tone: "sky" },
      { label: "الدبلوماسية", icon: "diplomacy", tone: "navy" },
    ],
  },
  {
    title: "المجتمع والبيئة والتراث",
    items: [
      { label: "البيئة", icon: "environment", tone: "teal" },
      { label: "السياحة", icon: "tourism", tone: "rose" },
      { label: "التراث", icon: "heritage", tone: "amber" },
      { label: "الرياضة", icon: "sports", tone: "sky" },
      { label: "الإعلام", icon: "media", tone: "rose" },
    ],
  },
];

/** `short` is the one-word form used when the ring is drawn at phone size. */
const fields = [
  { label: "المرأة في المجال القانوني", short: "القانون", icon: "legal" },
  { label: "المرأة في المجال الصحي", short: "الصحة", icon: "health" },
  { label: "المرأة في المجال البيئي", short: "البيئة", icon: "environment" },
  { label: "المرأة في المجال التطوعي", short: "التطوع", icon: "volunteer" },
  { label: "المرأة في المجال الرياضي", short: "الرياضة", icon: "sports" },
  { label: "المرأة في المجال الصحفي", short: "الصحافة", icon: "journalism" },
  { label: "المرأة في المجال السياسي", short: "السياسة", icon: "political" },
  { label: "المرأة في المجال الإجتماعي", short: "المجتمع", icon: "social" },
  { label: "المرأة في المجال الأقتصادي", short: "الاقتصاد", icon: "economic" },
];

const fieldNodes = fields.map((field, index) => {
  const angle = (index * 360) / fields.length - 90;
  const rad = (angle * Math.PI) / 180;
  return { ...field, x: 50 + 40 * Math.cos(rad), y: 50 + 40 * Math.sin(rad) };
});

const values = [
  { title: "الريادة", body: "نسعى إلى إعداد قيادات نسائية مؤهلة، وتعزيز ثقافة القيادة والابتكار، ودعم حضور المرأة العمانية في مواقع التأثير وصناعة القرار.", icon: "star" },
  { title: "الاحترافية", body: "نلتزم بتقديم برامج تدريبية وخدمات عالية الجودة وفق أفضل الممارسات العالمية بما يسهم في تطوير القيادات النسائية وبناء قدراتها بكفاءة.", icon: "badge" },
  { title: "الشفافية", body: "نعتمد المصداقية والدقة في توثيق البيانات والمعلومات المهنية، بما يعزز الثقة في المنصة ومخرجاتها.", icon: "eye" },
  { title: "الشراكة والتكامل", body: "نعزز التعاون مع الجهات الحكومية والخاصة والأكاديمية ومؤسسات المجتمع المدني، لبناء منظومة متكاملة تدعم تطوير القيادات النسائية وتوسّع فرصها.", icon: "link" },
  { title: "المسؤولية الوطنية والاستدامة", body: "نسهم في دعم أولويات التنمية الوطنية، وبناء قيادات نسائية مستدامة، وتعزيز مشاركة المرأة في تحقيق مستهدفات رؤية عمان 2040.", icon: "sprout" },
];

const strategicGoals = [
  { title: "التأهيل وبناء القدرات", body: "تصميم وتنفيذ برامج تدريبية وورش عمل متخصصة تسهم في تطوير المهارات القيادية والمهنية للقيادات النسائية، وتعزيز جاهزيتهن لقيادة المؤسسات والمشاركة الفاعلة في مواقع صنع القرار.", icon: "graduation" },
  { title: "بناء قاعدة بيانات وطنية للقيادات النسائية", body: "إنشاء وتحديث قاعدة بيانات موثوقة تضم القيادات والكفاءات النسائية العمانية في مختلف القطاعات، بما يسهم في توثيق خبراتهن وإنجازاتهن المهنية.", icon: "database" },
  { title: "تسهيل الوصول إلى الكفاءات الوطنية", body: "تمكين الجهات الحكومية والخاصة ومؤسسات المجتمع المدني من الوصول إلى القيادات النسائية المناسبة وفق التخصص والخبرة، لدعم عمليات الترشيح والاختيار للمناصب واللجان والفرص القيادية.", icon: "key" },
  { title: "تعزيز فرص المشاركة والتمثيل وبناء الشراكات", body: "ربط القيادات النسائية بفرص المشاركة والتمثيل في اللجان والمجالس والمؤتمرات والوفود والمبادرات الوطنية والإقليمية والدولية، وتعزيز الشراكات المهنية التي تسهم في تبادل الخبرات وتوسيع فرص التعاون.", icon: "diplomacy" },
  { title: "إبراز القيادات الوطنية ودعم التنمية المستدامة", body: "إبراز النماذج القيادية النسائية وقصص النجاح، وتعزيز حضور المرأة العمانية في مواقع القيادة وصناعة القرار، بما يسهم في تحقيق مستهدفات رؤية عمان 2040 ودعم التنمية المستدامة.", icon: "award" },
];

const expectedImpact = [
  { body: "تأهيل وبناء قدرات القيادات النسائية من خلال تقديم برامج تدريبية معتمدة، وورش عمل متخصصة، وبرامج إرشاد وتطوير قيادي تسهم في رفع الكفاءة المهنية والقيادية.", icon: "graduation" },
  { body: "إنشاء قاعدة بيانات وطنية محدثة تضم القيادات والكفاءات النسائية العمانية في مختلف القطاعات، بما يتيح سهولة الوصول إلى البيانات وتحديثها بشكل مستمر.", icon: "database" },
  { body: "رفع معدلات ترشيح القيادات النسائية للمناصب القيادية واللجان والمجالس والوفود المحلية والإقليمية والدولية من خلال توفير قاعدة بيانات موثوقة للجهات المستفيدة.", icon: "economy" },
  { body: "تسريع وصول الجهات الحكومية والخاصة ومؤسسات المجتمع المدني إلى الكفاءات الوطنية المؤهلة، بما يختصر الوقت والجهد في عمليات البحث والترشيح والاختيار.", icon: "clock" },
  { body: "توفير مؤشرات وبيانات وطنية تدعم متخذي القرار والباحثين في إعداد الدراسات والتقارير ورسم السياسات المتعلقة بتمكين المرأة والقيادات النسائية.", icon: "economic" },
  { body: "إبراز النماذج القيادية وقصص النجاح العمانية لتعزيز حضور المرأة في المشهد الوطني وإلهام الأجيال القادمة من القيادات النسائية.", icon: "award" },
];

const beneficiaryEntities = [
  { label: "الجهات الحكومية", icon: "government" },
  { label: "المركز الوطني للإحصاء والمعلومات", icon: "economic" },
  { label: "مؤسسات القطاع الخاص", icon: "briefcase" },
  { label: "مؤسسات المجتمع المدني", icon: "volunteer" },
  { label: "الجامعات والمؤسسات الأكاديمية والبحثية", icon: "academic" },
  { label: "المنظمات الإقليمية والدولية", icon: "diplomacy" },
  { label: "القيادات والكفاءات النسائية العمانية", icon: "social" },
  { label: "الباحثون وصنّاع القرار والجهات المعنية بإعداد الدراسات والإحصاءات المتعلقة بالقيادات الوطنية", icon: "search" },
];

const platformStats = [
  { value: "30", label: "قطاعًا ممثلًا في قاعدة البيانات" },
  { value: "+500", label: "قيادة وكفاءة نسائية من مختلف التخصصات" },
  { value: "+100", label: "جهة مستفيدة من خدمات المنصة" },
  { value: "+200", label: "فرصة قيادية سنويًا في اللجان والمجالس والمؤتمرات والوفود" },
];

const profileCategories = [
  { title: "الهوية والتعريف", icon: "idcard", items: ["الصورة الشخصية", "نبذة تعريفية"] },
  { title: "المسيرة المهنية", icon: "graduation", items: ["المؤهلات العلمية", "الخبرات المهنية", "المناصب القيادية"] },
  { title: "الإنجازات والتكريم", icon: "award", items: ["الإنجازات", "الجوائز والأوسمة"] },
  { title: "الحضور والمشاركات", icon: "diplomacy", items: ["المشاركات المحلية والإقليمية والدولية", "العضويات المهنية"] },
  { title: "الإنتاج المعرفي", icon: "book", items: ["المؤلفات والأبحاث", "المشاريع والمبادرات"] },
  { title: "التواصل والتوثيق", icon: "link", items: ["وسائل التواصل", "طلب التواصل أو الترشيح", "تحميل السيرة الذاتية"] },
];

const dashboardActions = [
  { label: "تعديل بياناتها", icon: "edit" },
  { label: "رفع السيرة الذاتية", icon: "upload" },
  { label: "تحديث الإنجازات", icon: "refresh" },
  { label: "إضافة الجوائز", icon: "award" },
  { label: "إضافة الصور", icon: "camera" },
  { label: "إضافة المؤلفات", icon: "book" },
];

const leaders = [
  {
    image: "/assets/leader-ahd.avif",
    name: "السيدة الجليلة عهد بنت عبدالله البوسعيدية",
    role: "كلمتها أثناء افتتاح منصة قيادات",
    quote: "نحرص كل الحرص على ترسيخ مبدأ الشراكة والمسؤولية المجتمعية بين المرأة والرجل في المجتمع العماني، وصولا للتكاملية بينهما، والتي تسعى إليها المجتمعات المتحضرة لتحقيق التطلعات المستقبلية لما فيه خير الوطن ورفعته وازدهاره. حيث تجسد ذلك من خلال تفضل جلالته -أبقاه الله- بإسناد جملة من المناصب الحكومية العليا إلى عدد من نساء عمان المجيدات؛ تقديرًا من لدنه -أيده الله- لإمكاناتهن وقدراتهن في أداء المهام الموكلة لهن في تحقيق رؤية عمان المستقبلية بإخلاص وتفان، ليكن بعون الله أهلًا للثقة السامية الكريمة.",
  },
  {
    image: "/assets/leader-rahma.avif",
    name: "وزيرة التعليم العالي والبحث العلمي والابتكار",
    role: "كلمة عن المرأة العمانية ورؤية عمان 2040",
    quote: "إن رسالة العدالة والمساواة بين أفراد المجتمع العماني مبدأ متأصل في البناء الحضاري لعمان ومن أبرز محاور وركائز رؤية عمان 2040، وهو ما حقق الرعاية الاجتماعية، ومكن الأسرة ودعم المرأة وأتاح الفرص أمام قطاعات الشباب. وقد منحت هذه الركيزة المرأة العمانية فرصا مكافئة لشقيقها الرجل عبر منظومة متكاملة من التشريعات والقوانين. فهنيئا للمرأة العمانية بيومها هذا، وهنيئا لهذا الوطن بها شريكا محوريا في بناء نهضته المتجددة.",
  },
  {
    image: "/assets/leader-social.avif",
    name: "صاحبة السمو السيدة منى آل سعيد",
    role: "كلمة في منصة قيادات",
    quote: "إن سمات العصر الذي نعيشه هيأ للمرأة نطاقاً أوسع للعمل ومكنها من التخصص في شتى ميادين المعرفة، ونقف اليوم في مرحلة مفصلية في تاريخ عمان الغالية، نشعر بالفخر والاعتزاز بالمرأة العمانية المحافظة على قيم مجتمعها وحضارته وتاريخه الماجد. ما نشهده اليوم في العهد السعيد لجلالة السلطان هيثم بن طارق المعظم -حفظه الله ورعاه- يضع علينا مسؤوليات كبيرة ومهام عظيمة لنكمل المسير كما هو مؤمل منا، ويجب علينا أن نتبوأ المكانة التي أنزلنا إياها وأن ننجز ونضطلع بمسؤولياتنا تجاه المجتمع.",
  },
  {
    image: "/assets/leader-mona.avif",
    name: "وزيرة التنمية الإجتماعية",
    role: "كلمة في منصة قيادات",
    quote: "اهتمام السلطنة بالمرأة يأتي منذ السنين الأولى لها عبر تربيتها على قيم وأخلاق وعادات مجتمعنا، والتمسك بهذه العادات والتقاليد لاشك هو عنصر مهم جداً وفعال في ظل التحولات العالمية المختلفة ووجود وسائل التقنية ووسائل التواصل الحديثة التي قد تؤثر في نقل أفكار وثقافات مختلفة لا تتوافق مع مبادئنا وأخلاقنا وديننا الإسلامي. وتحتاج هذه الفئات إلى التثقيف والمتابعة والإسهام في الارتقاء بهذا الفكر والعطاء ليظل في إطار خدمة هذا الوطن.",
  },
];

const beneficiaries = [
  { body: "جميع الطالبات العمانيات على مقاعد الدراسة", icon: "graduation" },
  { body: "الخريجات من الجامعات والكليات والراغبات في تطوير مهاراتهن في ريادة الأعمال أو القطاع الذي يناسب شغفهن", icon: "academic" },
  { body: "المتطوعات في الجمعيات الخيرية والأهلية", icon: "volunteer" },
  { body: "النساء العمانيات الراغبات في تأسيس مشروع خاص", icon: "entrepreneurship" },
  { body: "تقديم الاستشارات في المجالات التخصصية بعد حجز موعد مع إدارة المنصة ودفع الرسوم", icon: "chat" },
];

const howSteps = [
  { title: "اشتراك ميسّر", body: "يتم الاشتراك في المنصة بقيمة ريالين فقط كرسوم اشتراك تدفع لأول مرة." },
  { title: "ملف مهني موثّق", body: "تحصل كل مشتركة على رمز تعريفي خاص بها وتضيف بياناتها في القطاع، وتتعهد بصحة البيانات مع المستندات الثبوتية وسيرة ذاتية قصيرة لأهم إنجازاتها." },
  { title: "فرص على مدار العام", body: "يتم الإعلان عن جميع الدورات لمدة سنة كاملة مجدولة بالتواريخ والتوقيت." },
];

const supporters = [
  { name: "وزارة التعليم العالي والبحث العلمي والابتكار", image: `${wixMedia}/5a7c9e_990e5b1157e84f11806746e606d7392b~mv2.png/v1/fill/w_240,h_170,al_c,q_85/ministry.png`, url: "https://www.moheri.gov.om/" },
  { name: "الصندوق العماني للتكنولوجيا", image: `${wixMedia}/5a7c9e_f84fdd6d66ff4d49a69d557f3304f97e~mv2.jpg/v1/fill/w_240,h_170,al_c,q_85/otf.jpg`, url: "https://twitter.com/omantechfund?lang=ar" },
  { name: "مجموعة عُمران", image: `${wixMedia}/5a7c9e_85ff8b61018e4fadbe690991cab5a45e~mv2.png/v1/fill/w_240,h_170,al_c,q_85/omran.png`, url: "https://www.instagram.com/omrangroupom/" },
  { name: "وزارة النقل والاتصالات وتقنية المعلومات", image: `${wixMedia}/5a7c9e_9b5d4078006e4a48a7c074e8cb84d729~mv2.png/v1/fill/w_240,h_170,al_c,q_85/mtcit.png`, url: "https://www.instagram.com/mtcitoman/" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLeader, setActiveLeader] = useState(0);
  const [joined, setJoined] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);

  // Slow cinematic cross-fade behind the hero. Held still on small screens and
  // whenever the visitor prefers reduced motion.
  useEffect(() => {
    const still = window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");
    if (still.matches) return;

    const timer = window.setInterval(
      () => setActiveFrame((current) => (current + 1) % heroFrames.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const moveLeader = (direction: number) => {
    setActiveLeader((current) => (current + direction + leaders.length) % leaders.length);
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoined(true);
  };

  const leader = leaders[activeLeader];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "منصة قيادات",
    alternateName: "المنصة الوطنية للقيادات النسائية العمانية",
    description: "منصة وطنية تفاعلية وقاعدة بيانات للقيادات النسائية العمانية في القطاعين العام والخاص ومؤسسات المجتمع المدني.",
    email: "albadi.abdul@outlook.com",
    areaServed: { "@type": "Country", name: "سلطنة عمان" },
  };

  return (
    <main dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="منصة قيادات - الصفحة الرئيسية">
          <span className="brand-mark">ق</span>
          <span><strong>قيادات</strong><small>المنصة الوطنية</small></span>
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="التنقل الرئيسي">
          <a href="#about" onClick={() => setMenuOpen(false)}>عن المنصة</a>
          <a href="#sectors" onClick={() => setMenuOpen(false)}>القطاعات</a>
          <a href="#leaders" onClick={() => setMenuOpen(false)}>كلمات القادة</a>
          <a href="#library" onClick={() => setMenuOpen(false)}>المكتبة الوطنية</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>آلية العمل</a>
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>تواصل معنا</a>
        </nav>
        <div className="official-logos" aria-label="شعارات وطنية">
          <img src="/assets/vision-2040.avif" alt="رؤية عمان 2040" />
          <img src="/assets/oman-emblem.avif" alt="شعار سلطنة عمان" />
        </div>
        <button className="menu-button" type="button" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          {/* Drop a source here when the client supplies footage of مجلس عمان / دار الأوبرا /
              جبال عمان. The photo reel below stays as the poster and fallback. */}
          <div className="hero-reel">
            {heroFrames.map((frame, index) => (
              <img
                key={frame.slug}
                {...frames(frame.slug)}
                sizes="100vw"
                alt=""
                className={index === activeFrame ? "is-active" : ""}
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
          <div className="hero-scrim" />
        </div>
        <div className="hero-content" data-reveal>
          <p className="eyebrow">منصة وطنية تفاعلية</p>
          <h1>المنصة الوطنية<span>للقيادات النسائية</span></h1>
          <p className="hero-copy">نبني قاعدة وطنية للقيادات النسائية… ونصنع مستقبل القيادة في سلطنة عمان.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#how">انضمي للمنصة</a>
            <a className="button button-ghost" href="#sectors">ابحث عن قيادية</a>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><b>2040</b><span>نحو حضور وطني مؤثر</span></div>
      </section>

      <section className="intro section" id="about">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">منصة قيادات</p>
          <h2>نمكّن القيادات النسائية العُمانية من الوصول إلى فرص التأثير وصناعة القرار محليًا وإقليميًا ودوليًا</h2>
        </div>
        <div className="objectives" data-reveal>
          <article><span>01</span><p>تسهيل الوصول السريع إلى القيادات النسائية الوطنية للقطاع العام ومؤسسات القطاع الخاص ومؤسسات المجتمع المدني</p></article>
          <article><span>02</span><p>رفع جودة اختيار المرأة العمانية لتمثيل سلطنة عمان في الوفود المحلية والخارجية والمحافل الرسمية</p></article>
          <article><span>03</span><p>تسجيل نجاحات القيادات النسائية في ظل الرؤية العمانية 2040</p></article>
        </div>
        <form className="newsletter" onSubmit={submitNewsletter} data-reveal>
          <div><strong>المجلة الأسبوعية</strong><span>أخبار القيادات والفرص تصل إلى بريدك</span></div>
          {joined ? <p className="success-message" role="status">شكرًا لانضمامك إلى مجتمع قيادات.</p> : <div className="newsletter-control"><label className="sr-only" htmlFor="email">البريد الإلكتروني</label><input id="email" type="email" required placeholder="البريد الإلكتروني" /><button type="submit">انضمي</button></div>}
        </form>
      </section>

      <section className="mission section" id="mission">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">هويتنا</p>
          <h2>رؤية ورسالة قيادات</h2>
        </div>
        <div className="mission-layout">
          <figure className="mission-photo" data-reveal>
            <img {...frames("0q8a4992")} sizes="(max-width: 900px) 100vw, 38vw" alt="قيادية عمانية تتحدث خلال جلسة حوارية" loading="lazy" />
          </figure>
          <div className="mission-grid">
          <article data-reveal>
            <h3>رؤية قيادات</h3>
            <p>أن تكون منصة قيادات المرجع الوطني الأول للقيادات النسائية العمانية، والمحرك الرئيس لتعزيز حضور المرأة في مواقع القيادة وصناعة القرار، وربط الكفاءات الوطنية بفرص التمثيل والتأثير على المستويات المحلية والإقليمية والدولية.</p>
          </article>
          <article data-reveal>
            <h3>رسالة قيادات</h3>
            <p>تأهيل وتمكين القيادات النسائية العمانية عبر برامج تدريبية متخصصة، وتوثيق الكفاءات الوطنية، وربطها بفرص القيادة والتمثيل والشراكات، بما يعزز حضور المرأة العمانية وإسهامها في التنمية المستدامة محليًا ودوليًا.</p>
          </article>
          </div>
        </div>
      </section>

      <section className="values section section-sage">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">ما نؤمن به</p>
          <h2>قيم قيادات</h2>
        </div>
        <MagicBento
          items={values.map((value) => ({ icon: <Icon name={value.icon} />, title: value.title, description: value.body }))}
        />
      </section>

      <section className="goals section">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">خارطة الطريق</p>
          <h2>الأهداف الاستراتيجية لمنصة قيادات</h2>
        </div>
        <RoadmapGoals
          items={strategicGoals.map((goal) => ({
            title: goal.title,
            body: goal.body,
            icon: <Icon name={goal.icon} />,
          }))}
        />
      </section>

      <section className="library section photo-section" id="library">
        <img {...frames("0q8a5033")} sizes="100vw" alt="" loading="lazy" />
        <div className="section-heading centered" data-reveal>
          <div className="library-intro"><span className="library-mark"><Icon name="library" /></span></div>
          <p className="eyebrow">مرجع معرفي وطني</p>
          <h2>المكتبة الوطنية</h2>
          <p>مرجع معرفي يجمع الدراسات والأدلة والسياسات والإحصائيات المتعلقة بالقيادات النسائية العمانية في مكان واحد.</p>
        </div>
        <div className="library-grid">
          {libraryCategories.map((category) => (
            <article className="library-card" key={category.title} data-reveal>
              <span className="library-card-icon"><Icon name={category.icon} /></span>
              <h3>{category.title}</h3>
              <p>{category.body}</p>
            </article>
          ))}
        </div>
        <p className="library-note" data-reveal>يجري حاليًا إعداد محتوى المكتبة وتوثيق مصادرها تمهيدًا لإتاحتها للباحثين والجهات المستفيدة.</p>
        <div className="library-actions" data-reveal>
          <Link className="button button-gold" href="/library">استعرض المكتبة <span aria-hidden="true">←</span></Link>
        </div>
      </section>

      <section className="sectors section section-sage" id="sectors">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">مجالات الخبرة</p>
          <h2>القطاعات التي تحتوي عليها المنصة</h2>
          <p>مسارات متنوعة تجمع الخبرة، الابتكار، وريادة الأعمال.</p>
        </div>
        <div className="sector-groups">
          {sectorGroups.map((group) => (
            <section className="sector-group" key={group.title} data-reveal>
              <h3>{group.title}</h3>
              <ul className="chip-list">
                {group.items.map((sector) => (
                  <li className="chip" key={sector.label} style={{ "--tone": `var(--tone-${sector.tone})` } as CSSProperties}>
                    <span className="chip__icon"><Icon name={sector.icon} duotone /></span>
                    {sector.label}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="fields section">
        <div className="fields-heading" data-reveal><p className="eyebrow">أثر ممتد</p><h2>النساء العمانيات القياديات في المجالات الآتية</h2></div>
        <div className="field-radial">
          <svg className="field-lines" viewBox="0 0 100 100" aria-hidden="true">
            {fieldNodes.map((node, index) => (
              <line key={node.label} x1="50" y1="50" x2={node.x} y2={node.y} className={`tone-${index % 6}`} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <div className="field-ring" aria-hidden="true" />
          <div className="field-hub" data-reveal><span className="field-hub-mark" aria-hidden="true" /><span>قيادات</span></div>
          {fieldNodes.map((node, index) => (
            <div className="field-node" key={node.label} data-reveal style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <span className={`field-icon tone-${index % 6}`}><Icon name={node.icon} /></span>
              <span className="field-label">
                <span className="field-label__full">{node.label}</span>
                <span className="field-label__short">{node.short}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="why section photo-section">
        <img {...frames("0q8a4927")} sizes="100vw" alt="" loading="lazy" />
        <div className="section-heading" data-reveal>
          <p className="eyebrow">قصة الانطلاقة</p>
          <h2>لماذا أُطلقت منصة قيادات</h2>
        </div>
        <p className="prose" data-reveal>أُطلقت منصة قيادات استجابةً للحاجة إلى منصة وطنية موحدة تُوثّق الكفاءات والقيادات النسائية العمانية، وتربطها بالفرص القيادية والمهنية، بما يعزز حضور المرأة في مواقع صنع القرار، ويدعم الاستفادة من الخبرات الوطنية في مختلف القطاعات، انسجامًا مع مستهدفات رؤية عمان 2040. كما توفر المنصة برامج ودورات تدريبية معتمدة، وورش عمل متخصصة، وجلسات إرشاد وتطوير قيادي، تهدف إلى تنمية القدرات، وصقل المهارات، وإعداد جيل من القيادات النسائية المؤهلة والقادرة على المنافسة والتميز محليًا وإقليميًا ودوليًا.</p>
      </section>

      <section className="impact section">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">النتائج المرجوة</p>
          <h2>الأثر المتوقع</h2>
        </div>
        <div className="spotlight-grid">
          {expectedImpact.map((item) => (
            <SpotlightCard key={item.body} spotlightColor="rgba(47, 167, 160, 0.16)">
              <div className="info-card" data-reveal>
                <span className="info-card-icon"><Icon name={item.icon} /></span>
                <p>{item.body}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="beneficiary-entities section section-sage">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">شركاء المنصة</p>
          <h2>الجهات المستفيدة</h2>
        </div>
        <div className="tag-grid">
          {beneficiaryEntities.map((entity) => (
            <div className="tag-card" key={entity.label} data-reveal>
              <span className="tag-card-icon"><Icon name={entity.icon} /></span>
              <span>{entity.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stats section">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">بالأرقام</p>
          <h2>منصة قيادات بالأرقام</h2>
        </div>
        <div className="stat-grid">
          {platformStats.map((stat) => (
            <article key={stat.label} data-reveal>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="leaders section section-dark" id="leaders">
        <div className="leaders-top" data-reveal>
          <div><p className="eyebrow">صوت القيادة</p><h2>كلمات القادة عن منصة قيادات</h2></div>
          <div className="carousel-controls">
            <button type="button" aria-label="الكلمة السابقة" onClick={() => moveLeader(-1)}>→</button>
            <button type="button" aria-label="الكلمة التالية" onClick={() => moveLeader(1)}>←</button>
          </div>
        </div>
        <div className="leader-story" key={activeLeader}>
          <figure><img src={leader.image} alt={leader.name} /></figure>
          <blockquote>
            <span className="quote-mark" aria-hidden="true">”</span>
            <p>{leader.quote}</p>
            <footer><strong>{leader.name}</strong><span>{leader.role}</span></footer>
            <div className="dots" aria-label={`الكلمة ${activeLeader + 1} من ${leaders.length}`}>
              {leaders.map((item, index) => <button key={item.name} type="button" className={index === activeLeader ? "active" : ""} aria-label={`عرض كلمة ${item.name}`} onClick={() => setActiveLeader(index)} />)}
            </div>
          </blockquote>
        </div>
      </section>

      <section className="how section photo-band" id="how">
        <img {...frames("0q8a4989")} sizes="100vw" alt="" loading="lazy" />
        <div className="section-heading centered" data-reveal><p className="eyebrow">خطوات واضحة</p><h2>آلية عمل المنصة</h2></div>
        <ScrollStack>
          {howSteps.map((step, index) => (
            <ScrollStackItem key={step.title}>
              <span className="scroll-stack-card__step">{String(index + 1).padStart(2, "0")}</span>
              <div className="scroll-stack-card__body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      <section className="profile section section-sage">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">مرجع موثّق</p>
          <h2>الملف القيادي</h2>
          <p>تمتلك كل قيادة صفحة مستقلة تُعد مرجعًا متكاملًا يعكس مسيرتها المهنية وإنجازاتها.</p>
        </div>
        <MagicBento
          enableSpotlight={false}
          roomy
          items={profileCategories.map((category) => ({
            icon: <Icon name={category.icon} />,
            title: category.title,
            description: (
              <ul>
                {category.items.map((entry) => <li key={entry}>{entry}</li>)}
              </ul>
            ),
          }))}
        />
      </section>

      <section className="dashboard section">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">تحكّم كامل</p>
          <h2>لوحة تحكم</h2>
          <p>كل مشتركة تستطيع:</p>
        </div>
        <div className="spotlight-grid">
          {dashboardActions.map((action) => (
            <SpotlightCard key={action.label} spotlightColor="rgba(200, 166, 78, 0.22)">
              <div className="info-card info-card--centered" data-reveal>
                <span className="info-card-icon"><Icon name={action.icon} /></span>
                <h3>{action.label}</h3>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="beneficiaries-individual section section-sage">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">مساحة للنمو</p>
          <h2>الفئة المستفيدة من المنصة</h2>
          <p>من مقاعد الدراسة إلى تأسيس المشاريع وصناعة القرار.</p>
        </div>
        <div className="persona-grid">
          {beneficiaries.map((item) => (
            <div className="persona-card" key={item.body} data-reveal>
              <span className="persona-card-icon"><Icon name={item.icon} /></span>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <div className="photo-strip" data-reveal>
          <figure>
            <img {...frames("0q8a3211")} sizes="(max-width: 760px) 100vw, 50vw" alt="ورشة تدريبية تجمع مشاركات من القيادات النسائية" loading="lazy" />
            <figcaption>برامج تدريبية وورش عمل متخصصة</figcaption>
          </figure>
          <figure>
            <img {...frames("0q8a3243")} sizes="(max-width: 760px) 100vw, 33vw" alt="قيادية عمانية تقدم عرضًا خلال لقاء مهني" loading="lazy" />
            <figcaption>جلسات إرشاد وتطوير قيادي</figcaption>
          </figure>
          <figure>
            <img {...frames("0q8a3205")} sizes="(max-width: 760px) 100vw, 33vw" alt="نقاش بين قياديات عمانيات حول طاولة اجتماع" loading="lazy" />
            <figcaption>لقاءات تشاورية وبناء شراكات</figcaption>
          </figure>
        </div>
      </section>

      <section className="supporters section">
        <div className="section-heading centered" data-reveal><p className="eyebrow">شركاء الأثر</p><h2>الجهات الداعمة للمنصة</h2></div>
        <div className="supporter-grid">
          {supporters.map((supporter) => <a key={supporter.name} href={supporter.url} target="_blank" rel="noreferrer" aria-label={`زيارة ${supporter.name}`} data-reveal><img src={supporter.image} alt={supporter.name} loading="lazy" /><span>{supporter.name}</span></a>)}
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-brand"><span className="brand-mark">ق</span><div><strong>منصة قيادات</strong><p>المنصة الوطنية للقيادات النسائية العمانية</p></div></div>
        <div className="footer-contact"><span>للتواصل</span><a href="mailto:albadi.abdul@outlook.com">albadi.abdul@outlook.com</a></div>
        <p className="copyright">© {new Date().getFullYear()} منصة قيادات</p>
      </footer>
    </main>
  );
}
