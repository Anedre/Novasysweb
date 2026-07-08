import { forwardRef } from 'react';
import styles from './Section.module.css';

const bgMap = {
  default: 'bgDefault',
  white: 'bgWhite',
  subtle: 'bgSubtle',
  dark: 'bgDark',
  darkAlt: 'bgDarkAlt',
  gradient: 'bgGradient',
  brand: 'bgBrand',
};

const padMap = {
  default: 'padDefault',
  sm: 'padSm',
  lg: 'padLg',
  none: 'padNone',
};

const Section = forwardRef(({
  children,
  background = 'default',
  spacing = 'default',
  className = '',
  id,
  as: Tag = 'section',
  ...props
}, ref) => {
  const classes = [
    styles.section,
    styles[bgMap[background] || 'bgDefault'],
    styles[padMap[spacing] || 'padDefault'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag ref={ref} id={id} className={classes} {...props}>
      {children}
    </Tag>
  );
});

Section.displayName = 'Section';
export default Section;
