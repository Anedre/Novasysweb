export { default as defaultTheme } from './default';
export { default as christmasTheme } from './christmas';
export { default as newYearTheme } from './newYear';
export { default as fiestasPatriasTheme } from './fiestasPatrias';
export { default as cyberTheme } from './cyber';
export { default as summerTheme } from './summer';
export { default as launchTheme } from './launch';

export const themes = {
  default: () => import('./default'),
  christmas: () => import('./christmas'),
  newYear: () => import('./newYear'),
  fiestasPatrias: () => import('./fiestasPatrias'),
  cyber: () => import('./cyber'),
  summer: () => import('./summer'),
  launch: () => import('./launch'),
};
