import { forwardRef } from 'react';
import styles from './Container.module.css';

const Container = forwardRef(({
  children,
  size = 'default',
  className = '',
  as: Tag = 'div',
  ...props
}, ref) => {
  const classes = [
    styles.container,
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
});

Container.displayName = 'Container';
export default Container;
