/* eslint-disable @next/next/no-img-element -- pre-optimised AVIF/WebP derivatives */

import type { Metadata } from "next";
import { CSSProperties } from "react";
import SpotlightCard from "../components/SpotlightCard";
import RoadmapGoals from "../components/RoadmapGoals";
import TabDeck from "../components/TabDeck";
import Icon from "../components/Icon";
import { frames } from "../content/photos";
import {
  beneficiaries,
  beneficiaryEntities,
  expectedImpact,
  fieldNodes,
  sectorGroups,
  strategicGoals,
} from "../content/about";

export const metadata: Metadata = {
  title: "عن المنصة",
  description:
    "أهداف منصة قيادات الاستراتيجية، والأثر المتوقع منها، والقطاعات والمجالات التي تغطيها قاعدة البيانات، والجهات والفئات المستفيدة من خدماتها.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main dir="rtl">
      <section className="page-hero photo-section">
        <img {...frames("0q8a4927")} sizes="100vw" alt="" fetchPriority="high" />
        <p className="eyebrow">قصة الانطلاقة</p>
        <h1>لماذا أُطلقت منصة قيادات</h1>
        <p>
          أُطلقت منصة قيادات استجابةً للحاجة إلى منصة وطنية موحدة تُوثّق الكفاءات والقيادات النسائية
          العمانية، وتربطها بالفرص القيادية والمهنية، بما يعزز حضور المرأة في مواقع صنع القرار، ويدعم
          الاستفادة من الخبرات الوطنية في مختلف القطاعات، انسجامًا مع مستهدفات رؤية عمان 2040. كما توفر
          المنصة برامج ودورات تدريبية معتمدة، وورش عمل متخصصة، وجلسات إرشاد وتطوير قيادي، تهدف إلى تنمية
          القدرات، وصقل المهارات، وإعداد جيل من القيادات النسائية المؤهلة والقادرة على المنافسة والتميز
          محليًا وإقليميًا ودوليًا.
        </p>
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

      <section className="impact section section-sage">
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

      <section className="sectors section" id="sectors">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">مجالات الخبرة</p>
          <h2>القطاعات التي تحتوي عليها المنصة</h2>
          <p>مسارات متنوعة تجمع الخبرة، الابتكار، وريادة الأعمال.</p>
        </div>
        <TabDeck
          label="مسارات القطاعات"
          tabs={sectorGroups.map((group) => ({
            id: group.title,
            label: group.title,
            tone: `var(--tone-${group.tone})`,
            panel: (
              <ul className="chip-list">
                {group.items.map((sector) => (
                  <li className="chip" key={sector.label} style={{ "--tone": `var(--tone-${sector.tone})` } as CSSProperties}>
                    <span className="chip__icon"><Icon name={sector.icon} duotone /></span>
                    {sector.label}
                  </li>
                ))}
              </ul>
            ),
          }))}
        />
      </section>

      <section className="fields section section-sage">
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

      <section className="audiences section">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">دائرة الاستفادة</p>
          <h2>من يستفيد من المنصة</h2>
          <p>مؤسسات تبحث عن الكفاءة، ونساء تبنين مسيرتهن — الطرفان يلتقيان على القاعدة نفسها.</p>
        </div>
        <div className="audience-split">
          <div className="audience-column" data-reveal>
            <h3><span className="audience-count">08</span> الجهات المستفيدة</h3>
            <ul>
              {beneficiaryEntities.map((entity) => (
                <li key={entity.label}>
                  <span className="audience-icon"><Icon name={entity.icon} /></span>
                  {entity.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="audience-column" data-reveal>
            <h3><span className="audience-count">05</span> الفئة المستفيدة من المنصة</h3>
            <p className="audience-note">من مقاعد الدراسة إلى تأسيس المشاريع وصناعة القرار.</p>
            <ul>
              {beneficiaries.map((item) => (
                <li key={item.body}>
                  <span className="audience-icon"><Icon name={item.icon} /></span>
                  {item.body}
                </li>
              ))}
            </ul>
          </div>
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
    </main>
  );
}
