export default function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-brand">
        {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, no next/image needed here */}
        <img className="brand-mark" src="/logo.png" alt="" width={46} height={46} />
        <div>
          <strong>منصة قيادات</strong>
          <p>المنصة الوطنية للقيادات النسائية العمانية</p>
        </div>
      </div>
      <div className="footer-contact">
        <span>للتواصل</span>
        <a href="mailto:albadi.abdul@outlook.com">albadi.abdul@outlook.com</a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} منصة قيادات</p>
    </footer>
  );
}
