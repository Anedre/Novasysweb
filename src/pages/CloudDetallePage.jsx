import { useParams, Navigate } from 'react-router-dom';
import ServiceDetailTemplate from '../components/sections/ServiceDetailTemplate/ServiceDetailTemplate';
import { getCloudBySlug } from '../data/cloud.jsx';

/**
 * CloudDetallePage — /cloud/:slug
 * Plantilla dinámica que resuelve el slug contra data/cloud.jsx.
 */
export default function CloudDetallePage() {
  const { slug } = useParams();
  const data = getCloudBySlug(slug);

  if (!data) return <Navigate to="/cloud" replace />;

  return (
    <ServiceDetailTemplate
      data={data}
      breadcrumb={{ parentLabel: 'Cloud AWS', parentPath: '/cloud' }}
      canonicalBase="https://www.novasys.com.pe/cloud"
    />
  );
}
