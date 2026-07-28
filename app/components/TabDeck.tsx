"use client";

import { KeyboardEvent, ReactNode, useId, useRef, useState } from "react";
import "./TabDeck.css";

export type DeckTab = {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Optional accent for the active tab; falls back to the deck's navy. */
  tone?: string;
  panel: ReactNode;
};

/** A tab row sitting on top of a single panel — the whole group's content collapses to
 *  one screen instead of one long stack of headed sections. */
export default function TabDeck({ tabs, label }: { tabs: DeckTab[]; label: string }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  // RTL: ArrowLeft advances toward the end of the row, ArrowRight walks back.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.key === "ArrowLeft" ? 1 : event.key === "ArrowRight" ? -1 : 0;
    if (!step && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();

    const next =
      event.key === "Home" ? 0
      : event.key === "End" ? tabs.length - 1
      : (active + step + tabs.length) % tabs.length;

    setActive(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']")[next]?.focus();
  };

  const current = tabs[active];

  return (
    <div className="tab-deck">
      <div className="tab-deck__rail">
        <div className="tab-deck__list" role="tablist" aria-label={label} ref={listRef}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              className="tab-deck__tab"
              style={tab.tone ? ({ "--tab-tone": tab.tone } as React.CSSProperties) : undefined}
              aria-selected={index === active}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
            >
              {tab.icon && <span className="tab-deck__tab-icon" aria-hidden="true">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="tab-deck__panel"
        key={current.id}
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
      >
        {current.panel}
      </div>
    </div>
  );
}
