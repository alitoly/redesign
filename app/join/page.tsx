/* eslint-disable @next/next/no-img-element -- pre-optimised AVIF/WebP derivatives */

import type { Metadata } from "next";
import SpotlightCard from "../components/SpotlightCard";
import StepLadder from "../components/StepLadder";
import TabDeck from "../components/TabDeck";
import Icon from "../components/Icon";
import { frames } from "../content/photos";
import { dashboardActions, howSteps, joinIntro, profileCategories } from "../content/join";

export const metadata: Metadata = {
  title: "الانضمام إلى المنصة",
  description:
    "آلية عمل منصة قيادات خطوة بخطوة: التسجيل، واستكمال الملف القيادي، ومراجعة العضوية واعتمادها، وتفعيل الحساب، والاستفادة من الفرص القيادية.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <main dir="rtl">
      <section className="page-hero photo-section">
        <img {...frames("0q8a3336")} sizes="100vw" alt="" fetchPriority="high" />
        <p className="eyebrow">إنشاء الحساب</p>
        <h1>انضمي إلى شبكة القيادات النسائية</h1>
        <p>{joinIntro}</p>
        <a className="button button-gold page-hero__cta" href="mailto:albadi.abdul@outlook.com?subject=طلب%20الانضمام%20إلى%20منصة%20قيادات">
          ابدئي التسجيل <span aria-hidden="true">←</span>
        </a>
      </section>

      <section className="how section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">خطوات واضحة</p>
          <h2>آلية عمل المنصة</h2>
        </div>
        <StepLadder steps={howSteps} />
      </section>

      <section className="profile section section-sage">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">مرجع موثّق</p>
          <h2>الملف القيادي</h2>
          <p>تمتلك كل قيادة صفحة مستقلة تُعد مرجعًا متكاملًا يعكس مسيرتها المهنية وإنجازاتها.</p>
        </div>
        <TabDeck
          label="أقسام الملف القيادي"
          tabs={profileCategories.map((category) => ({
            id: category.title,
            label: category.title,
            icon: <Icon name={category.icon} />,
            panel: (
              <div className="profile-panel">
                <ul className="profile-panel__items">
                  {category.items.map((entry, index) => (
                    <li key={entry}>
                      <span className="profile-panel__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      {entry}
                    </li>
                  ))}
                </ul>
                <figure className="profile-panel__photo">
                  <img {...frames("0q8a3295")} sizes="(max-width: 900px) 0px, 30vw" alt="" loading="lazy" />
                </figure>
              </div>
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

      <section className="join-contact section section-dark">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">للاستفسار</p>
          <h2>تواصل معنا</h2>
          <p>لأي سؤال حول العضوية أو الشراكات أو الوصول إلى قاعدة البيانات، راسلي إدارة المنصة مباشرة.</p>
        </div>
        <div className="join-contact__action" data-reveal>
          <a className="button button-gold" href="mailto:albadi.abdul@outlook.com">albadi.abdul@outlook.com</a>
        </div>
      </section>
    </main>
  );
}
