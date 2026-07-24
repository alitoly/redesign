import { ReactNode } from "react";

export const iconPaths: Record<string, ReactNode> = {
  legal: (<><path d="M12 3v18M7 7l-4 8a4 4 0 0 0 8 0l-4-8Zm10 0l-4 8a4 4 0 0 0 8 0l-4-8Z" /><path d="M5 7h14M9 21h6" /></>),
  health: (<><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>),
  environment: (<path d="M12 3c4 2 7 6 7 10a7 7 0 0 1-14 0c0-4 3-8 7-10Zm0 18v-7" />),
  volunteer: (<path d="M12 20s-7-4.4-9.3-8.8A4.6 4.6 0 0 1 6.8 4a5 5 0 0 1 5.2 3 5 5 0 0 1 5.2-3 4.6 4.6 0 0 1 4.1 7.2C19 15.6 12 20 12 20Z" />),
  sports: (<><circle cx="12" cy="12" r="9" /><path d="m12 7 3.6 2.6-1.4 4.3H9.8L8.4 9.6 12 7Z" /><path d="M12 3v4M4.3 9.7l4.1-.1M19.7 9.7l-4.1-.1M7.4 19.4l2.4-5.5M16.6 19.4l-2.4-5.5" /></>),
  journalism: (<><rect x="8" y="3" width="8" height="12" rx="4" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>),
  political: (<path d="M6 21V4M6 4h12l-3 4 3 4H6" />),
  social: (<><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9.5" r="2.3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14.4c2.4.3 4.5 2.3 4.5 5.1" /></>),
  economic: (<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />),
  space: (<><path d="M12 2c3 3 4 7 3 12l-3 3-3-3c-1-5 0-9 3-12Z" /><circle cx="12" cy="9" r="1.6" /><path d="M9 15l-3 5M15 15l3 5" /></>),
  /* Umbrella, not a third shield: insurance / police / defense were three
     indistinguishable shields at 36px. */
  insurance: (<><path d="M3 12a9 9 0 0 1 18 0Z" /><path d="M12 12v6.5a2.5 2.5 0 0 0 5 0" /></>),
  police: (<><circle cx="12" cy="12" r="9" /><path d="m12 6.6 1.7 3.5 3.8.55-2.75 2.65.65 3.8L12 15.25 8.6 17.05l.65-3.8L6.5 10.65l3.8-.55Z" /></>),
  defense: (<><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" /><path d="M12 7v9" /></>),
  cybersecurity: (<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
  economy: (<path d="M3 17l5-6 4 4 8-9M14 6h6v6" />),
  investment: (<><circle cx="9" cy="9" r="5" /><circle cx="15" cy="15" r="5" /></>),
  energy: (<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />),
  tourism: (<><circle cx="7.5" cy="7" r="2.5" /><path d="M3 20l6-7 4 4.5 3-3.5 5 6Z" /><path d="M2 20h20" /></>),
  heritage: (<path d="M4 21h16M5 21V9l7-5 7 5v12M9 21v-6h6v6" />),
  entrepreneurship: (<><path d="M4 9l1.6-4h12.8L20 9" /><path d="M4 9h16v11H4z" /><path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" /></>),
  /* Paired flags, so diplomacy is not a second globe next to `international`. */
  diplomacy: (<><path d="M5 21V3" /><path d="M5 4h7.5L11 6.6 12.5 9.2H5z" /><path d="M15 21V8" /><path d="M15 9h5.5L19 11.2l1.5 2.2H15z" /></>),
  star: (<path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8Z" />),
  badge: (<><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></>),
  eye: (<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>),
  link: (<path d="M9 15 15 9M8.5 6.5 11 4a4 4 0 0 1 5.7 5.7L14 12.4M15.5 17.5 13 20a4 4 0 0 1-5.7-5.7L10 11.6" />),
  sprout: (<><path d="M12 21v-8" /><path d="M12 13c0-4 3-6 8-6 0 5-2 8-8 8Z" /><path d="M12 13c0-3-2.5-5-7-5 0 4 1.5 6.5 7 6.5" /></>),
  graduation: (<><path d="m2 9 10-4 10 4-10 4-10-4Z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></>),
  database: (<><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>),
  key: (<><circle cx="8" cy="15" r="4" /><path d="m11 12 8-8M16 4l3 3M13 7l2.5 2.5" /></>),
  award: (<><circle cx="12" cy="8" r="5" /><path d="m8.5 12.5-1.8 7 5.3-2.9 5.3 2.9-1.8-7" /></>),
  government: (<><path d="M4 21h16M5 21V10l7-6 7 6v11" /><path d="M9 21v-7h6v7" /></>),
  briefcase: (<><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>),
  academic: (<><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" /></>),
  search: (<><circle cx="10" cy="10" r="6" /><path d="m20 20-5.5-5.5" /></>),
  edit: (<path d="M4 20h4l10-10-4-4L4 16v4Z" />),
  upload: (<><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>),
  refresh: (<><path d="M4 12a8 8 0 0 1 14.6-4.6M20 12a8 8 0 0 1-14.6 4.6" /><path d="M18 3v5h-5M6 21v-5h5" /></>),
  camera: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7 10 4h4l2 3" /><circle cx="12" cy="13.5" r="3.5" /></>),
  book: (<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z" /><path d="M20 19H6.5A2.5 2.5 0 0 0 4 21.5" /></>),
  idcard: (<><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M6 16c0-1.7 1.3-3 3-3s3 1.3 3 3M14 9h5M14 13h5" /></>),
  chat: (<path d="M4 4h16v11H8l-4 4Z" />),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>),

  /* Sector glyphs replacing the retired Wix illustrations */
  aviation: (<><path d="M10.5 20.5 12 15l8-2.5V10l-8 1.5-1-5.5L9 5 8 11.5 3 13v2l5-.5.5 4-2 1.5v1l2.5-.5Z" /></>),
  projects: (<><path d="M3 21h18M5 21V9l5-3v15M14 21V4l5 3v14" /><path d="M8 12h.01M8 16h.01M16 11h.01M16 15h.01" /></>),
  business: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" /></>),
  innovation: (<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 1 3.6 10.8c-.6.5-1 1.2-1.1 2h-5c-.1-.8-.5-1.5-1.1-2A6 6 0 0 1 12 3Z" /></>),
  media: (<><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 11 6-3v8l-6-3Z" /></>),
  oil: (<><path d="M8 21 12 3l4 18" /><path d="M9.4 14.5h5.2M10.4 10h3.2" /><path d="M4 21h16" /></>),
  ai: (<><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /></>),
  international: (<><circle cx="12" cy="12" r="9" /><path d="M3 9h18M3 15h18M12 3a14 14 0 0 1 0 18A14 14 0 0 1 12 3Z" /></>),
  banking: (<><path d="M3 10h18L12 4 3 10Z" /><path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" /></>),

  /* National library */
  library: (<><path d="M4 4h5v16H4zM11 4h4v16h-4z" /><path d="m17.5 5 3.4 15.2-1 .3-3.4-15.2z" /></>),
  policy: (<><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>),
  guide: (<><path d="M4 5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4Z" /><path d="M20 6v13a2 2 0 0 1-2 2H7" /><path d="M8 8h5M8 12h5" /></>),
  rules: (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>),
  vision: (<><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>),
};

/**
 * Filled companion shape for each sector glyph. Rendered beneath the stroke in the
 * same hue at low alpha, which is what makes the icon read as duotone rather than
 * line art. Only the sector set has these; interface icons stay single-tone.
 */
export const iconAccents: Record<string, ReactNode> = {
  aviation: <path d="M10.5 20.5 12 15l8-2.5V10l-8 1.5-1-5.5L9 5 8 11.5 3 13v2l5-.5.5 4-2 1.5v1l2.5-.5Z" />,
  projects: <path d="M5 9l5-3v15H5z" />,
  business: <rect x="3" y="7" width="18" height="13" rx="2" />,
  innovation: <circle cx="12" cy="9" r="5.4" />,
  media: <rect x="2" y="6" width="14" height="12" rx="2" />,
  oil: <path d="M8 21 12 3l4 18z" />,
  ai: <rect x="7" y="7" width="10" height="10" rx="2" />,
  international: <circle cx="12" cy="12" r="9" />,
  banking: <path d="M3 10h18L12 4z" />,
  space: <path d="M12 2c3 3 4 7 3 12l-3 3-3-3c-1-5 0-9 3-12Z" />,
  insurance: <path d="M3 12a9 9 0 0 1 18 0Z" />,
  police: <circle cx="12" cy="12" r="9" />,
  defense: <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" />,
  cybersecurity: <rect x="5" y="11" width="14" height="9" rx="2" />,
  economy: <path d="M3 17l5-6 4 4 8-9v14H3Z" />,
  investment: <circle cx="9" cy="9" r="5" />,
  energy: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  environment: <path d="M12 3c4 2 7 6 7 10a7 7 0 0 1-14 0c0-4 3-8 7-10Z" />,
  tourism: <path d="M3 20l6-7 4 4.5 3-3.5 5 6Z" />,
  heritage: <path d="M5 9l7-5 7 5v12H5z" />,
  sports: <circle cx="12" cy="12" r="9" />,
  entrepreneurship: <path d="M4 9h16v11H4z" />,
  diplomacy: <path d="M5 4h7.5L11 6.6 12.5 9.2H5z" />,
};

export default function Icon({ name, duotone = false }: { name: string; duotone?: boolean }) {
  const accent = duotone ? iconAccents[name] : null;

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {accent ? <g fill="currentColor" stroke="none" opacity={0.18}>{accent}</g> : null}
      {iconPaths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
