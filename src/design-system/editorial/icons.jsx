/**
 * Editorial icons — custom SVG set tuned for the v3-nova visual language.
 * Icons inherit currentColor so callers style via `color` + size prop.
 *
 * Usage:
 *   <QuoteOpenIcon size={48} color="#E11D2A" />
 *   <LiveDot tone="green" />
 *   <SectionSigma />
 */

const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

/* §  Editorial section sigma — used as prefix for chapter labels */
export function SectionSigma({ size = 20, color = 'currentColor', className }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1,
        color,
        display: 'inline-block',
      }}
      aria-hidden="true"
    >
      §
    </span>
  );
}

/* Editorial quote open — large Fraunces-style double curl */
export function QuoteOpenIcon({ size = 48, color = '#E11D2A', className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill={color}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 34c0-6.5 3-12 10-16l1.5 2.8c-4.5 2.8-6.7 6-6.7 9.2h3.4c2.2 0 3.9 1.7 3.9 3.9v2.2c0 2.2-1.7 3.9-3.9 3.9h-4.3c-2.2 0-3.9-1.7-3.9-3.9V34zm16 0c0-6.5 3-12 10-16l1.5 2.8c-4.5 2.8-6.7 6-6.7 9.2h3.4c2.2 0 3.9 1.7 3.9 3.9v2.2c0 2.2-1.7 3.9-3.9 3.9h-4.3c-2.2 0-3.9-1.7-3.9-3.9V34z" />
    </svg>
  );
}

export function QuoteCloseIcon({ size = 48, color = '#E11D2A', className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill={color}
      className={className}
      style={{ transform: 'rotate(180deg)' }}
      aria-hidden="true"
    >
      <path d="M12 34c0-6.5 3-12 10-16l1.5 2.8c-4.5 2.8-6.7 6-6.7 9.2h3.4c2.2 0 3.9 1.7 3.9 3.9v2.2c0 2.2-1.7 3.9-3.9 3.9h-4.3c-2.2 0-3.9-1.7-3.9-3.9V34zm16 0c0-6.5 3-12 10-16l1.5 2.8c-4.5 2.8-6.7 6-6.7 9.2h3.4c2.2 0 3.9 1.7 3.9 3.9v2.2c0 2.2-1.7 3.9-3.9 3.9h-4.3c-2.2 0-3.9-1.7-3.9-3.9V34z" />
    </svg>
  );
}

/* Live indicator — pulsing dot. Tones: green|red|amber */
export function LiveDot({ size = 8, tone = 'green', pulsing = true, className }) {
  const colors = { green: '#16a34a', red: '#E11D2A', amber: '#F5A623' };
  const c = colors[tone] || tone;
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: c,
        boxShadow: `0 0 ${size}px ${c}`,
        animation: pulsing ? 'liveDotBlink 1.6s ease-in-out infinite' : 'none',
      }}
      aria-hidden="true"
    />
  );
}

/* Arrow right — animates x on .ed-arrow-animate hover */
export function ArrowRightIcon({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* Play — for video testimonial / hero */
export function PlayCircleIcon({ size = 48, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19 16l13 8-13 8V16z" fill="currentColor" />
    </svg>
  );
}

/* Download — whitepapers, PDFs */
export function DownloadIcon({ size = 20, className }) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M12 3v13M7 11l5 5 5-5M4 21h16" />
    </svg>
  );
}

/* Spark — for metrics / trends */
export function SparkIcon({ size = 20, className }) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M3 17l5-6 4 3 9-10M14 4h7v7" />
    </svg>
  );
}

/* Shield check — trust signal for badges */
export function ShieldCheckIcon({ size = 20, className }) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* Red bullet — for tickers / lists */
export function BulletDot({ size = 7, color = '#E11D2A', className }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
      }}
      aria-hidden="true"
    />
  );
}

/* Rule line — editorial divider with kicker text on either side */
export function EditorialRule({ color = '#E11D2A', width = 44, weight = 2, className }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        width,
        height: weight,
        background: color,
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}
