import styles from './Skeleton.module.css';

export default function Skeleton({ variant = 'text', width, height, className = '', ...props }) {
  const classes = [styles.skeleton, styles[variant], className].filter(Boolean).join(' ');
  const style = { ...(width && { width }), ...(height && { height }) };

  return <div className={classes} style={style} aria-hidden="true" {...props} />;
}
