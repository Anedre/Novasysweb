import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineSignal,
  HiOutlineBuildingLibrary,
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
  HiOutlineAcademicCap,
  HiOutlineBuildingOffice,
} from 'react-icons/hi2';
import styles from './IndustriesBento.module.css';

const industries = [
  {
    name: 'Telecomunicaciones',
    desc: 'Infraestructura y soluciones cloud para operadores de gran escala.',
    icon: HiOutlineSignal,
    clients: ['Entel', 'Americatel'],
  },
  {
    name: 'Banca y Finanzas',
    desc: 'Analítica avanzada y BI para instituciones financieras líderes.',
    icon: HiOutlineBuildingLibrary,
    clients: ['Interbank', 'Centrum PUCP'],
  },
  {
    name: 'Seguros',
    desc: 'Automatización de procesos y trazabilidad documental.',
    icon: HiOutlineShieldCheck,
    clients: ['Pacífico Seguros'],
  },
  {
    name: 'Retail y Consumo',
    desc: 'CRM, inteligencia comercial y gestión de ventas.',
    icon: HiOutlineShoppingBag,
    clients: ['Renzo Costa'],
  },
  {
    name: 'Educación',
    desc: 'Plataformas analíticas para educación ejecutiva.',
    icon: HiOutlineAcademicCap,
    clients: ['Centrum PUCP'],
  },
  {
    name: 'Sector Público',
    desc: 'Transformación digital y modernización de servicios.',
    icon: HiOutlineBuildingOffice,
    clients: [],
  },
];

const cardVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function BentoCell({ industry, index }) {
  const cellRef = useRef(null);
  const rippleRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cellRef.current || !rippleRef.current) return;
    const rect = cellRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rippleRef.current.style.background =
      `radial-gradient(circle 200px at ${x}px ${y}px, rgba(220,38,38,0.08), transparent 60%)`;
  }, []);

  const Icon = industry.icon;

  return (
    <motion.div
      ref={cellRef}
      className={styles.cell}
      custom={index}
      variants={cardVariant}
      onMouseMove={handleMouseMove}
    >
      <div ref={rippleRef} className={styles.ripple} />
      <Icon className={styles.cellIcon} />
      <h3 className={styles.cellName}>{industry.name}</h3>
      <p className={styles.cellDesc}>{industry.desc}</p>
      {industry.clients.length > 0 && (
        <div className={styles.cellClients}>
          {industry.clients.map((c) => (
            <span key={c} className={styles.clientTag}>{c}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function IndustriesBento() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.eyebrow}>Experiencia sectorial</p>
          <h2 className={styles.title}>Industrias que transformamos</h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {industries.map((ind, i) => (
            <BentoCell key={ind.name} industry={ind} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
