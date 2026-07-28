export default function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-brand">
        <span className="brand-mark">ق</span>
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
