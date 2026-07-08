import { useParams, Navigate } from 'react-router-dom';
import ServiceDetailTemplate from '../components/sections/ServiceDetailTemplate/ServiceDetailTemplate';
import { getTecnologiaBySlug } from '../data/tecnologias.jsx';

/**
 * TecnologiaDetallePage — /tecnologias/:slug
 * Plantilla dinámica para fichas técnicas de productos (Oracle, HP, AWS).
 * Reusa ServiceDetailTemplate (C4) y resuelve el slug contra data/tecnologias.jsx.
 */
export default function TecnologiaDetallePage() {
  const { slug } = useParams();
  const data = getTecnologiaBySlug(slug);

  if (!data) return <Navigate to="/tecnologias" replace />;

  return (
    <ServiceDetailTemplate
      data={data}
      breadcrumb={{ parentLabel: 'Tecnologías', parentPath: '/tecnologias' }}
      canonicalBase="https://www.novasys.com.pe/tecnologias"
    />
  );
}
