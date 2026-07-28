/* eslint-disable @next/next/no-img-element -- the platform ships pre-optimised AVIF/WebP
   derivatives (see scripts/optimize-images.mjs) */

import { CSSProperties, ReactNode } from "react";
import { frames } from "../content/photos";
import "./PurposeStack.css";

export type StackCard = {
  /** Names the group this card belongs to — the deck runs the objectives and the
   *  vision/mission pair together, so the label rides on the card, not the section. */
  kicker: string;
  title: string;
  body: string;
  icon: ReactNode;
  /** Slug under public/images/opt — resolved through frames(). */
  photo: string;
  alt: string;
};

/** The platform's objectives and its vision and mission, as a stack of pinned cards:
 *  every card is `position: sticky` at the same offset with a rising z-index, so
 *  scrolling deals each one over the last. The effect is pure CSS — no observer, no
 *  scroll listener, nothing to fall out of sync.
 *
 *  Cards pin below the sticky header rather than at 0, or the header's own plate would
 *  eat the top 82px of every card including its gold frame and notch. */
export default function PurposeStack({ items }: { items: StackCard[] }) {
  return (
    <div className="purpose-stack">
      {items.map((item, index) => (
        <section
          className="purpose-stack__card"
          key={item.title}
          style={{ "--index": index + 1, "--tint": `var(--purpose-${index + 1})` } as CSSProperties}
        >
          <article className="purpose-stack__frame">
            <div className="purpose-stack__surface">
              <div className="purpose-stack__content">
                <p className="purpose-stack__index">
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <span className="purpose-stack__rule" aria-hidden="true" />
                  <span>{item.kicker}</span>
                </p>

                <h3 className="purpose-stack__title">
                  <span className="purpose-stack__icon" aria-hidden="true">{item.icon}</span>
                  {item.title}
                </h3>

                <p className="purpose-stack__body">{item.body}</p>
              </div>

              {/* Not lazy. Inside the pinned stack every card occupies the same scroll
                  offset, and Chrome leaves cards 2..n unfetched even while they sit
                  fully in the viewport — the section would ship as empty navy plates.
                  Five images directly below the hero that every reader scrolls through
                  are worth fetching up front; the browser still queues them behind the
                  first paint. */}
              <figure className="purpose-stack__media">
                <img
                  {...frames(item.photo)}
                  sizes="(max-width: 760px) 92vw, 38vw"
                  alt={item.alt}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                />
              </figure>
            </div>
          </article>
        </section>
      ))}
    </div>
  );
}
