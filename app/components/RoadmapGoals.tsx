"use client";

import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./RoadmapGoals.css";

export type RoadmapItem = { title: string; body: string; icon: ReactNode };

const LOBES = 5;
/** Where each flag sits along the road, as a fraction of total path length.
 *  Kept inside 0.12 to 0.88 so the first and last banners never overflow the band. */
const anchorAt = (i: number, total: number) => (total === 1 ? 0.5 : 0.12 + i * (0.76 / (total - 1)));

/** Serpentine road, generated in real pixels so the stroke never scales unevenly.
 *  The swing is deliberately modest: banners fly outward from the road, so the
 *  road must stay central enough to leave a full banner's width on either side. */
function buildPath(w: number, h: number) {
  const cx = w / 2;
  const amp = Math.min(w * 0.16, 190);
  const seg = h / LOBES;
  let d = `M ${cx} 0`;
  for (let i = 0; i < LOBES; i++) {
    const dir = i % 2 === 0 ? 1 : -1;
    const y = i * seg;
    d += ` C ${cx + dir * amp} ${y + seg * 0.32}, ${cx + dir * amp} ${y + seg * 0.68}, ${cx} ${y + seg}`;
  }
  return d;
}

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function RoadmapGoals({ items }: { items: RoadmapItem[] }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const flagRefs = useRef<(HTMLElement | null)[]>([]);

  const [stack, setStack] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [points, setPoints] = useState<{ x: number; y: number; side: "left" | "right" }[]>([]);

  // Curve on wide screens, plain vertical spine on phones.
  useEffect(() => {
    // Below this the band is too narrow for a banner on each side of the road.
    const query = window.matchMedia("(max-width: 1100px)");
    const sync = () => setStack(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const band = bandRef.current;
    if (!band || stack) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    observer.observe(band);
    return () => observer.disconnect();
  }, [stack]);

  // Sample the road so every flag is anchored to a real point on the curve.
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || stack || !size.w) return;
    const total = path.getTotalLength();
    setPoints(
      items.map((_, i) => {
        const p = path.getPointAtLength(total * anchorAt(i, items.length));
        // Outward: a flag on the right of the road flies right. Flying inward makes
        // both sides compete for the centre and adjacent banners overlap.
        return { x: p.x, y: p.y, side: p.x >= size.w / 2 ? "right" : "left" };
      }),
    );
  }, [items, size, stack]);

  const draw = useCallback(() => {
    const band = bandRef.current;
    if (!band) return;

    const rect = band.getBoundingClientRect();
    const vh = window.innerHeight;
    const span = Math.max(rect.height - vh * 0.35, 1);
    const p = clamp((vh * 0.75 - rect.top) / span);

    const line = progressRef.current;
    if (line) {
      const len = line.getTotalLength();
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len * (1 - p)}`;
    }
    if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;

    flagRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = anchorAt(i, items.length);
      const reveal = clamp((p - (t - 0.06)) / 0.1);
      // Written straight to style rather than transitioned: a CSS transition would
      // stall in a background tab and the flag would never appear.
      el.style.opacity = `${reveal}`;
      el.style.translate = `0 ${(1 - reveal) * 20}px`;
    });
  }, [items.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const line = progressRef.current;
      if (line) line.style.strokeDashoffset = "0";
      if (fillRef.current) fillRef.current.style.height = "100%";
      flagRefs.current.forEach((el) => {
        if (el) { el.style.opacity = "1"; el.style.translate = "none"; }
      });
      return;
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; draw(); });
    };

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [draw, points, stack]);

  const flag = (item: RoadmapItem, i: number, side: "left" | "right") => (
    <article
      className={`goal-flag goal-flag--${side}`}
      ref={(el) => { flagRefs.current[i] = el; }}
    >
      <span className="goal-flag__pole" aria-hidden="true" />
      <div className="goal-flag__banner">
        <div className="goal-flag__head">
          <span className="goal-flag__index">{String(i + 1).padStart(2, "0")}</span>
          <span className="goal-flag__icon">{item.icon}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </article>
  );

  if (stack) {
    return (
      <div className="roadmap roadmap--stack" ref={bandRef}>
        <span className="roadmap__spine" aria-hidden="true">
          <span className="roadmap__spine-fill" ref={fillRef} />
        </span>
        {items.map((item, i) => (
          <div className="roadmap__stop" key={item.title}>
            <span className="roadmap__dot" aria-hidden="true" />
            {flag(item, i, "left")}
          </div>
        ))}
      </div>
    );
  }

  const d = size.w ? buildPath(size.w, size.h) : "";

  return (
    <div className="roadmap" ref={bandRef}>
      <svg className="roadmap__road" viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
        <path ref={pathRef} className="roadmap__track" d={d} />
        <path ref={progressRef} className="roadmap__progress" d={d} />
      </svg>
      {points.map((point, i) => (
        <div
          className="roadmap__stop"
          key={items[i].title}
          style={{ left: `${point.x}px`, top: `${point.y}px` }}
        >
          <span className="roadmap__dot" aria-hidden="true" />
          {flag(items[i], i, point.side)}
        </div>
      ))}
    </div>
  );
}
