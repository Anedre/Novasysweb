import styles from './CornerMarks.module.css';

/**
 * CornerMarks — editorial L-shaped red corner markers for photo frames / hero panels.
 *
 * Absolute-positioned; parent must be position:relative.
 *
 * Usage:
 *   <div className="photoFrame">
 *     <img src={...} />
 *     <CornerMarks />              // all 4 corners
 *     <CornerMarks corners={['tl','br']} /> // just top-left + bottom-right
 *     <CornerMarks size={32} tone="amber" />
 *   </div>
 */
export default function CornerMarks({
  corners = ['tl', 'br'],
  size = 24,
  tone = 'red',
  offset = 12,
  weight = 1.5,
}) {
  const toneColors = { red: '#E11D2A', amber: '#F5A623', white: '#FAFAFA', ink: '#0E0E12' };
  const c = toneColors[tone] || tone;

  const positions = {
    tl: { top: offset, left: offset, borderTop: `${weight}px solid ${c}`, borderLeft: `${weight}px solid ${c}` },
    tr: { top: offset, right: offset, borderTop: `${weight}px solid ${c}`, borderRight: `${weight}px solid ${c}` },
    bl: { bottom: offset, left: offset, borderBottom: `${weight}px solid ${c}`, borderLeft: `${weight}px solid ${c}` },
    br: { bottom: offset, right: offset, borderBottom: `${weight}px solid ${c}`, borderRight: `${weight}px solid ${c}` },
  };

  return (
    <>
      {corners.map(corner => (
        <span
          key={corner}
          className={styles.mark}
          aria-hidden="true"
          style={{ width: size, height: size, ...positions[corner] }}
        />
      ))}
    </>
  );
}
