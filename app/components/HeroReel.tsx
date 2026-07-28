"use client";

/* eslint-disable @next/next/no-img-element -- pre-optimised AVIF/WebP derivatives, see scripts/optimize-images.mjs */

import { useEffect, useState } from "react";
import { frames, heroFrames } from "../content/photos";

/** Slow cinematic cross-fade behind the hero. Held still on small screens and
 *  whenever the visitor prefers reduced motion. */
export default function HeroReel() {
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const still = window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");
    if (still.matches) return;

    const timer = window.setInterval(
      () => setActiveFrame((current) => (current + 1) % heroFrames.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-reel">
      {heroFrames.map((frame, index) => (
        <img
          key={frame.slug}
          {...frames(frame.slug)}
          sizes="100vw"
          alt=""
          className={index === activeFrame ? "is-active" : ""}
          fetchPriority={index === 0 ? "high" : "low"}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}
