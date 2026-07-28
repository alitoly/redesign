/* eslint-disable @next/next/no-img-element -- pre-optimised AVIF/WebP derivatives */

import { frames } from "../content/photos";
import "./StepLadder.css";

export type Step = { title: string; body: string; note?: string };

/** Decorative photographs hang in the outer gutter beside the even steps, so the ladder
 *  is never five paragraphs against an empty half-page. */
const gutterPhotos: Record<number, string> = {
  1: "0q8a4989",
  3: "0q8a3243",
};

export default function StepLadder({ steps }: { steps: Step[] }) {
  return (
    <ol className="step-ladder" data-reveal>
      {steps.map((step, index) => {
        const photoSlug = gutterPhotos[index];
        return (
          <li className="step-ladder__step" key={step.title} data-reveal>
            <span className="step-ladder__num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="step-ladder__text">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.note && <p className="step-ladder__note">{step.note}</p>}
            </div>
            {photoSlug && (
              <figure className="step-ladder__photo">
                <img {...frames(photoSlug)} sizes="(max-width: 900px) 0px, 26vw" alt="" loading="lazy" />
              </figure>
            )}
          </li>
        );
      })}
    </ol>
  );
}
