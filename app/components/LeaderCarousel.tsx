"use client";

/* eslint-disable @next/next/no-img-element -- the client's supplied portraits ship as AVIF */

import { useState } from "react";
import { leaders } from "../content/home";

export default function LeaderCarousel() {
  const [activeLeader, setActiveLeader] = useState(0);
  const leader = leaders[activeLeader];

  const moveLeader = (direction: number) => {
    setActiveLeader((current) => (current + direction + leaders.length) % leaders.length);
  };

  return (
    <>
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
            {leaders.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={index === activeLeader ? "active" : ""}
                aria-label={`عرض كلمة ${item.name}`}
                onClick={() => setActiveLeader(index)}
              />
            ))}
          </div>
        </blockquote>
      </div>
    </>
  );
}
