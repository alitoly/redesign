"use client";

import { KeyboardEvent, ReactNode, useId, useState } from "react";
import "./ValueDeck.css";

export type ValuePanel = { title: string; body: string; icon: ReactNode };

/** A horizontal accordion: four collapsed blue slabs and one open paper panel.
 *  Pointer users open a panel by hovering it; keyboard and touch users open it by
 *  activating the header button — hover alone would strand every phone visitor. */
export default function ValueDeck({ items }: { items: ValuePanel[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  // RTL: ArrowLeft advances toward the end of the row, ArrowRight walks back.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === "ArrowLeft" ? 1 : event.key === "ArrowRight" ? -1 : 0;
    if (!step && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();

    const next =
      event.key === "Home" ? 0
      : event.key === "End" ? items.length - 1
      : (index + step + items.length) % items.length;

    setOpen(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="value-deck" data-reveal>
      {items.map((item, index) => {
        const isOpen = index === open;
        return (
          <section
            className="value-deck__panel"
            key={item.title}
            data-open={isOpen}
            style={{ "--panel-tint": `var(--value-${index + 1})` } as React.CSSProperties}
            /* mousemove, not mouseenter: opening a panel resizes its neighbours, which
               slides a different panel under a stationary cursor and fires mouseenter
               again — the two panels then flip back and forth. A layout shift emits no
               mousemove, so this only reacts to the pointer actually travelling. */
            onMouseMove={() => setOpen(index)}
          >
            <h3 className="value-deck__heading">
              <button
                type="button"
                id={`${baseId}-tab-${index}`}
                className="value-deck__trigger"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${index}`}
                onClick={() => setOpen(index)}
                onFocus={() => setOpen(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="value-deck__title">{item.title}</span>
                <span className="value-deck__icon" aria-hidden="true">{item.icon}</span>
              </button>
            </h3>
            <div
              className="value-deck__body"
              id={`${baseId}-panel-${index}`}
              role="region"
              aria-labelledby={`${baseId}-tab-${index}`}
            >
              <p>{item.body}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
