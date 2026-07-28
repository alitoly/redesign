/* eslint-disable @next/next/no-img-element -- the platform ships pre-optimised AVIF/WebP
   derivatives (see scripts/optimize-images.mjs) plus the client's original partner logos */

import Link from "next/link";
import HeroReel from "./components/HeroReel";
import LeaderCarousel from "./components/LeaderCarousel";
import NewsletterForm from "./components/NewsletterForm";
import ValueDeck from "./components/ValueDeck";
import PurposeStack from "./components/PurposeStack";
import StatLedger from "./components/StatLedger";
import Icon from "./components/Icon";
import { frames } from "./content/photos";
import { platformStats, purposeCards, supporters, values } from "./content/home";
import { libraryCategories } from "./library/categories";

export default function Home() {
  return (
    <main dir="rtl">
      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          {/* Drop a source here when the client supplies footage of مجلس عمان / دار الأوبرا /
              جبال عمان. The photo reel below stays as the poster and fallback. */}
          <HeroReel />
          <div className="hero-scrim" />
        </div>
        <div className="hero-content" data-reveal>
          <p className="eyebrow">منصة وطنية تفاعلية</p>
          <h1>المنصة الوطنية<span>للقيادات النسائية</span></h1>
          <p className="hero-copy">نبني قاعدة وطنية للقيادات النسائية… ونصنع مستقبل القيادة في سلطنة عمان.</p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/join">انضمي للمنصة</Link>
            <Link className="button button-ghost" href="/about#sectors">ابحث عن قيادية</Link>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true"><b>2040</b><span>نحو حضور وطني مؤثر</span></div>
      </section>

      {/* The three objectives and the vision/mission pair were two consecutive bands
          saying one thing. They run together here as a single pinned deck. */}
      <section className="purpose section" id="about">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">منصة قيادات</p>
          <h2>نمكّن القيادات النسائية العُمانية من الوصول إلى فرص التأثير وصناعة القرار محليًا وإقليميًا ودوليًا</h2>
        </div>
        <PurposeStack
          items={purposeCards.map((card) => ({ ...card, icon: <Icon name={card.icon} /> }))}
        />
      </section>

      <section className="values section section-sage" id="values">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">ما نؤمن به</p>
          <h2>قيم قيادات</h2>
        </div>
        <ValueDeck
          items={values.map((value) => ({ icon: <Icon name={value.icon} />, title: value.title, body: value.body }))}
        />
      </section>

      <section className="stats section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">بالأرقام</p>
          <h2>منصة قيادات بالأرقام</h2>
        </div>
        <StatLedger rows={platformStats} />
      </section>

      <section className="leaders section section-dark" id="leaders">
        <LeaderCarousel />
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

      <section className="supporters section section-sage">
        <div className="section-heading centered" data-reveal><p className="eyebrow">شركاء الأثر</p><h2>الجهات الداعمة للمنصة</h2></div>
        <div className="supporter-grid">
          {supporters.map((supporter) => (
            <a key={supporter.name} href={supporter.url} target="_blank" rel="noreferrer" aria-label={`زيارة ${supporter.name}`} data-reveal>
              <img src={supporter.image} alt={supporter.name} loading="lazy" />
              <span>{supporter.name}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section newsletter-section">
        <NewsletterForm />
      </section>
    </main>
  );
}
