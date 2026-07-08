import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlineCloudArrowUp,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import styles from './ServicesFloating.module.css';

const pillars = [
  {
    icon: HiOutlineCodeBracket,
    color: '#DC2626',
    title: 'Software empresarial',
    desc: 'CRM, BI, Marketing Automation y Gestión Documental ELO. Implementados contra tus procesos reales.',
    items: ['Oracle Sales Cloud', 'Business Intelligence', 'Oracle Responsys', 'ELO ECM'],
    cta: 'Explorar soluciones',
    path: '/soluciones/novasys',
  },
  {
    icon: HiOutlineServerStack,
    color: '#3B82F6',
    title: 'Infraestructura HP',
    desc: 'Hardware empresarial con respaldo HP y HPE. Workstations, servidores, storage y networking — con stock en Lima.',
    items: ['HP Z Workstations', 'HPE ProLiant Gen11', 'Storage Alletra', 'Aruba CX Networking'],
    cta: 'Ver infraestructura',
    path: '/soluciones/hp',
  },
  {
    icon: HiOutlineCloudArrowUp,
    color: '#F97316',
    title: 'Cloud AWS',
    desc: 'Amazon Connect, migración on-prem → AWS, arquitecturas serverless y ML. Advanced Partner operado desde Lima.',
    items: ['Amazon Connect', 'AWS Migration', 'Serverless & Containers', 'SageMaker + Bedrock'],
    cta: 'Desplegar en AWS',
    path: '/soluciones/amazon',
  },
];

export default function ServicesFloating() {
  return (
    <section className={styles.svc}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Capacidades</span>
        <h2 className={styles.title}>
          Tres pilares. <em>Un equipo.</em>
        </h2>
        <p className={styles.subtitle}>
          Cubrimos todo el stack — de la aplicación al datacenter — sin pasarte de proveedor en proveedor.
        </p>
      </div>

      <div className={styles.grid}>
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.article
              key={p.title}
              className={styles.card}
              style={{ '--c': p.color }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div className={styles.icon}>
                <Icon />
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <ul className={styles.list}>
                {p.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={p.path} className={styles.cardLink}>
                {p.cta}
                <HiOutlineArrowRight />
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
