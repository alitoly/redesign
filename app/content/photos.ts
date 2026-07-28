const photo = "/images/opt";

/** Responsive srcset for a photograph optimised by scripts/optimize-images.mjs. */
export function frames(slug: string) {
  return {
    src: `${photo}/${slug}-1600.webp`,
    srcSet: [640, 1024, 1600, 2000].map((w) => `${photo}/${slug}-${w}.avif ${w}w`).join(", "),
  };
}

export const heroFrames = [
  { slug: "0q8a4986", alt: "قاعة تضم مشاركات في ملتقى للقيادات النسائية العمانية" },
  { slug: "0q8a3336", alt: "اجتماع لقيادات نسائية عمانية حول طاولة مستديرة" },
  { slug: "0q8a4920", alt: "قيادية عمانية تلقي كلمة من على المنصة" },
  { slug: "0q8a3199", alt: "لقاء رسمي يجمع عددًا من القيادات النسائية" },
];
