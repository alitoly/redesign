"use client";

/* eslint-disable @next/next/no-img-element -- preserve the client's original Wix image assets */

import { FormEvent, ReactNode, useEffect, useState } from "react";
import MagicBento from "./components/MagicBento";
import SpotlightCard from "./components/SpotlightCard";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";

const wixMedia = "https://static.wixstatic.com/media";

const iconPaths: Record<string, ReactNode> = {
  legal: (<><path d="M12 3v18M7 7l-4 8a4 4 0 0 0 8 0l-4-8Zm10 0l-4 8a4 4 0 0 0 8 0l-4-8Z" /><path d="M5 7h14M9 21h6" /></>),
  health: (<><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>),
  environment: (<path d="M12 3c4 2 7 6 7 10a7 7 0 0 1-14 0c0-4 3-8 7-10Zm0 18v-7" />),
  volunteer: (<path d="M12 20s-7-4.4-9.3-8.8A4.6 4.6 0 0 1 6.8 4a5 5 0 0 1 5.2 3 5 5 0 0 1 5.2-3 4.6 4.6 0 0 1 4.1 7.2C19 15.6 12 20 12 20Z" />),
  sports: (<><circle cx="12" cy="12" r="9" /><path d="M12 3v3.2M12 17.8V21M3 12h3.2M17.8 12H21M6 6l2.3 2.3M15.7 15.7 18 18M6 18l2.3-2.3M15.7 8.3 18 6" /></>),
  journalism: (<><rect x="8" y="3" width="8" height="12" rx="4" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>),
  political: (<path d="M6 21V4M6 4h12l-3 4 3 4H6" />),
  social: (<><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9.5" r="2.3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14.4c2.4.3 4.5 2.3 4.5 5.1" /></>),
  economic: (<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />),
  space: (<><path d="M12 2c3 3 4 7 3 12l-3 3-3-3c-1-5 0-9 3-12Z" /><circle cx="12" cy="9" r="1.6" /><path d="M9 15l-3 5M15 15l3 5" /></>),
  insurance: (<path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" />),
  police: (<><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" /><path d="M9 12l2 2 4-4" /></>),
  defense: (<><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" /><path d="M12 7v9" /></>),
  cybersecurity: (<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
  economy: (<path d="M3 17l5-6 4 4 8-9M14 6h6v6" />),
  investment: (<><circle cx="9" cy="9" r="5" /><circle cx="15" cy="15" r="5" /></>),
  energy: (<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />),
  tourism: (<><circle cx="12" cy="12" r="9" /><path d="m15 9-2 6-6 2 2-6 6-2Z" /></>),
  heritage: (<path d="M4 21h16M5 21V9l7-5 7 5v12M9 21v-6h6v6" />),
  entrepreneurship: (<><path d="M12 2v4M8 6l4-4 4 4M6 10h12l-1 11H7L6 10Z" /></>),
  diplomacy: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></>),
  star: (<path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8Z" />),
  badge: (<><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></>),
  eye: (<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>),
  link: (<path d="M9 15 15 9M8.5 6.5 11 4a4 4 0 0 1 5.7 5.7L14 12.4M15.5 17.5 13 20a4 4 0 0 1-5.7-5.7L10 11.6" />),
  sprout: (<><path d="M12 21v-8" /><path d="M12 13c0-4 3-6 8-6 0 5-2 8-8 8Z" /><path d="M12 13c0-3-2.5-5-7-5 0 4 1.5 6.5 7 6.5" /></>),
  graduation: (<><path d="m2 9 10-4 10 4-10 4-10-4Z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></>),
  database: (<><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>),
  key: (<><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 4l3 3M13 7l2.5 2.5" /></>),
  award: (<><circle cx="12" cy="8" r="5" /><path d="m8.5 12.5-1.8 7 5.3-2.9 5.3 2.9-1.8-7" /></>),
  government: (<><path d="M4 21h16M5 21V10l7-6 7 6v11" /><path d="M9 21v-7h6v7" /></>),
  briefcase: (<><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
  academic: (<><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" /></>),
  search: (<><circle cx="10" cy="10" r="6" /><path d="m20 20-5.5-5.5" /></>),
  edit: (<path d="M4 20h4l10-10-4-4L4 16v4Z" />),
  upload: (<><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>),
  refresh: (<><path d="M4 12a8 8 0 0 1 14.6-4.6M20 12a8 8 0 0 1-14.6 4.6" /><path d="M18 3v5h-5M6 21v-5h5" /></>),
  camera: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7 10 4h4l2 3" /><circle cx="12" cy="13.5" r="3.5" /></>),
  book: (<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z" /><path d="M20 19H6.5A2.5 2.5 0 0 0 4 21.5" /></>),
  idcard: (<><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M6 16c0-1.7 1.3-3 3-3s3 1.3 3 3M14 9h5M14 13h5" /></>),
  chat: (<path d="M4 4h16v11H8l-4 4Z" />),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>),
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

const sectors: { title: string; image?: string; icon?: string }[] = [
  { title: "المرأة في الطيران", image: `${wixMedia}/5a7c9e_5053dddcae7f4beea191b1b72b8fc83d~mv2.png/v1/fill/w_242,h_242,al_c,q_85/airport.png` },
  { title: "المرأة في المشاريع الكبرى", image: `${wixMedia}/5a7c9e_5c3c2c649d234c77b36b97f36f56fd5e~mv2.png/v1/fill/w_242,h_242,al_c,q_85/factory.png` },
  { title: "المرأة في قطاع الأعمال", image: `${wixMedia}/5a7c9e_50f53d5421c0415c8360a97855f0d883~mv2.png/v1/fill/w_242,h_242,al_c,q_85/business.png` },
  { title: "المرأة في الابتكار", image: `${wixMedia}/5a7c9e_ece2ecba08474fd28c11931ee75a1a85~mv2.png/v1/fill/w_242,h_242,al_c,q_85/innovation.png` },
  { title: "المرأة في مجال الإعلام", image: `${wixMedia}/5a7c9e_9330105c7f3b4c2ea6b3d34b0b5b4b82~mv2.png/v1/fill/w_242,h_242,al_c,q_85/media.png` },
  { title: "المرأة في قطاع النفط والغاز", image: `${wixMedia}/5a7c9e_ea95ead076414edf815a3a6f36edaa30~mv2.png/v1/fill/w_242,h_242,al_c,q_85/energy.png` },
  { title: "المرأة في الذكاء الاصطناعي", image: `${wixMedia}/5a7c9e_c46e73f614234bd78d53cf43ee39b02a~mv2.png/v1/fill/w_242,h_242,al_c,q_85/ai.png` },
  { title: "المرأة في المناصب الدولية", image: `${wixMedia}/5a7c9e_886f5d36dfec4bbe8059b63318f35ba7~mv2.png/v1/fill/w_242,h_242,al_c,q_85/international.png` },
  { title: "المرأة في قطاع البنوك", image: `${wixMedia}/5a7c9e_14b30931e5ce43d48f485202b5fb3efb~mv2.png/v1/fill/w_242,h_242,al_c,q_85/banking.png` },
  { title: "المرأة في الفضاء", icon: "space" },
  { title: "المرأة في التأمين", icon: "insurance" },
  { title: "المرأة في الشرطة", icon: "police" },
  { title: "المرأة في الأمن والدفاع", icon: "defense" },
  { title: "المرأة في الأمن السيبراني", icon: "cybersecurity" },
  { title: "المرأة في الاقتصاد", icon: "economy" },
  { title: "المرأة في الاستثمار", icon: "investment" },
  { title: "المرأة في الطاقة", icon: "energy" },
  { title: "المرأة في البيئة", icon: "environment" },
  { title: "المرأة في السياحة", icon: "tourism" },
  { title: "المرأة في التراث", icon: "heritage" },
  { title: "المرأة في الرياضة", icon: "sports" },
  { title: "المرأة في ريادة الأعمال", icon: "entrepreneurship" },
  { title: "المرأة في الدبلوماسية", icon: "diplomacy" },
];

const fieldIcons = ["legal", "health", "environment", "volunteer", "sports", "journalism", "political", "social", "economic"];

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

const fieldNodes = fields.map((label, index) => {
  const angle = (index * 360) / fields.length - 90;
  const rad = (angle * Math.PI) / 180;
  return { label, icon: fieldIcons[index], x: 50 + 40 * Math.cos(rad), y: 50 + 40 * Math.sin(rad) };
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
          <p className="hero-copy">منصة وطنية ذكية تُعنى بحصر القيادات النسائية العمانية في مختلف القطاعات، وربط خبراتهن بالفرص القيادية محليًا ودوليًا، إلى جانب تقديم برامج تدريبية معتمدة، ومسارات للتأهيل وبناء القدرات، والإرشاد القيادي، بما يسهم في إعداد قيادات وطنية مؤهلة للمستقبل.</p>
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
        <div className="spotlight-grid">
          {strategicGoals.map((goal) => (
            <SpotlightCard key={goal.title} spotlightColor="rgba(195, 155, 89, 0.22)">
              <div className="info-card" data-reveal>
                <span className="info-card-icon"><Icon name={goal.icon} /></span>
                <h3>{goal.title}</h3>
                <p>{goal.body}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="sectors section section-sage" id="sectors">
        <div className="section-heading centered" data-reveal>
          <p className="eyebrow">مجالات الخبرة</p>
          <h2>القطاعات التي تحتوي عليها المنصة</h2>
          <p>مسارات متنوعة تجمع الخبرة، الابتكار، وريادة الأعمال.</p>
        </div>
        <div className="sector-grid">
          {sectors.map((sector, index) => (
            <article className="sector-card" key={sector.title} data-reveal>
              <span className="sector-number">{String(index + 1).padStart(2, "0")}</span>
              {sector.image ? <img src={sector.image} alt="" loading="lazy" /> : <span className="sector-icon"><Icon name={sector.icon ?? ""} /></span>}
              <h3>{sector.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="fields section">
        <div className="fields-heading" data-reveal><p className="eyebrow">أثر ممتد</p><h2>النساء العمانيات القياديات في المجالات الآتية</h2></div>
        <div className="field-radial">
          <svg className="field-lines" viewBox="0 0 100 100" aria-hidden="true">
            {fieldNodes.map((node, index) => (
              <line key={node.label} x1="50" y1="50" x2={node.x} y2={node.y} className={`tone-${index % 4}`} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          <div className="field-ring" aria-hidden="true" />
          <div className="field-hub" data-reveal><span className="field-hub-mark" aria-hidden="true" /><span>قيادات</span></div>
          {fieldNodes.map((node, index) => (
            <div className="field-node" key={node.label} data-reveal style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <span className={`field-icon tone-${index % 4}`}><Icon name={node.icon} /></span>
              <span className="field-label">{node.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="why section section-sage">
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
            <SpotlightCard key={item.body} spotlightColor="rgba(29, 113, 73, 0.16)">
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

      <section className="how section" id="how">
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
            <SpotlightCard key={action.label} spotlightColor="rgba(195, 155, 89, 0.22)">
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
