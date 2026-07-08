import { useParams, Navigate } from 'react-router-dom';
import ServiceDetailTemplate from '../components/sections/ServiceDetailTemplate/ServiceDetailTemplate';
import { getInfraBySlug } from '../data/infrastructure.jsx';

/**
 * InfraDetallePage — /infraestructura/:slug
 * Plantilla dinámica que resuelve el slug contra data/infrastructure.jsx.
 */
export default function InfraDetallePage() {
  const { slug } = useParams();
  const data = getInfraBySlug(slug);

  if (!data) return <Navigate to="/infraestructura" replace />;

  return (
    <ServiceDetailTemplate
      data={data}
      breadcrumb={{ parentLabel: 'Infraestructura', parentPath: '/infraestructura' }}
      canonicalBase="https://www.novasys.com.pe/infraestructura"
    />
  );
}
