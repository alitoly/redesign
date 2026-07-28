import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../components/Icon";
import { libraryCategories } from "./categories";

export const metadata: Metadata = {
  title: "المكتبة الوطنية",
  description:
    "المكتبة الوطنية لمنصة قيادات: الدراسات والأدلة والكتب والسياسات والإحصائيات والأنظمة ورؤية عمان 2040 المتعلقة بالقيادات النسائية العمانية.",
  alternates: { canonical: "/library" },
};

export default function LibraryPage() {
  return (
    <main dir="rtl">
      <section className="library-hero">
        <p className="eyebrow">مرجع معرفي وطني</p>
        <h1>المكتبة الوطنية</h1>
        <p>
          مرجع معرفي يجمع الدراسات والأدلة والكتب والسياسات والإحصائيات والأنظمة المتعلقة بالقيادات
          النسائية العمانية، بما يدعم الباحثين وصنّاع القرار والجهات المستفيدة.
        </p>
        <Link className="back-link" href="/">
          <span aria-hidden="true">→</span> العودة إلى الصفحة الرئيسية
        </Link>
      </section>


      <section className="section">
        <div className="library-grid" style={{ marginTop: 0 }}>
          {libraryCategories.map((category) => (
            <article className="library-card" key={category.title}>
              <span className="library-card-icon"><Icon name={category.icon} /></span>
              <h3>{category.title}</h3>
              <p>{category.body}</p>
            </article>
          ))}
        </div>
        <p className="library-note">
          يجري حاليًا إعداد محتوى المكتبة وتوثيق مصادرها تمهيدًا لإتاحتها للباحثين والجهات
          المستفيدة. للاستفسار أو المساهمة بمصدر معرفي، يرجى التواصل مع إدارة المنصة.
        </p>
      </section>
    </main>
  );
}
