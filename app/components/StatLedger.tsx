import "./StatLedger.css";

export type LedgerRow = {
  value: string;
  /** The label's head-word, stretched with U+0640 tatweel for display. */
  lead: string;
  /** The same word unstretched. Tatweel defeats screen readers and find-in-page. */
  plain: string;
  rest: string;
};

export default function StatLedger({ rows }: { rows: LedgerRow[] }) {
  return (
    <div className="stat-ledger">
      {rows.map((row, index) => {
        const plus = row.value.startsWith("+");
        return (
          <div
            className="stat-ledger__row"
            key={row.plain}
            data-flip={index % 2 === 1 ? "" : undefined}
            data-reveal
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <b className="stat-ledger__value">
              {plus && <span className="stat-ledger__plus">+</span>}
              {plus ? row.value.slice(1) : row.value}
            </b>
            <p className="stat-ledger__label">
              <span className="stat-ledger__lead">
                <span aria-hidden="true">{row.lead}</span>
                <span className="sr-only">{row.plain}</span>
              </span>
              <span className="stat-ledger__rest">{row.rest}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
