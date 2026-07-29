"use client";

/* eslint-disable @next/next/no-img-element -- the national emblems ship as hand-sized AVIFs */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "عن المنصة" },
  { href: "/about#sectors", label: "القطاعات" },
  { href: "/#leaders", label: "كلمات القادة" },
  { href: "/library", label: "المكتبة الوطنية" },
  { href: "/join", label: "آلية العمل" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only the plain route links claim the current page. "/about#sectors" points into a
  // section, not at a destination, so marking it would light two items on /about.
  const isCurrent = (href: string) => !href.includes("#") && pathname === href;

  /* The read-position rule under the header. Written straight to the root as a custom
     property rather than held in state — this fires on every scroll frame and re-rendering
     the header that often would be the one expensive thing on the page. rAF-throttled,
     same shape as the scrubbed road on /about. */
  useEffect(() => {
    let frame = 0;

    const draw = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${Math.min(1, Math.max(0, progress))}`);
    };

    const onScroll = () => { frame ||= requestAnimationFrame(draw); };

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header className="site-header">
      <span className="site-header__progress" aria-hidden="true" />
      <Link className="brand" href="/" aria-label="منصة قيادات - الصفحة الرئيسية" onClick={() => setMenuOpen(false)}>
        <img className="brand-mark" src="/logo.png" alt="" width={46} height={46} />
        <span><strong>قيادات</strong><small>المنصة الوطنية</small></span>
      </Link>
      <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="التنقل الرئيسي">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isCurrent(link.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link className="nav-cta" href="/join" onClick={() => setMenuOpen(false)}>انضمي للمنصة</Link>
      </nav>
      <div className="official-logos" aria-label="شعارات وطنية">
        <img src="/assets/vision-2040.avif" alt="رؤية عمان 2040" />
        <img src="/assets/oman-emblem.avif" alt="شعار سلطنة عمان" />
      </div>
      <button className="menu-button" type="button" aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </header>
  );
}
