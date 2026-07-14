"use client";

/* eslint-disable @next/next/no-img-element -- preserve the client's original Wix image assets */

import { FormEvent, useEffect, useState } from "react";

const wixMedia = "https://static.wixstatic.com/media";

const sectors = [
  ["المرأة في الطيران", `${wixMedia}/5a7c9e_5053dddcae7f4beea191b1b72b8fc83d~mv2.png/v1/fill/w_242,h_242,al_c,q_85/airport.png`],
  ["المرأة في المشاريع الكبرى", `${wixMedia}/5a7c9e_5c3c2c649d234c77b36b97f36f56fd5e~mv2.png/v1/fill/w_242,h_242,al_c,q_85/factory.png`],
  ["المرأة في قطاع الأعمال", `${wixMedia}/5a7c9e_50f53d5421c0415c8360a97855f0d883~mv2.png/v1/fill/w_242,h_242,al_c,q_85/business.png`],
  ["المرأة في الابتكار", `${wixMedia}/5a7c9e_ece2ecba08474fd28c11931ee75a1a85~mv2.png/v1/fill/w_242,h_242,al_c,q_85/innovation.png`],
  ["المرأة في مجال الإعلام", `${wixMedia}/5a7c9e_9330105c7f3b4c2ea6b3d34b0b5b4b82~mv2.png/v1/fill/w_242,h_242,al_c,q_85/media.png`],
  ["المرأة في قطاع النفط والغاز", `${wixMedia}/5a7c9e_ea95ead076414edf815a3a6f36edaa30~mv2.png/v1/fill/w_242,h_242,al_c,q_85/energy.png`],
  ["المرأة في الذكاء الاصطناعي", `${wixMedia}/5a7c9e_c46e73f614234bd78d53cf43ee39b02a~mv2.png/v1/fill/w_242,h_242,al_c,q_85/ai.png`],
  ["المرأة في المناصب الدولية", `${wixMedia}/5a7c9e_886f5d36dfec4bbe8059b63318f35ba7~mv2.png/v1/fill/w_242,h_242,al_c,q_85/international.png`],
  ["المرأة في قطاع البنوك", `${wixMedia}/5a7c9e_14b30931e5ce43d48f485202b5fb3efb~mv2.png/v1/fill/w_242,h_242,al_c,q_85/banking.png`],
];

const fields = [
  "المرأة في المجال القانوني",
  "المرأة في المجال الصحي",
  "المرأة في المجال البيئي",
  "المرأة في المجال التطوعي",
  "المرأة في المجال الرياضي",
  "المرأة في المجال الصحفي",
  "المرأة في المجال السياسي",
  "المرأة في المجال الإجتماعي",
  "المرأة في المجال الأقتصادي",
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
  "جميع الطالبات العمانيات على مقاعد الدراسة",
  "الخريجات من الجامعات والكليات والراغبات في تطوير مهاراتهن في ريادة الأعمال أو القطاع الذي يناسب شغفهن",
  "المتطوعات في الجمعيات الخيرية والأهلية",
  "النساء العمانيات الراغبات في تأسيس مشروع خاص",
  "تقديم الاستشارات في المجالات التخصصية بعد حجز موعد مع إدارة المنصة ودفع الرسوم",
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
        <img className="hero-art" src={`${wixMedia}/11062b_952485dce28e4eac9e9f09d63fdc9ada~mv2.jpg/v1/fill/w_980,h_1100,al_c,q_85/leadership.jpg`} alt="تصميم فني أخضر بدرج حلزوني" />
        <div className="hero-scrim" />
        <div className="hero-content" data-reveal>
          <p className="eyebrow">منصة وطنية تفاعلية</p>
          <h1>المنصة الوطنية<br />للقيادات النسائية العمانية</h1>
          <p className="hero-copy">قاعدة بيانات وطنية تسهّل الوصول السريع إلى القيادات النسائية في القطاعين العام والخاص ومؤسسات المجتمع المدني.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#about">اكتشفي المنصة <span aria-hidden="true">←</span></a>
            <a className="text-link" href="#sectors">استعرضي القطاعات</a>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><b>2040</b><span>نحو حضور وطني مؤثر</span></div>
      </section>

      <section className="intro section" id="about">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">منصة قيادات</p>
          <h2>نصل بالخبرات العمانية إلى حيث تصنع الأثر</h2>
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

      <section className="sectors section section-sage" id="sectors">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">مجالات الخبرة</p>
          <h2>القطاعات التي تحتوي عليها المنصة</h2>
          <p>مسارات متنوعة تجمع الخبرة، الابتكار، وريادة الأعمال.</p>
        </div>
        <div className="sector-grid">
          {sectors.map(([title, image], index) => (
            <article className="sector-card" key={title} data-reveal>
              <span className="sector-number">{String(index + 1).padStart(2, "0")}</span>
              <img src={image} alt="" loading="lazy" />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="fields section">
        <div className="fields-heading" data-reveal><p className="eyebrow">أثر ممتد</p><h2>النساء العمانيات القياديات في المجالات الآتية</h2></div>
        <ol className="field-list">
          {fields.map((field, index) => <li key={field} data-reveal><span>{String(index + 1).padStart(2, "0")}</span>{field}</li>)}
        </ol>
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

      <section className="how section" id="how">
        <div className="section-heading" data-reveal><p className="eyebrow">خطوات واضحة</p><h2>آلية عمل المنصة</h2></div>
        <div className="steps">
          <article data-reveal><span>01</span><div><h3>اشتراك ميسّر</h3><p>يتم الاشتراك في المنصة بقيمة ريالين فقط كرسوم اشتراك تدفع لأول مرة.</p></div></article>
          <article data-reveal><span>02</span><div><h3>ملف مهني موثّق</h3><p>تحصل كل مشتركة على رمز تعريفي خاص بها وتضيف بياناتها في القطاع، وتتعهد بصحة البيانات مع المستندات الثبوتية وسيرة ذاتية قصيرة لأهم إنجازاتها.</p></div></article>
          <article data-reveal><span>03</span><div><h3>فرص على مدار العام</h3><p>يتم الإعلان عن جميع الدورات لمدة سنة كاملة مجدولة بالتواريخ والتوقيت.</p></div></article>
        </div>
      </section>

      <section className="beneficiaries section section-sage">
        <div className="beneficiary-title" data-reveal><p className="eyebrow">مساحة للنمو</p><h2>الفئة المستفيدة من المنصة</h2><p>من مقاعد الدراسة إلى تأسيس المشاريع وصناعة القرار.</p></div>
        <ol className="beneficiary-list">
          {beneficiaries.map((item, index) => <li key={item} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}
        </ol>
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
