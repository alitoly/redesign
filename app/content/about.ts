/** The 23 sectors, grouped into five themes. A flat grid of 23 identical cards is
 *  twelve rows of scrolling on a phone and reads as undifferentiated; grouping gives
 *  the list structure and lets each entry shrink to a chip. */
export const sectorGroups: { title: string; tone: string; items: { label: string; icon: string; tone: string }[] }[] = [
  {
    title: "الاقتصاد والأعمال",
    tone: "gold",
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
    tone: "teal",
    items: [
      { label: "الابتكار", icon: "innovation", tone: "teal" },
      { label: "الذكاء الاصطناعي", icon: "ai", tone: "teal" },
      { label: "الأمن السيبراني", icon: "cybersecurity", tone: "teal" },
      { label: "الفضاء", icon: "space", tone: "navy" },
    ],
  },
  {
    title: "الطاقة والمشاريع",
    tone: "amber",
    items: [
      { label: "النفط والغاز", icon: "oil", tone: "amber" },
      { label: "الطاقة", icon: "energy", tone: "amber" },
      { label: "المشاريع الكبرى", icon: "projects", tone: "navy" },
      { label: "الطيران", icon: "aviation", tone: "sky" },
    ],
  },
  {
    title: "الأمن والتمثيل الدولي",
    tone: "navy",
    items: [
      { label: "الأمن والدفاع", icon: "defense", tone: "navy" },
      { label: "الشرطة", icon: "police", tone: "navy" },
      { label: "المناصب الدولية", icon: "international", tone: "sky" },
      { label: "الدبلوماسية", icon: "diplomacy", tone: "navy" },
    ],
  },
  {
    title: "المجتمع والبيئة والتراث",
    tone: "rose",
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

export const fieldNodes = fields.map((field, index) => {
  const angle = (index * 360) / fields.length - 90;
  const rad = (angle * Math.PI) / 180;
  return { ...field, x: 50 + 40 * Math.cos(rad), y: 50 + 40 * Math.sin(rad) };
});

export const strategicGoals = [
  { title: "التأهيل وبناء القدرات", body: "تصميم وتنفيذ برامج تدريبية وورش عمل متخصصة تسهم في تطوير المهارات القيادية والمهنية للقيادات النسائية، وتعزيز جاهزيتهن لقيادة المؤسسات والمشاركة الفاعلة في مواقع صنع القرار.", icon: "graduation" },
  { title: "بناء قاعدة بيانات وطنية للقيادات النسائية", body: "إنشاء وتحديث قاعدة بيانات موثوقة تضم القيادات والكفاءات النسائية العمانية في مختلف القطاعات، بما يسهم في توثيق خبراتهن وإنجازاتهن المهنية.", icon: "database" },
  { title: "تسهيل الوصول إلى الكفاءات الوطنية", body: "تمكين الجهات الحكومية والخاصة ومؤسسات المجتمع المدني من الوصول إلى القيادات النسائية المناسبة وفق التخصص والخبرة، لدعم عمليات الترشيح والاختيار للمناصب واللجان والفرص القيادية.", icon: "key" },
  { title: "تعزيز فرص المشاركة والتمثيل وبناء الشراكات", body: "ربط القيادات النسائية بفرص المشاركة والتمثيل في اللجان والمجالس والمؤتمرات والوفود والمبادرات الوطنية والإقليمية والدولية، وتعزيز الشراكات المهنية التي تسهم في تبادل الخبرات وتوسيع فرص التعاون.", icon: "diplomacy" },
  { title: "إبراز القيادات الوطنية ودعم التنمية المستدامة", body: "إبراز النماذج القيادية النسائية وقصص النجاح، وتعزيز حضور المرأة العمانية في مواقع القيادة وصناعة القرار، بما يسهم في تحقيق مستهدفات رؤية عمان 2040 ودعم التنمية المستدامة.", icon: "award" },
];

export const expectedImpact = [
  { body: "تأهيل وبناء قدرات القيادات النسائية من خلال تقديم برامج تدريبية معتمدة، وورش عمل متخصصة، وبرامج إرشاد وتطوير قيادي تسهم في رفع الكفاءة المهنية والقيادية.", icon: "graduation" },
  { body: "إنشاء قاعدة بيانات وطنية محدثة تضم القيادات والكفاءات النسائية العمانية في مختلف القطاعات، بما يتيح سهولة الوصول إلى البيانات وتحديثها بشكل مستمر.", icon: "database" },
  { body: "رفع معدلات ترشيح القيادات النسائية للمناصب القيادية واللجان والمجالس والوفود المحلية والإقليمية والدولية من خلال توفير قاعدة بيانات موثوقة للجهات المستفيدة.", icon: "economy" },
  { body: "تسريع وصول الجهات الحكومية والخاصة ومؤسسات المجتمع المدني إلى الكفاءات الوطنية المؤهلة، بما يختصر الوقت والجهد في عمليات البحث والترشيح والاختيار.", icon: "clock" },
  { body: "توفير مؤشرات وبيانات وطنية تدعم متخذي القرار والباحثين في إعداد الدراسات والتقارير ورسم السياسات المتعلقة بتمكين المرأة والقيادات النسائية.", icon: "economic" },
  { body: "إبراز النماذج القيادية وقصص النجاح العمانية لتعزيز حضور المرأة في المشهد الوطني وإلهام الأجيال القادمة من القيادات النسائية.", icon: "award" },
];

export const beneficiaryEntities = [
  { label: "الجهات الحكومية", icon: "government" },
  { label: "المركز الوطني للإحصاء والمعلومات", icon: "economic" },
  { label: "مؤسسات القطاع الخاص", icon: "briefcase" },
  { label: "مؤسسات المجتمع المدني", icon: "volunteer" },
  { label: "الجامعات والمؤسسات الأكاديمية والبحثية", icon: "academic" },
  { label: "المنظمات الإقليمية والدولية", icon: "diplomacy" },
  { label: "القيادات والكفاءات النسائية العمانية", icon: "social" },
  { label: "الباحثون وصنّاع القرار والجهات المعنية بإعداد الدراسات والإحصاءات المتعلقة بالقيادات الوطنية", icon: "search" },
];

export const beneficiaries = [
  { body: "جميع الطالبات العمانيات على مقاعد الدراسة", icon: "graduation" },
  { body: "الخريجات من الجامعات والكليات والراغبات في تطوير مهاراتهن في ريادة الأعمال أو القطاع الذي يناسب شغفهن", icon: "academic" },
  { body: "المتطوعات في الجمعيات الخيرية والأهلية", icon: "volunteer" },
  { body: "النساء العمانيات الراغبات في تأسيس مشروع خاص", icon: "entrepreneurship" },
  { body: "تقديم الاستشارات في المجالات التخصصية بعد حجز موعد مع إدارة المنصة ودفع الرسوم", icon: "chat" },
];
