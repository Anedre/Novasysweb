/**
 * Editorial Toolkit · v3-nova
 * ----------------------------
 * Primitivos, iconos y utilidades para construir secciones editoriales estilo v3-nova.
 * Importalos desde aquí o desde el barrel principal de design-system.
 *
 *   import { ChapterLabel, EditorialTitle, SectionHead, PillButton, Reveal, CornerMarks } from '@/design-system/editorial';
 *   import { QuoteOpenIcon, LiveDot, ArrowRightIcon } from '@/design-system/editorial/icons';
 *
 * Las utilidades CSS (.ed-em, .ed-mono-label, etc.) viven en editorial.css.
 * Este archivo lo importa el barrel principal para hacerlo disponible globalmente.
 */

import './editorial.css';

export { default as ChapterLabel } from './ChapterLabel';
export { default as EditorialTitle } from './EditorialTitle';
export { default as SectionHead } from './SectionHead';
export { default as Reveal } from './Reveal';
export { default as PillButton } from './PillButton';
export { default as CornerMarks } from './CornerMarks';

export {
  SectionSigma,
  QuoteOpenIcon,
  QuoteCloseIcon,
  LiveDot,
  ArrowRightIcon,
  PlayCircleIcon,
  DownloadIcon,
  SparkIcon,
  ShieldCheckIcon,
  BulletDot,
  EditorialRule,
} from './icons';
