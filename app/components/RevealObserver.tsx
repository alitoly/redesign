"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Drives the `[data-reveal]` entrance for every route. Keyed on the pathname so a
 *  client-side navigation re-scans the new page — a mount-once observer would leave
 *  every section on the second route stuck at opacity 0. */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
