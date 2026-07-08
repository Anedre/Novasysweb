import styles from './Grid.module.css';

const gapMap = { sm: 'gapSm', md: 'gapMd', lg: 'gapLg', xl: 'gapXl' };
const alignMap = { center: 'alignCenter', start: 'alignStart', stretch: 'alignStretch' };

export default function Grid({
  children,
  cols = 3,
  gap = 'md',
  align = 'stretch',
  autoFit = false,
  className = '',
  ...props
}) {
  const classes = [
    styles.grid,
    autoFit ? styles.autoFit : styles[`cols${cols}`],
    gapMap[gap] && styles[gapMap[gap]],
    alignMap[align] && styles[alignMap[align]],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
