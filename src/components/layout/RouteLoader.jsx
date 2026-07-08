import styles from './RouteLoader.module.css';

export default function RouteLoader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    </div>
  );
}
